import classNames from "classnames";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={classNames(
          "hocus:border-blue-400 dark:hocus:border-pink-500 flex w-full rounded-md border bg-neutral-200 px-3 py-2 ring-offset-neutral-100 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:ring-offset-black dark:placeholder:text-gray-200 dark:focus-visible:ring-pink-500",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export default Input;
