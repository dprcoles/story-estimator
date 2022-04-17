import React from "react";

interface WrapperProps {
  children?: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="p-2 h-screen text-white">
      <main>{children}</main>
    </div>
  );
};

export default Wrapper;
