import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { IoMdClose } from "react-icons/io";

type ModalSize = "sm" | "md" | "lg";

interface ModalProps extends PropsWithChildren {
  open: boolean;
  handleClose: () => void;
  showClose?: boolean;
  size: ModalSize;
  heading: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal = ({
  open,
  handleClose,
  showClose,
  size = "md",
  heading,
  footer,
  children,
}: ModalProps) => {
  return (
    <>
      {open ? (
        <>
          <div
            className={classNames(
              "fixed inset-0 z-50 mx-auto flex max-h-screen items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none",
              size === "sm" && "max-w-xl",
              size === "md" && "max-w-3xl",
              size === "lg" && "max-w-5xl",
            )}
          >
            <div className="my-6 min-w-full">
              <div className="bg-light-panels dark:bg-dark-panels relative flex min-h-full w-full flex-col rounded-lg border-0 shadow-lg outline-none focus:outline-none">
                <div className="border-light-buttons dark:border-dark-buttons flex items-baseline justify-between rounded-t border-b border-solid p-5">
                  <div className="text-lg font-medium">{heading}</div>
                  {showClose ? (
                    <button
                      onClick={handleClose}
                      className="hover:bg-light-hover dark:hover:bg-dark-hover ml-auto flex h-10 w-10 items-center justify-center rounded-full"
                    >
                      <span className="text-light-text dark:text-dark-text text-2xl">
                        <IoMdClose />
                      </span>
                    </button>
                  ) : null}
                </div>
                <div>{children}</div>
                <div className="border-light-buttons dark:border-dark-buttons flex items-center justify-end rounded-b border-t border-solid p-6">
                  {footer}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
