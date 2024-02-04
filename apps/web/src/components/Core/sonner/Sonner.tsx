import { Toaster as Sonner } from "sonner";

import { useThemeStore } from "@/stores/themeStore";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useThemeStore();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-neutral-200 dark:group-[.toaster]:bg-black group-[.toaster]:text-black dark:group-[.toaster]:text-white group-[.toaster]:border-black dark:group-[.toaster]:border-white group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-black dark:group-[.toast]:text-white",
          actionButton:
            "group-[.toast]:bg-neutral-200 dark:group-[.toast]:bg-black group-[.toast]:text-black dark:group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-black dark:group-[.toast]:bg-white group-[.toast]:text-black dark:group-[.toast]:text-white",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
