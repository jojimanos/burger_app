import Link from "next/link"
import Button from "./button"

export default function Navbar() {
    return (
        <div className="grid grid-cols-3 gap-2 py-5 px-3">
            <Link href={"/"}>{Button("Build my Burger")}</Link>
            <Link href={"/"}>{Button("Orders")}</Link>
            <Link href={"/loginPage"}>{Button("Log In")}</Link>
        </div>
    )
}