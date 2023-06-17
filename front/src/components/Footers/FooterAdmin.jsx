import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-gray" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              { <div className="text-sm text-gray font-semibold py-1 text-right">
                Copyright © {new Date().getFullYear()}{" "}
              </div> }
            </div>

          </div>
        </div>
      </footer>
    </>
  );
}
