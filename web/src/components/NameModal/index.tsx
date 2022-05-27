import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface NameModalProps {
  name: string;
  setName: (name: string) => void;
}

const NameModal: React.FC<NameModalProps> = ({ name, setName }) => {
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(name.length === 0);
  }, [name]);

  return (
    <>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-dark-secondary outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-dark-secondary rounded-t">
                  <h3 className="text-3xl font-semibold">Enter your name</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => navigate("/")}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <input
                    className="p-4 border-2 border-dark-secondary focus:border-blue-500 focus:outline-none w-full md:w-96 rounded-md bg-dark-primary"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-dark-primary rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:opacity-25"
                    type="button"
                    onClick={() => setName(value)}
                    disabled={
                      value.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length === 0
                    }
                  >
                    Go to room
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default NameModal;

