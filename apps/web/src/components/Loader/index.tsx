import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="spinner w-auto text-center m-8">
      <div className="w-10 h-10 rounded-full inline-block first bg-black dark:bg-white"></div>
      <div className="w-10 h-10 rounded-full inline-block second bg-black dark:bg-white"></div>
      <div className="w-10 h-10 rounded-full inline-block bg-black dark:bg-white"></div>
    </div>
  );
};

export default Loader;
