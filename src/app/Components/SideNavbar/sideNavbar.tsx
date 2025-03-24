"use client";

import React, { useState } from "react";
import { useUIState } from "@/context/UIStateProvider";


const SideNavbar = () => {
    const {setSelectedFilter} = useUIState();

    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggleMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu)
        setSelectedFilter("Dashboard")
    }

    const handleFilterChange = (category: string, filter: string) => {
        setSelectedFilter(`${category} > ${filter}`)
    }

    return (
        <div className="bg-slate-400 p-4 flex flex-col h-screen text-white font-semibold text-xl">
            {/* Dashboard */}
            <div>
                <button
                    data-test="dashbar-button"
                    className="text-left font-semibold hover:bg-gray-600"
                    onClick={() => toggleMenu("dashboard")}>
                    Dashboard
                </button>
                {openMenu === "dashboard" && (
                    <ul className="ml-4 mr-4">
                        <li
                            className="p-2 cursor-pointer rounded-md hover:bg-yellow-500 hover:text-black"
                            onClick={() => handleFilterChange("Dashboard", "Mottagen")}>
                            Mottagen
                        </li>
                        <li
                            className="p-2 cursor-pointer rounded-md hover:bg-Order-green hover:text-black"
                            onClick={() => handleFilterChange("Dashboard", "Tillagning")}>
                            Tillagning
                        </li>
                        <li
                            className="p-2 cursor-pointer rounded-md hover:bg-Order-blue hover:text-black whitespace-nowrap"
                            onClick={() => handleFilterChange("Dashboard", "Leverans")}>
                            Leverans
                        </li>
                        <li
                            className="p-2 cursor-pointer rounded-md hover:bg-gray-600 whitespace-nowrap"
                            onClick={() => handleFilterChange("Dashboard", "Avslutad")}>
                            Avslutad
                        </li>
                    </ul>
                )}
            </div>
            {/* Statistic */}
            {/* <div>
                <button
                    className="w-full text-left p-2 font-semibold hover:bg-gray-600"
                    onClick={() => toggleMenu("statistic")}>
                    Statistic
                </button>
                {openMenu === "statistic" && (
                    <ul className="ml-4">
                        <li
                            className="p-2 cursor-pointer hover:bg-gray-500"
                            onClick={() => handleFilterChange("Statestic","Sales Report")}>
                            Sales Report
                        </li>
                        <li
                            className="p-2 cursor-pointer hover:bg-gray-500"
                            onClick={() => handleFilterChange("Statestic","Customer Insights")}>
                            Customer Insights
                        </li>
                    </ul>
                )}
            </div> */}
            {/* Orders */}
            {/* <div>
                <button
                    className="w-full text-left p-2 font-semibold hover:bg-gray-600"
                    onClick={() => toggleMenu("orders")}>
                    Orders
                </button>
                {openMenu === "orders" && (
                    <ul className="ml-4">
                        <li
                            className="p-2 cursor-pointer hover:bg-gray-500"
                            onClick={() => handleFilterChange("Orders","New Orders")}>
                            New Orders
                        </li>
                        <li
                            className="p-2 cursor-pointer hover:bg-gray-500"
                            onClick={() => handleFilterChange("Orders","Delivered Orders")}>
                            Delivered Orders
                        </li>
                    </ul>
                )}
            </div> */}
        </div>
    );
};

export default SideNavbar;
