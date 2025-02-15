import React from "react";
import { useUIState } from "@/context/UIStateProvider";

const TopDisplay = () => {
    const { selectedFilter } = useUIState();
    return (
        <div className="bg-slate-500 p-4 text-white text-xl font-semibold flex justify-between">
            <div>{selectedFilter}</div>
            <h1>PizzaLover</h1>
        </div>
    );
};
export default TopDisplay;
