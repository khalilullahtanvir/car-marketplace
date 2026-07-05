import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuContent = ({ className, sideOffset = 4, ...props }: DropdownMenuPrimitive.DropdownMenuContentProps) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      sideOffset={sideOffset}
      className={cn("z-50 min-w-48 overflow-hidden rounded-2xl border bg-popover p-1 shadow-md", className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);
export const DropdownMenuItem = ({ className, inset, ...props }: DropdownMenuPrimitive.DropdownMenuItemProps & { inset?: boolean }) => (
  <DropdownMenuPrimitive.Item
    className={cn("relative flex cursor-pointer select-none items-center rounded-lg px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground", inset && "pl-8", className)}
    {...props}
  />
);
export const DropdownMenuCheckboxItem = DropdownMenuPrimitive.CheckboxItem;
export const DropdownMenuRadioItem = DropdownMenuPrimitive.RadioItem;
export const DropdownMenuLabel = DropdownMenuPrimitive.Label;
export const DropdownMenuSeparator = ({ className, ...props }: DropdownMenuPrimitive.DropdownMenuSeparatorProps) => (
  <DropdownMenuPrimitive.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
);
