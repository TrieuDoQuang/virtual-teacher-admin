"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
export function ConfirmationDialog({isOpen, setIsOpen, title, description, buttonText}: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void, title: string, description: string, buttonText: string}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button type="submit">{buttonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
