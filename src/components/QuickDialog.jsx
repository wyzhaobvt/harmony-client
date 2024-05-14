import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";

/**
 *
 * @param {{title: string, message: string, body: React.JSX.Element, trigger: React.JSX.Element, onConfirm: ()=>void, onCancel: ()=>void, onClose: ()=>void, destructive?: boolean, open?: boolean}} param0
 * @example
 * // manual modal close
 * <QuickDialog
 *   onConfirm={(event)=>{
 *     event.close();
 *   }}
 *   onCancel={(event)=>{
 *     event.close();
 *   }}
 * />
 */
export default function QuickDialog({
  title,
  message,
  body,
  trigger,
  onConfirm,
  onCancel,
  onClose,
  destructive,
  open,
}) {
  const [modalOpen, setModalOpen] = useState(open);

  function closeModal() {
    setModalOpen(false);
  }

  function openModal() {
    setModalOpen(true);
  }

  function bindControls(e, func) {
    e.open = openModal;
    e.close = closeModal;

    if (typeof func === "function") {
      func(e);
    }
  }

  const confirmButton = (
    <Button
      variant={destructive ? "destructive" : "default"}
      onClick={(e) => {
        bindControls(e, onConfirm);
      }}
    >
      Confirm
    </Button>
  );

  const cancelButton = (
    <Button
      onClick={(e) => {
        bindControls(e, onCancel);
      }}
    >
      Cancel
    </Button>
  );
  return (
    <Dialog
      open={modalOpen}
      onOpenChange={(open) => {
        setModalOpen(open);
        if (!open && typeof onClose === "function") onClose();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        {body}
        <DialogFooter className="gap-1">
          {onCancel ? (
            cancelButton
          ) : (
            <DialogClose asChild>{cancelButton}</DialogClose>
          )}
          {onConfirm ? (
            confirmButton
          ) : (
            <DialogClose asChild>{confirmButton}</DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
