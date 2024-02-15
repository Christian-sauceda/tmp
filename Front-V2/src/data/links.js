import { BsCurrencyDollar } from "react-icons/bs";
import {
  FiHome,
  FiShoppingBag,
} from "react-icons/fi";

export const links = [
  {
    name: "Dashboard",
    icon: <FiHome />,
    url: "/",
  },
  {
    name: "Sales",
    icon: <BsCurrencyDollar />,
    subLinks: [
      {
        name: "Sales Analytics",
        url: "/sales/analysis",
      },
    ],
  },
];
