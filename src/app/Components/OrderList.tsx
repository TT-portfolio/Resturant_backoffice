import { getOrders } from "@/context/orders";
import { Order } from "../Types/order";
import OrderListClient from "./orderListClient";

export default async function OrderList() {
    const orders: Order[] = await getOrders();
    return <OrderListClient orders={orders} />;
}