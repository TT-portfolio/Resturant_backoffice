export interface Order {
    OrderStatus: "Mottagen" | "Tillagning" | "Leverans" | "Avslutad";
    CustomerName: string;
    OrderNo: string;
    OrderTime: string
    Pizzas: Pizzas[];
}

export interface Pizzas {
    PizzaName: string;
    Quantity: number;
    Price: number;
}
