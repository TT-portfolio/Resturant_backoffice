"use client";

import { useUIState } from "@/context/UIStateProvider";
import { Order, OrderStatus } from "../Types/order";
import OrderCard from "./OrderCard/OrderCard";
import { useState, useEffect } from "react";
import * as SignalR from "@microsoft/signalr";
import { getOrders } from "@/lib/orders"; // Se till att hämta funktionen här

export default function OrderListClient({
    initialOrders,
}: {
    initialOrders: Order[];
}) {
    const { selectedFilter } = useUIState();
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const updatedOrders = await getOrders();
                setOrders(updatedOrders);
            } catch (error) {
                console.error("Fel vid hämtning av ordrar:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [selectedFilter]); // Hämta nya ordrar varje gång filtret ändras

    //🛠️ Anslut till Azure SignalR för realtidsuppdateringar
    useEffect(() => {
        const connectToSignalR = async () => {
            try {
                const response = await fetch(
                    "https://pizzafunctions.azurewebsites.net/api/SignalRNegotiate",
                    { method: "POST" }
                );

                // console.log("🔹 Response Status:", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                // console.log("🔹 Negotiate Response Data:", data);

                const connection = new SignalR.HubConnectionBuilder()
                    .withUrl(data.url, {
                        accessTokenFactory: () => data.accessToken,
                    })
                    .withAutomaticReconnect()
                    .build();

                await connection.start();
                // console.log("✅ SignalR Connected");

                connection.on("orderUpdated", (updatedOrder: Order) => {
                    // console.log("🔄 Order Updated:", updatedOrder);
                    refreshOrders();
                    setOrders((prevOrders) =>
                        prevOrders.map((order) =>
                            order.orderId === updatedOrder.orderId
                                ? updatedOrder
                                : order
                        )
                    );
                });

                return () => connection.stop();
            } catch (error) {
                console.error("❌ SignalR Connection Error:", error);
            }
        };

        connectToSignalR();
    }, []);

    const updateOrderStatusLocally = (
        orderId: string,
        newStatus: OrderStatus
    ) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.orderId === orderId
                    ? { ...order, orderStatus: newStatus }
                    : order
            )
        );
    };

    // Filtrera ordrarna baserat på det valda filtret
    const filteredOrders =
        selectedFilter === "Dashboard"
            ? orders
            : orders.filter(
                  (order) =>
                      order.orderStatus ===
                      selectedFilter.split(">")?.pop()?.trim()
              );

    const refreshOrders = async () => {
        setLoading(true);
        try {
            const updatedOrder = await getOrders();
            setOrders(updatedOrder);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 grid gap-2">
            {loading ? (
                <p className="text-gray-500">Laddar ordrar...</p>
            ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                    <OrderCard
                        key={order.orderNo}
                        order={order}
                        onUpdateStatus={updateOrderStatusLocally}
                    />
                ))
            ) : (
                <p
                    data-test="NoOrders"
                className="text-gray-500">Inga ordrar i denna kategori</p>
            )}
        </div>
    );
}
