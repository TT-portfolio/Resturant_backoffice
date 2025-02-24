export interface Order {
    OrderStatus: "Mottagen" | "Tillagning" | "Leverans" | "Avslutad" | "Test";
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

