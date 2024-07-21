"use client";

import { Button } from "~/components/ui/button";
import { ToastAction } from "~/components/ui/toast";
import { useToast } from "~/components/ui/use-toast";

export function ToastWithAction() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: "success",
          title: "Warning",
          description: "The warning message goes here, clear and concise.",
          action: (
            <ToastAction variant="success" altText="Try again">
              Try again
            </ToastAction>
          ),
        });
      }}
    >
      Show Toast
    </Button>
  );
}
