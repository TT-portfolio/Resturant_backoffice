import fs from "fs";
import path from "path";

export async function getOrders() {
    const filePath = path.join(process.cwd(), "src/app/Database/Orders.json");
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

