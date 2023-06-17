import React from "react";
import { createPopper } from "@popperjs/core";
import useAuth from '../../hooks/useAuth'

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const { auth } = useAuth()
  const user = auth.USER_NAME
  return (
    <>
      <a
        className="text-gray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex bg-sky-800 rounded-lg">
          <span className="text-sm font-bold text-white hover:text-red-800 inline-flex items-center justify-center m-2">
            Hola, ${user}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          className={
            "text-sm py-2 px-4 font-bold block w-full whitespace-nowrap text-sky-800"
          }
          href="/"
        >
          Cerrar Sesión
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
