import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;
export const HoverCardContent = ({ className, ...props }: HoverCardPrimitive.HoverCardContentProps) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content className={cn("z-50 w-80 rounded-2xl border bg-popover p-4 shadow-md", className)} {...props} />
  </HoverCardPrimitive.Portal>
);
