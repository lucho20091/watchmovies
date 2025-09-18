import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav class="bg-gray-800 py-4 px-6 shadow-lg">
      <div class="container mx-auto flex justify-between items-center">
        <Link href="/" class="text-xl md:text-2xl font-bold text-red-500">
          MoviesFree
        </Link>
        <div class="flex space-x-2 md:space-x-6">
          <Link href="/" class="hover:text-red-400 transition">
            Home
          </Link>
          <Link href="/browse" class="hover:text-red-400 transition">
            Browse
          </Link>
          <Link href="/kdrama/1" class="hover:text-red-400 transition">
            Kdrama
          </Link>
        </div>
        <div class="flex items-center space-x-4">
          <Link href="/search">
            <div className="flex jusitfy-center items-center gap-2 md:hidden">
              <span className="hidden">Search</span>
              <FaSearch size={18} />
            </div>

            <div className="hidden md:flex jusitfy-center items-center gap-2">
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
