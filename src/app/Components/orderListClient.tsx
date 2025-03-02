"use client";

import { useUIState } from "@/context/UIStateProvider";
import { Order, OrderStatus } from "../Types/order";
import OrderCard from "./OrderCard/OrderCard";
import { useState, useEffect } from "react";
import { getOrders } from "@/context/orders"; // Se till att hämta funktionen här

export default function OrderListClient({ initialOrders }: { initialOrders: Order[] }) {
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

    const updateOrderStatusLocally = (orderId: string, newStatus: OrderStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.OrderId === orderId ? { ...order, OrderStatus: newStatus } : order
            )
        );
    };

    // Filtrera ordrarna baserat på det valda filtret
    const filteredOrders =
        selectedFilter === "Dashboard"
            ? orders
            : orders.filter((order) => order.OrderStatus === selectedFilter.split(">")?.pop()?.trim());

    return (
        <div className="p-4 grid gap-2">
            {loading ? (
                <p className="text-gray-500">Laddar ordrar...</p>
            ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => <OrderCard key={order.OrderNo} order={order} onUpdateStatus={updateOrderStatusLocally} />)
            ) : (
                <p className="text-gray-500">Inga ordrar i denna kategori</p>
            )}
        </div>
    );
}
