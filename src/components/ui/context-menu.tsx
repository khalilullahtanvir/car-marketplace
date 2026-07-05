import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { cn } from "@/lib/utils";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuContent = ({ className, ...props }: ContextMenuPrimitive.ContextMenuContentProps) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content className={cn("z-50 min-w-48 overflow-hidden rounded-2xl border bg-popover p-1 shadow-md", className)} {...props} />
  </ContextMenuPrimitive.Portal>
);
export const ContextMenuItem = ContextMenuPrimitive.Item;
