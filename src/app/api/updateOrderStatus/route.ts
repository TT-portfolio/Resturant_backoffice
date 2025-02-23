import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        console.log("Api route triggered")
        const {orderNo, newStatus} = await req.json();
        console.log("Recived:", {orderNo, newStatus})
        

        if(!orderNo || ! newStatus) {
            return NextResponse.json({error: "Missing orderNo or newStatus"}, {status: 400});
        }

        const azureFunctionUrl = process.env.AZURE_UPDATE_URL;
        const azureFunctionCode = process.env.AZURE_FUNCTION_CODE;

        console.log("AZURE_UPDATE_URL:", azureFunctionUrl);
        console.log("AZURE_FUNCTION_CODE:", azureFunctionCode ? "Loaded" : "Missing");

        if(!azureFunctionUrl || !azureFunctionCode) {
            console.error("Missing environment variables!");
            return NextResponse.json({error: "Server misconfigured"}, {status: 500});
        }

        const azureRequestBody = {
            OrderId: orderNo,
            OrderStatus: newStatus
        };

        const response = await fetch (`${azureFunctionUrl}?code=${azureFunctionCode}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(azureRequestBody),
        });

        const data = await response.json();
        console.log("Azure response:", data);

        if (!response.ok){
            console.error("Azure function error:", data);
            throw new Error("Failed to update order status");
        }

        return NextResponse.json(data, { status: 200});
    }   catch (error) {
        console.error("Full error:", error); // 🛑 Viktigt för att se vad som kraschar
        console.log("Error uppdating order status:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}