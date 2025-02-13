"use client";

import React, { useState } from "react";
import { useUIState } from "@/context/UiStateProvider";


const SideNavbar = () => {
    const {setSelectedFilter} = useUIState();

    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggleMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu)
    }

    return (
        <div className="bg-slate-400 flex flex-col h-screen text-white font-semibold text-xl">
            <h2>Navigation</h2>
            {/* Dashboard */}
            <div>
                <button
                    className="w-full text-left p-2 font-semibold hover:bg-gray-600"
                    onClick={() => toggleMenu("dashboard")}>
                    Dashboard
                </button>
                {openMenu === "dashboard" && (
                    <ul className="ml-4 ">
                        <li
                            className="p-2 cursor-pointer rounded-md hover:bg-gray-600"
                            onClick={() => setSelectedFilter("All Orders")}>
                            All Orders
                        </li>
                        <li
                            className="p-2 cursor-pointer rounded-md hover:bg-gray-600"
                            onClick={() => setSelectedFilter("Pending Orders")}>
                            Pending Orders
                        </li>
                        <li
                            className="p-2 cursor-pointer rounded-md hover:bg-gray-600 whitespace-nowrap"
                            onClick={() => setSelectedFilter("Completed Orders")}>
                            Completed Orders
                        </li>
                    </ul>
                )}
            </div>
            {/* Statistic */}
            <div>
                <button
                    className="w-full text-left p-2 font-semibold hover:bg-gray-600"
                    onClick={() => toggleMenu("statistic")}>
                    Statistic
                </button>
                {openMenu === "statistic" && (
                    <ul className="ml-4">
                        <li
                            className="p-2 cursor-pointer hover:bg-gray-500"
                            onClick={() => setSelectedFilter("Sales Report")}>
                            Sales Report
                        </li>
                        <li
                            className="p-2 cursor-pointer hover:bg-gray-500"
                            onClick={() => setSelectedFilter("Customer Insights")}>
                            Customer Insights
                        </li>
                    </ul>
                )}
            </div>
            {/* Orders */}
            <div>
                <button
                    className="w-full text-left p-2 font-semibold hover:bg-gray-600"
                    onClick={() => toggleMenu("orders")}>
                    Orders
                </button>
                {openMenu === "orders" && (
                    <ul className="ml-4">
                        <li
                            className="p-2 cursor-pointer hover:bg-gray-500"
                            onClick={() => setSelectedFilter("New Orders")}>
                            New Orders
                        </li>
                        <li
                            className="p-2 cursor-pointer hover:bg-gray-500"
                            onClick={() => setSelectedFilter("Delivered Orders")}>
                            Delivered Orders
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SideNavbar;
