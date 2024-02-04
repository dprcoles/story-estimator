import React from "react";

const Loader = () => {
  return (
    <div className="spinner m-8 w-auto text-center">
      <div className="first inline-block h-10 w-10 rounded-full bg-black dark:bg-white"></div>
      <div className="second inline-block h-10 w-10 rounded-full bg-black dark:bg-white"></div>
      <div className="inline-block h-10 w-10 rounded-full bg-black dark:bg-white"></div>
    </div>
  );
};

export default Loader;
