import React, { PropsWithChildren } from "react";
import { IoMdClose } from "react-icons/io";
import classNames from "classnames";

type ModalSize = "sm" | "md" | "lg";

interface ModalProps extends PropsWithChildren {
  open: boolean;
  handleClose: () => void;
  showClose?: boolean;
  size: ModalSize;
  heading: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  handleClose,
  showClose,
  size = "md",
  heading,
  footer,
  children,
}) => {
  return (
    <>
      {open ? (
        <>
          <div
            className={classNames(
              "justify-center max-h-screen mx-auto items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none",
              size === "sm" && "max-w-xl",
              size === "md" && "max-w-3xl",
              size === "lg" && "max-w-5xl",
            )}
          >
            <div className="my-6 min-w-full">
              <div className="min-h-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-light-panels dark:bg-dark-panels outline-none focus:outline-none">
                <div className="flex items-baseline justify-between p-5 border-b border-solid border-light-buttons dark:border-dark-buttons rounded-t">
                  <div className="text-lg font-medium">{heading}</div>
                  {showClose ? (
                    <button
                      onClick={handleClose}
                      className="ml-auto rounded-full hover:bg-light-hover dark:hover:bg-dark-hover w-10 h-10 flex items-center justify-center"
                    >
                      <span className="text-light-text dark:text-dark-text text-2xl">
                        <IoMdClose />
                      </span>
                    </button>
                  ) : null}
                </div>
                <div>{children}</div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-light-buttons dark:border-dark-buttons rounded-b">
                  {footer}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
