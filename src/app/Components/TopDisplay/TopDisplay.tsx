import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";

const TopDisplay = async () => {
    const Session = await getServerSession(options);
    return (
        <div className="bg-slate-500 p-4 text-white text-xl font-semibold flex justify-between">
            <h1 data-test="TopDisplayName">PizzaLover</h1>
            <div className="flex gap-5">
                {Session ? (
                    <div>
                        <h1 className="text-lg">{Session?.user.name}</h1>
                        <h1 className="text-lg">{Session?.user.role}</h1>
                    </div>
                ) : (
                    <div></div>
                )}

                {Session ? (
                    <Link
                        className="border border-black rounded-lg px-4 py-3 bg-red-500 text-center hover:text-black"
                        href="/api/auth/signout?callbackUrl=/"
                        data-test="Signout">
                        Sign Out
                    </Link>
                ) : (
                    <Link
                        className="border border-black rounded-lg px-4 py-3 bg-green-500 text-center hover:text-black"
                        href="/api/auth/signin"
                        data-test="Signin">
                        Sign In
                    </Link>
                )}
            </div>
        </div>
    );
};
export default TopDisplay;
