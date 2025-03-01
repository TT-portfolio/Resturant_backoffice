"use client";

import { useState } from "react";
import { Order } from "@/app/Types/order";
import { updateOrderStatus } from "@/services/orderService";

export default function OrderCard({ order }: {order: Order}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [status, setStatus] = useState<Order["OrderStatus"]>(
        order.OrderStatus
    );

    const handleClick = async (newStatus: "Mottagen" | "Tillagning" | "Leverans" | "Avslutad" | "Test"
    ) => {
        try {
            await updateOrderStatus(order.OrderId, newStatus)
            setStatus(newStatus);
        } catch {
            console.log("Something went wrong");
        } 
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Mottagen":
                return "bg-yellow-500";
            case "Tillagning":
                return "bg-green-500";
            case "Leverans":
                return "bg-blue-500";
            case "Avslutad":
                return "bg-gray-500";
            default:
                return "bg-grey-500";
        }
    };

    const calculateTotalPrice = () => {
        return (
            order.Pizzas?.reduce(
                (total, pizza) => total + pizza.Price * pizza.Quantity,
                0
            ) || 0
        );
    };

    

    return (
        <div className="border p-4 rounded-md bg-white shadow-md">
            <div className="grid grid-cols-4">
                <h3 className="text-lg font-bold">
                    Order number # {order.OrderNo}
                </h3>
                <h4 className="text-lg font-bold">{order.CustomerName}</h4>
                <p
                    className={`px-2 py-1 max-w-24 text-center text-white rounded ${getStatusColor(
                        status
                    )}`}>
                    {status}
                </p>
                <button onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "▼" : "▶"}
                </button>
            </div>

            {isExpanded && (
                <div className="mt-2">
                    <div className="mt-2 mb-2 text-sm grid grid-cols-2">
                        <p>
                            Status: <strong>{status}</strong>
                        </p>
                        <p>
                            Order tidpunkt:
                            <strong>{order.OrderTime}</strong>
                        </p>
                    </div>
                    {/* Visa beställda pizzor */}
                    {order.Pizzas && order.Pizzas.length > 0 && (
                        <div>
                            <ul>
                                {order.Pizzas.map((pizza, index) => (
                                    <li
                                        key={index}
                                        className="grid grid-cols-3">
                                        <span>
                                            <strong>{pizza.PizzaName}</strong>{" "}
                                        </span>
                                        <span>{pizza.Quantity} st</span>
                                        <span>
                                            {" "}
                                            {pizza.Price * pizza.Quantity} kr
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {/* Total Pris */}
                    <div>
                        <strong>
                            <h4>Total pris: {calculateTotalPrice()} :-</h4>
                        </strong>
                    </div>

                    {/* Knappar för att simulera statusändring */}
                    <div className="mt-2 space-x-2">
                        <button
                            onClick={() => handleClick("Mottagen")}
                            className="px-2 py-1 bg-yellow-500 text-white rounded">
                            Mottagen
                        </button>
                        <button
                            onClick={() => handleClick("Tillagning")}
                            className="px-2 py-1 bg-green-500 text-white rounded">
                            Tillagning
                        </button>
                        <button
                            onClick={() => handleClick("Leverans")}
                            className="px-2 py-1 bg-Order-blue text-white rounded">
                            Leverans
                        </button>
                        <button
                            onClick={() => handleClick("Avslutad")}
                            className="px-2 py-1 bg-gray-500 text-white rounded">
                            Avslutad
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
