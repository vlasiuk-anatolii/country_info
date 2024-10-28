import { createBrowserRouter } from "react-router-dom";
import CountriesList from "./countries-list/CountriesList";
import Home from "./home/Home";
import Country from "./country/Country";

const router = createBrowserRouter([
  {
    path: "/countries/:countryCode",
    element: <Country />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/countries",
    element: <CountriesList />,
  },
]);

export default router;
