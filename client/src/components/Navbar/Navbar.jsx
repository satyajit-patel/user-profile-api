import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-900 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl font-bold">Profile Manager</h1>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded">
            Register
          </button>
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
