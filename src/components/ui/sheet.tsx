import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetPortal = DialogPrimitive.Portal;
export const SheetOverlay = ({ className, ...props }: DialogPrimitive.DialogOverlayProps) => (
  <DialogPrimitive.Overlay className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm", className)} {...props} />
);
export const SheetContent = ({ className, side = "right", children, ...props }: DialogPrimitive.DialogContentProps & { side?: "top" | "right" | "bottom" | "left" }) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content className={cn("fixed z-50 bg-background p-6 shadow-lg outline-none", side === "right" && "inset-y-0 right-0 w-3/4 sm:max-w-sm", side === "left" && "inset-y-0 left-0 w-3/4 sm:max-w-sm", side === "top" && "inset-x-0 top-0 h-auto", side === "bottom" && "inset-x-0 bottom-0 h-auto", className)} {...props}>
      {children}
      <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100">
        <X className="h-4 w-4" />
      </SheetClose>
    </DialogPrimitive.Content>
  </SheetPortal>
);
