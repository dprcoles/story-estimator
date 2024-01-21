import * as TabsPrimitive from "@radix-ui/react-tabs";
import classNames from "classnames";
import * as React from "react";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={classNames(
      "inline-flex items-center justify-center rounded-md bg-neutral-300 p-1 text-black dark:bg-zinc-800 dark:text-white",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={classNames(
      "font-button inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-bold ring-offset-neutral-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-200 data-[state=active]:text-black data-[state=active]:shadow-sm dark:ring-offset-black dark:focus-visible:ring-pink-500 dark:data-[state=active]:bg-zinc-900 dark:data-[state=active]:text-white",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={classNames(
      "mt-4 rounded-md ring-offset-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 dark:ring-offset-black dark:focus-visible:ring-pink-500",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
