'use client'

import { useUIState } from "@/context/UIStateProvider";
import { Order } from "../Types/order";
import OrderCard from "./OrderCard/OrderCard";
import { useState, useEffect } from "react";

export default function OrderListClient({ orders }: { orders: Order[] }) {
    const { selectedFilter } = useUIState();
    const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);

    useEffect(()=> {
        if (selectedFilter === "Dashboard") {
            setFilteredOrders(orders)
        } else {
            const filterTrim = selectedFilter.split(">")?.pop()?.trim();
            setFilteredOrders(orders.filter(order => order.OrderStatus === filterTrim));
        }
    }, [selectedFilter, orders]);

    return (
        <div className="p-4 grid gap-2">
            {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => <OrderCard key={order.OrderNo} order={order} />)
            ) : (
                <p className="text-gray-500">Inga ordrar i denna kategori</p>
            )}
        </div>
    );
}
