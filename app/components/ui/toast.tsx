import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { CircleAlert, CircleCheck, CircleX, X } from "lucide-react";
import * as React from "react";

import { cn } from "~/lib/utils/cn";

const ToastProvider = ToastPrimitives.Provider;

interface ToastViewportProperties
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> {
  className?: string;
}

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  ToastViewportProperties
>(({ className, ...properties }, reference) => (
  <ToastPrimitives.Viewport
    ref={reference}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...properties}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default:
          "border bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50",
        success:
          "border-green-500 bg-green-100 text-black dark:border-green-900 dark:bg-green-900 dark:text-green-50",
        error:
          "border-red-500 bg-red-100 text-black dark:border-red-900 dark:bg-red-900 dark:text-red-50",
        info: "border-black bg-black text-white dark:border-black dark:bg-white dark:text-black",
        warning:
          "border-orange-400 bg-orange-50 text-black dark:border-orange-900 dark:bg-orange-900 dark:text-orange-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const variantIcons: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleX,
  info: CircleAlert,
};

const variantIconColors: Record<string, string> = {
  success: "text-green-500 dark:text-green-50",
  warning: "text-orange-500 dark:text-orange-50",
  error: "text-red-500 dark:text-red-50",
  info: "text-white dark:text-black",
};

interface ToastProperties
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>,
    VariantProps<typeof toastVariants> {
  className?: string;
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProperties
>(({ className, variant, children, ...properties }, reference) => {
  const Icon = variant ? variantIcons[variant] : undefined;
  const iconColor = variant ? variantIconColors[variant] : "";
  return (
    <ToastPrimitives.Root
      ref={reference}
      className={cn(toastVariants({ variant }), className)}
      {...properties}
    >
      {Icon && <Icon className={cn("h-6 w-6 md:h-8 md:w-8", iconColor)} />}
      {children}
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

interface ToastActionProperties
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action> {
  className?: string;
  variant?: "success" | "error" | "info" | "warning";
}

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  ToastActionProperties
>(({ className, variant, ...properties }, reference) => {
  const actionVariantClasses: Record<string, string> = {
    success: "border-green-500 text-black focus:ring-green-500",
    error: "border-red-500 text-black focus:ring-red-500",
    info: "border-white text-black focus:ring-white",
    warning: "border-orange-500 text-black focus:ring-orange-500",
    default:
      "border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
  };

  return (
    <ToastPrimitives.Action
      ref={reference}
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-2 text-xs font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:px-3 md:text-sm",
        actionVariantClasses[variant || "default"],
        className,
      )}
      {...properties}
    />
  );
});
ToastAction.displayName = ToastPrimitives.Action.displayName;

interface ToastCloseProperties
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close> {
  className?: string;
}

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  ToastCloseProperties
>(({ className, ...properties }, reference) => (
  <ToastPrimitives.Close
    ref={reference}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className,
    )}
    toast-close=""
    {...properties}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

interface ToastTitleProperties
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title> {
  className?: string;
}

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  ToastTitleProperties
>(({ className, ...properties }, reference) => (
  <ToastPrimitives.Title
    ref={reference}
    className={cn("text-sm font-bold", className)}
    {...properties}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

interface ToastDescriptionProperties
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description> {
  className?: string;
}

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  ToastDescriptionProperties
>(({ className, ...properties }, reference) => (
  <ToastPrimitives.Description
    ref={reference}
    className={cn("text-xs opacity-90 md:text-sm", className)}
    {...properties}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export {
  type ToastProperties as ToastProps,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
