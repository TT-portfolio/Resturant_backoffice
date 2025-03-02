export type OrderStatus = "Mottagen" | "Tillagning" | "Leverans" | "Avslutad" | "Test";

export interface Order {
    OrderStatus: OrderStatus
    CustomerName: string;
    OrderNo: string;
    OrderId: string;
    OrderTime: string
    Pizzas: Pizzas[];
}

export interface Pizzas {
    PizzaName: string;
    Quantity: number;
    Price: number;
}

