import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";

const TopDisplay = async () => {
    const Session = await getServerSession(options);
    return (
        <div className="bg-slate-500 p-4 text-white text-xl font-semibold flex justify-between">
            <h1 data-test="TopDisplayName">PizzaLover</h1>
            {Session ? (
                <Link
                    href="/api/auth/signout?callbackUrl=/"
                    data-test="Signout">
                    Sign Out
                </Link>
            ) : (
                <Link href="/api/auth/signin" data-test="Signin">
                    Sign In
                </Link>
            )}
        </div>
    );
};
export default TopDisplay;
