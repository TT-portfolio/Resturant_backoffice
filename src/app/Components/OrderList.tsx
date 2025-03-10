import { getOrders } from "@/lib/orders";
import { Order } from "../Types/order";
import OrderListClient from "./orderListClient";

export default async function OrderList() {
    const initialOrders: Order[] = await getOrders();
    return <OrderListClient initialOrders={initialOrders} />;
}
