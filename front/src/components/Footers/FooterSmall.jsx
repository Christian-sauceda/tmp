import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-gray-800"
            : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4 text-center">
          <hr className="mb-6 border-b-1 border-gray-600" />
          <div className="flex flex-wrap items-center justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-white font-semibold py-1 text-center">
                Copyright © {new Date().getFullYear()}{" "}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
