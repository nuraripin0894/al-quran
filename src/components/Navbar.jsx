import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4">
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "font-serif py-2  text-blue-500 rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-500"
                    : "font-serif py-2  text-white rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-500"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ayat"
                className={({ isActive }) =>
                  isActive
                    ? "font-serif py-2  text-blue-500 rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-500"
                    : "font-serif py-2  text-white rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-500"
                }
              >
                Al-Qur'an
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
