export async function getOrders() {
    try {
        const response = await fetch("https://pizzafunctions.azurewebsites.net/api/GetOrders");
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return []; // Returnerar en tom array om det blir ett fel
    }
}
