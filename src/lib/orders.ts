import { fetchFromAPI } from "@/lib/api";

// export const getOrders = async () => {
//     return fetchFromAPI("GetOrders");
// };
// export const getOrders = async () => {
//     return fetchFromAPI("GetOrders", "GET", null, false, {
//         test: "true",
//         variant: "single"
//     });
// };

export const getOrders = async () => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const isTestMode = params.get("test") === "true";
    const variant = params.get("variant") || "empty"; // Default till tom lista

    return fetchFromAPI("GetOrders", "GET", null, false, 
        isTestMode ? { test: "true", variant } : {}
    );
};


// exempel för att köra mot lokala 
// return fetchFromAPI("GetOrders", "GET", null, true);
// return fetchFromAPI("updateOrderStatus", "POST", { OrderId, OrderStatus }, true);

export const updateOrderStatus = async (OrderId: string, OrderStatus: string) => {
    return fetchFromAPI("updateOrderStatus", "POST", { OrderId, OrderStatus });
};
