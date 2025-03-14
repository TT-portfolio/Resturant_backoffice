import { fetchFromAPI } from "@/lib/api";

export const getOrders = async () => {
    return fetchFromAPI("GetOrders");
};

// exempel för att köra mot lokala 
// return fetchFromAPI("GetOrders", "GET", null, true);
// return fetchFromAPI("updateOrderStatus", "POST", { OrderId, OrderStatus }, true);

export const updateOrderStatus = async (OrderId: string, OrderStatus: string) => {
    return fetchFromAPI("updateOrderStatus", "POST", { OrderId, OrderStatus });
};
