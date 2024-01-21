import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import classNames from "classnames";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-button font-bold ring-offset-neutral-100 dark:ring-offset-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-pink-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-2 border-blue-400 dark:border-pink-500 text-black dark:text-white hocus:bg-blue-400/10 dark:hocus:bg-pink-500/10 hocus:shadow-sm hocus:shadow-blue-400/50 dark:hocus:shadow-pink-500/50",
        destructive:
          "bg-red-500 text-white dark:text-white hocus:bg-red-500/90 focus-visible:ring-red-500 dark:focus-visible:ring-red-500",
        outline:
          "border-2 border-black dark:border-white bg-transparent dark:bg-transparent hocus:bg-black/5 dark:hocus:bg-white/5 hocus:text-black dark:hocus:text-white focus-visible:ring-black dark:focus-visible:ring-white",
        secondary:
          "bg-pink-400 dark:bg-purple-400 text-black dark:text-white hocus:bg-pink-400/80 dark:hocus:bg-purple-400/80",
        ghost: "hocus:bg-black/5 dark:hocus:bg-white/5 hocus:text-black dark:hocus:text-white",
        link: "text-blue-400 dark:text-pink-500 underline-offset-4 hocus:underline",
      },
      size: {
        default: "px-4 py-2",
        small: "text-sm p-1",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={classNames(fullWidth && "w-full", buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
