export const updateOrderStatus = async (
    orderId: string,
    newStatus: "Mottagen" | "Tillagning" | "Leverans" | "Avslutad" | "Test"
) => {
    try {
        const response = await fetch("/api/updateOrderStatus", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ orderId, newStatus }),
        });

        if (!response.ok) {
            throw new Error("Unable to update order");
        }

        return response.json();
    } catch (error) {
        console.error("Error at updating status", error);
        throw error;
    }
};
