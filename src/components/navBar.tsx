
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-right">
      <Link
        href="/products/create"
        className="font-semibold text-gray-800 hover:text-indigo-600 relative text-lg transition duration-300 ease-in-out"
        >
          <span className="pb-1 border-b-2 border-transparent hover:border-indigo-600 transition duration-300">
          Create Product
          </span>
      </Link>
    </nav>
  );
};

export default Navbar;
