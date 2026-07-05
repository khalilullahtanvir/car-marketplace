import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

export const NavigationMenu = NavigationMenuPrimitive.Root;
export const NavigationMenuList = ({ className, ...props }: NavigationMenuPrimitive.NavigationMenuListProps) => (
  <NavigationMenuPrimitive.List className={cn("flex items-center gap-1", className)} {...props} />
);
export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export const NavigationMenuTrigger = NavigationMenuPrimitive.Trigger;
export const NavigationMenuContent = NavigationMenuPrimitive.Content;
export const NavigationMenuLink = NavigationMenuPrimitive.Link;
export const NavigationMenuViewport = NavigationMenuPrimitive.Viewport;
