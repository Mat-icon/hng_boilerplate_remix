# How to Use the `ToastWithAction` Component

## Overview
The `ToastWithAction` component allows you to display toast notifications with a call-to-action button in your Next.js project. You can customize the toasts with different variants, descriptions, and actions.

## Prerequisites
Ensure you have the following components and hooks available:
- `Button` from `~/components/ui/button`
- `ToastAction` from `~/components/ui/toast`
- `useToast` from `~/components/ui/use-toast`

## Step-by-Step Implementation

### 1. Create the `ToastWithAction` Component

Create a new file or add the following code to an existing file:

```jsx
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
2. Import and Use the ToastWithAction Component
Import the ToastWithAction component into the desired part of your application and use it as follows:


import { ToastWithAction } from '~/path/to/ToastWithAction';

function App() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <ToastWithAction />
    </div>
  );
}

export default App;
Example Usage
Here's an example of how to integrate the ToastWithAction component into a more complex component or page:

jsx
Copy code
import { ToastWithAction } from '~/path/to/ToastWithAction';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <ToastWithAction />
    </div>
  );
}

export default Dashboard;


Customization
You can customize the toast notification by changing the variant, title, description, and action properties in the toast function call. Below are the options you can use:

Variants
You can change the variant to modify the styling of the toast. Available variants include:

default
success
error
info
jsx
Copy code
toast({
  variant: "success", // Change to "default", "error", or "info" as needed
  title: "Success",
  description: "Your operation was successful.",
  action: (
    <ToastAction variant="success" altText="Okay">
      Okay
    </ToastAction>
  ),
});
Description
You can provide a description to give more details about the toast message.

toast({
  variant: "info",
  title: "Information",
  description: "Here is some important information you should know.",
  action: (
    <ToastAction variant="info" altText="Got it">
      Got it
    </ToastAction>
  ),
});
Toast Action
You can add an action button inside the toast. The ToastAction component allows you to specify the action button's variant and alternative text.

jsx
Copy code
toast({
  variant: "error",
  title: "Error",
  description: "An error occurred. Please try again.",
  action: (
    <ToastAction variant="error" altText="Retry">
      Retry
    </ToastAction>
  ),
});