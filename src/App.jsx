import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import AyatPage from "./components/AyatPage";
import "./index.css";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    ),
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "ayat",
        element: <AyatPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
