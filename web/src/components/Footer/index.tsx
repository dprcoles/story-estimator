import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="border-t-2 border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mb-2 md:mb-8 mx-auto">
        <div className="flex py-8 align-middle items-center justify-center">
          Made with <FaHeart className="mx-2" /> by{" "}
          <a
            href="https://github.com/dcolesDEV"
            target="_blank"
            rel="noreferrer"
            className="text-light-main hover:text-light-main dark:text-dark-main dark:hover:text-dark-main ml-1"
          >
            Daniel Coles
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

