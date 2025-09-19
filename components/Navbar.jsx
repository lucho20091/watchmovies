import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex  gap-2text-xl md:text-2xl font-bold text-red-500"
        >
          <span>MoviesFree</span>
        </Link>
        <div className="flex space-x-2 md:space-x-6">
          <Link href="/" className="hover:text-red-400 transition">
            Home
          </Link>
          <Link href="/browse" className="hover:text-red-400 transition">
            Browse
          </Link>
          <Link href="/kdrama/1" className="hover:text-red-400 transition">
            Kdrama
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/search">
            <div className="flex jusitfy-center items-center gap-2 md:hidden hover:text-red-400 transition">
              <span className="hidden">Search</span>
              <FaSearch size={18} />
            </div>

            <div className="hidden md:flex jusitfy-center items-center gap-2 hover:text-red-400 transition">
              <span>Search</span>
              <FaSearch size={22} />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// <header className="bg-neutral-950 text-white p-4 fixed top-0 w-full z-[1000]">
//     <nav className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center gap-4">
//             <Link href="/" className="flex items-center gap-1 bg-red-500 px-2 py-1 rounded-3xl cursor-pointer">
//                 <div className="block md:hidden">
//                     <FaHome size={16}/>
//                 </div>
//                 <div className="hidden md:block">
//                     <FaHome size={20}/>
//                 </div>
//                 <span className="font-bold">Home</span>
//             </Link>
//             <Link href="/browse">
//                 <span>Browse</span>
//             </Link>
//             <Link href="/kdrama/1">
//                 <span>Kdrama</span>
//             </Link>
//         </div>
//         <div className="flex items-center gap-4 md:gap-8">
//             <Link href="/search">
//                 <div className="block md:hidden">
//                     <FaSearch size={18}/>
//                 </div>
//                 <div className="hidden md:block">
//                     <FaSearch size={22}/>
//                 </div>
//             </Link>
//         </div>
//     </nav>
// </header>
