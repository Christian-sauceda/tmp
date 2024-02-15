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
    name: "Products",
    icon: <FiShoppingBag />,
    subLinks: [
      {
        name: "All Products",
        url: "/products",
      },
      {
        name: "Add Product",
        url: "/products/add",
      },
    ],
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
