"use client";

import { useUIState } from "@/context/UIStateProvider";
import { Order, OrderStatus } from "../Types/order";
import OrderCard from "./OrderCard/OrderCard";
import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { getOrders } from "@/context/orders"; // Se till att hämta funktionen här

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
                console.log(orders)
            } catch (error) {
                console.error("Fel vid hämtning av ordrar:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [selectedFilter]); // Hämta nya ordrar varje gång filtret ändras

      // 🛠️ Anslut till Azure SignalR för realtidsuppdateringar
    //   useEffect(() => {
    //     const connectToSignalR = async () => {
    //         try {
    //             const response = await fetch("https://pizzaloverfunctions.azurewebsites.net/api/SignalRNegotiate?", { method: "POST" });
    
    //             console.log("🔹 Response Status:", response.status);
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    
    //             const data = await response.json();
    //             console.log("🔹 Negotiate Response Data:", data);
    
    //             const connection = new signalR.HubConnectionBuilder()
    //                 .withUrl(data.url)
    //                 .withAutomaticReconnect()
    //                 .build();
    
    //             await connection.start();
    //             console.log("✅ SignalR Connected");
    
    //             connection.on("orderUpdated", (updatedOrder: Order) => {
    //                 console.log("🔄 Order Updated:", updatedOrder);
    //                 setOrders((prevOrders) =>
    //                     prevOrders.map((order) =>
    //                         order.OrderId === updatedOrder.OrderId ? updatedOrder : order
    //                     )
    //                 );
    //             });
    
    //             return () => connection.stop();
    //         } catch (error) {
    //             console.error("❌ SignalR Connection Error:", error);
    //         }
    //     };
    
    //     connectToSignalR();
    // }, []);
    

    const updateOrderStatusLocally = (orderId: string, newStatus: OrderStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.orderId === orderId ? { ...order, OrderStatus: newStatus } : order
            )
        );
    };

    // Filtrera ordrarna baserat på det valda filtret
    const filteredOrders =
        selectedFilter === "Dashboard"
            ? orders
            : orders.filter((order) => order.orderStatus === selectedFilter.split(">")?.pop()?.trim());

    return (
        <div className="p-4 grid gap-2">
            {loading ? (
                <p className="text-gray-500">Laddar ordrar...</p>
            ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => <OrderCard key={order.orderNo} order={order} onUpdateStatus={updateOrderStatusLocally} />)
            ) : (
                <p className="text-gray-500">Inga ordrar i denna kategori</p>
            )}
        </div>
    );
}
