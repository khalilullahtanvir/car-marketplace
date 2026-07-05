import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

export const Avatar = AvatarPrimitive.Root;
export const AvatarImage = AvatarPrimitive.Image;
export const AvatarFallback = AvatarPrimitive.Fallback;

export function AvatarContainer({ className, ...props }: AvatarPrimitive.AvatarProps) {
  return <AvatarPrimitive.Root className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />;
}
