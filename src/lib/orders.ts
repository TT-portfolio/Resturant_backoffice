import { fetchFromAPI } from "@/lib/api";

export const getOrders = async () => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const isTestMode = params.get("test") === "true";
    const variant = params.get("variant") || "empty"; // Default till tom lista

    return fetchFromAPI("GetOrders", "GET", null, false, 
        isTestMode ? { test: "true", variant } : {}
    );
};

export const updateOrderStatus = async (OrderId: string, OrderStatus: string) => {
    return fetchFromAPI("updateOrderStatus", "POST", { OrderId, OrderStatus });
};

export const bestSeller = async () => {
    return fetchFromAPI("BestSeller", "GET", null, false)
}
