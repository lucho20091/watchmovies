import Link from "next/link"
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

export default function Navbar(){
    return (
        <header className="bg-neutral-950 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-3xl cursor-pointer">
                        <FaHome size={32}/>
                        <span className="font-bold text-xl">Home</span>
                    </Link>
                    <Link href="/browse">
                        <span className="text-xl">Browse</span>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/search">
                        <FaSearch size={32}/>
                    </Link>
                    <Link href="/settings">
                        <FaCog size={32}/>
                    </Link>
                </div>
            </nav>
        </header>
    )
}