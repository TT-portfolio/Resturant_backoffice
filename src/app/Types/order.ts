export type OrderStatus = "Mottagen" | "Tillagning" | "Leverans" | "Avslutad" | "Test";

export interface Order {
    orderStatus: OrderStatus
    customerFirstName: string;
    customerLastName: string;
    orderNo: number;
    orderId: string;
    orderTime: string
    pizzas: Pizzas[];
}

export interface Pizzas {
    pizzaName: string;
    quantity: number;
    price: number;
}

