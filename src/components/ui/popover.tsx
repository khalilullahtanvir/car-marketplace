import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverContent = ({ className, align = "center", sideOffset = 4, ...props }: PopoverPrimitive.PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={cn("z-50 w-72 rounded-2xl border bg-popover p-4 shadow-lg outline-none", className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
);
