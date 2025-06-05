import Link from "next/link"
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

export default function Navbar(){
    return (
        <header className="bg-neutral-950 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-1 bg-red-500 px-2 py-1 rounded-3xl cursor-pointer">
                        <div className="block md:hidden">
                            <FaHome size={16}/>
                        </div>
                        <div className="hidden md:block">
                            <FaHome size={20}/>
                        </div>
                        <span className="font-bold">Home</span>
                    </Link>
                    <Link href="/browse">
                        <span>Browse</span>
                    </Link>
                    <Link href="/kdrama/1">
                        <span>Kdrama</span>
                    </Link>
                </div>
                <div className="flex items-center gap-4 md:gap-8">
                    <Link href="/search">
                        <div className="block md:hidden">
                            <FaSearch size={18}/>
                        </div>
                        <div className="hidden md:block">
                            <FaSearch size={22}/>
                        </div>
                    </Link>
                    {/* <Link href="/settings">
                        <div className="block md:hidden">
                            <FaCog size={18}/>
                        </div>
                        <div className="hidden md:block">
                            <FaCog size={22}/>
                        </div>
                    </Link> */}
                </div>
            </nav>
        </header>
    )
}