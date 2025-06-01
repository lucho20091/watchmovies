import Link from "next/link"
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

export default function Navbar(){
    return (
        <header className="bg-neutral-950 text-white p-4">
            <nav className="container mx-auto max-w-screen-xl flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-1 bg-red-500 px-2 py-1 rounded-3xl cursor-pointer">
                        <FaHome size={16}/>
                        <span className="font-bold">Home</span>
                    </Link>
                    <Link href="/browse">
                        <span>Browse</span>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/search">
                        <FaSearch size={18}/>
                    </Link>
                    <Link href="/settings">
                        <FaCog size={18}/>
                    </Link>
                </div>
            </nav>
        </header>
    )
}