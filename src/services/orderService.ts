export const updateOrderStatus = async (
    orderNo: string,
    newStatus: "Mottagen" | "Tillagning" | "Leverans" | "Avslutad" | "Test"
) => {
    try {
        const response = await fetch("/api/updateOrderStatus", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ orderNo, newStatus }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("API error: ", data);
            throw new Error("Unable to update order");
        }

        return response.json();
    } catch (error) {
        console.error("Error at updating status", error);
        throw error;
    }
};
