export type OrderStatus = "Mottagen" | "Tillagning" | "Leverans" | "Avslutad" | "Test";

export interface Order {
    orderStatus: OrderStatus
    customerName: string;
    orderNo: string;
    orderId: string;
    orderTime: string
    pizzas: Pizzas[];
}

export interface Pizzas {
    pizzaName: string;
    quantity: number;
    price: number;
}

