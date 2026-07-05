import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;
export const AlertDialogOverlay = ({ className, ...props }: AlertDialogPrimitive.AlertDialogOverlayProps) => (
  <AlertDialogPrimitive.Overlay className={cn("fixed inset-0 z-50 bg-black/50", className)} {...props} />
);
export const AlertDialogContent = ({ className, ...props }: AlertDialogPrimitive.AlertDialogContentProps) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content className={cn("fixed left-1/2 top-1/2 z-50 w-[min(95vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-background p-6 shadow-lg", className)} {...props} />
  </AlertDialogPortal>
);
