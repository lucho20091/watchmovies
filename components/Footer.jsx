export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full bg-gray-900 py-8 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-2xl font-bold text-red-500">
              MoviesFree
            </a>
            <p className="mt-2 text-gray-400">
              Stream your favorite movies anytime, anywhere
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© 2023 MoviesFree. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
