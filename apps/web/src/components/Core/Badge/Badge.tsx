import { cva, type VariantProps } from "class-variance-authority";
import classNames from "classnames";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-pink-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-400 dark:bg-pink-500 text-black dark:text-white hover:bg-blue-400/80 dark:hover:bg-pink-500/80",
        secondary:
          "border-transparent bg-pink-400 dark:bg-purple-400 text-black dark:text-white hover:bg-pink-400/80 dark:hover:bg-purple-400/80",
        destructive:
          "border-transparent bg-red-500 dark:bg-red-500 text-white dark:text-white hover:bg-red-500/80 dark:hover:bg-red-500/80",
        outline: "text-black dark:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={classNames(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
