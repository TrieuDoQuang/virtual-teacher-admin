// components/ui/chip.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const chipVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
      },
      size: {
        default: "h-8 px-3",
        sm: "h-7 px-2",
        lg: "h-9 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ChipProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  label: string
  onDelete?: () => void
}

function Chip({ 
  className, 
  variant, 
  size, 
  label, 
  onDelete,
  ...props 
}: ChipProps) {
  return (
    <div
      className={cn(chipVariants({ variant, size }), className)}
      {...props}
    >
      <span>{label}</span>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ml-1 -mr-1 rounded-full p-0.5 hover:bg-background/20"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

export { Chip, chipVariants }