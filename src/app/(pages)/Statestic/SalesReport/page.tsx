import { bestSeller } from "@/lib/orders";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Sales() {
    const best = await bestSeller();
    const session = await getServerSession(options);

    console.log(best)
    if (!session) {
        redirect("/");
    }

    return (
        <div>
            <h1>{best[0].pizzaName}</h1>
            <h1>{best[0].totalSold}</h1>
        </div>
    );
}
