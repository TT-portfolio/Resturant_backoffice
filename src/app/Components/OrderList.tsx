import { getOrders } from "@/context/orders";
import { Order } from "../Types/order";
import OrderListClient from "./orderListClient";

export default async function OrderList() {
    const initialOrders: Order[] = await getOrders();
    return <OrderListClient initialOrders={initialOrders} />;
}

// Detta är en sak som skall raderas, bara kommentaren