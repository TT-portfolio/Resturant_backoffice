"use client";

import React, { useState } from "react";
import { useUIState } from "@/context/UIStateProvider";
import Link from "next/link";

const SideNavbar = () => {
    const { setSelectedFilter } = useUIState();

    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggleMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
        setSelectedFilter("Dashboard");
    };

    const handleFilterChange = (category: string, filter: string) => {
        setSelectedFilter(`${category} > ${filter}`);
    };

    return (
        <div className="bg-slate-400 p-4 flex flex-col h-screen text-white font-semibold text-xl">
            {/* Dashboard */}
            <div>
                <Link data-test="dashbar-button" href="/Dashboard" onClick={() => toggleMenu("dashboard")}>
                    Dashboard
                </Link>
                {openMenu === "dashboard" && (
                    <ul className="ml-4 mr-4">
                        <li
                            className="p-2 cursor-pointer rounded-md hover:bg-yellow-500 hover:text-black"
                            onClick={() =>
                                handleFilterChange("Dashboard", "Mottagen")
                            }>
                            Mottagen
                        </li>
                        <li
                            className="p-2 cursor-pointer rounded-md hover:bg-Order-green hover:text-black"
                            onClick={() =>
                                handleFilterChange("Dashboard", "Tillagning")
                            }>
                            Tillagning
                        </li>
                        <li
                            className="p-2 cursor-pointer rounded-md hover:bg-Order-blue hover:text-black whitespace-nowrap"
                            onClick={() =>
                                handleFilterChange("Dashboard", "Leverans")
                            }>
                            Leverans
                        </li>
                        <li
                            className="p-2 cursor-pointer rounded-md hover:bg-gray-600 whitespace-nowrap"
                            onClick={() =>
                                handleFilterChange("Dashboard", "Avslutad")
                            }>
                            Avslutad
                        </li>
                    </ul>
                )}
            </div>
            {/* Statistic */}
            <div>
                <Link data-test="statestic-button" href="/Statestic" onClick={() => toggleMenu("statistic")}>
                    Statistik
                </Link>
                {openMenu === "statistic" && (
                    <ul className="ml-4">
                        <Link
                            href="/Statestic/SalesReport"
                            onClick={() =>
                                handleFilterChange("Statestic", "Sales Report")
                            }>
                            Sales
                        </Link>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SideNavbar;
