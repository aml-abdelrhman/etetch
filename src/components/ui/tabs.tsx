import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { ScrollArea, ScrollBar } from "./scroll-area";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const locale = useLocale();
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      dir={locale === "ar" ? "rtl" : "ltr"}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <ScrollArea className="max-lg:max-w-svw max-w-full rounded-xl">
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(
          "bg-transparent text-muted-foreground inline-flex h-12 w-fit items-center justify-center rounded-full p-[3px] gap-3",
          className,
        )}
        {...props}
      />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function TabsTrigger({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  variant?: "default" | "secondary";
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "min-w-24 min-h-12 bg-card data-[state=active]:bg-primary data-[state=active]:text-white dark:data-[state=active]:text-white focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-full border border-transparent px-3 py-2 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
        variant === "secondary"
          ? "rounded-xl data-[state=active]:bg-card data-[state=active]:text-foreground flex items-center gap-3"
          : "",
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
