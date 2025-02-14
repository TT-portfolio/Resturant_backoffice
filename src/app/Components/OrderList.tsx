import { getOrders } from "@/context/orders";
import OrderCard from "./OrderCard/OrderCard";
import { Order } from "../Types/order";

export default async function OrderList({ filter} : {filter?: string | null}) {
    const orders: Order[] = await getOrders();


    const filteredOrders = filter ? orders.filter((order) => order.OrderStatus === filter) : orders;

    return (
        <div className="flex flex-col gap-2 m-2">
            {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => 
                <OrderCard key={order.OrderNo} order={order} />
                )) : ( <p>Inga ordrar</p>

                )}
        </div>    
    )
}