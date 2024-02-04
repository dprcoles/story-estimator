import * as SwitchPrimitives from "@radix-ui/react-switch";
import classNames from "classnames";
import * as React from "react";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={classNames(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-400 data-[state=unchecked]:bg-neutral-300 dark:focus-visible:ring-pink-500 dark:focus-visible:ring-offset-black dark:data-[state=checked]:bg-pink-500 dark:data-[state=unchecked]:bg-zinc-700",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={classNames(
        "pointer-events-none block h-5 w-5 rounded-full bg-black shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-white",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export default Switch;
