import { Skeleton } from "./ui/skeleton";

function TableSkeleton() {
    return (
      <div className="space-y-4">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-[100px]" /> {/* Add button */}
            <Skeleton className="h-10 w-[100px]" /> {/* Delete button */}
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-[100px]" /> {/* Search dropdown */}
            <Skeleton className="h-10 w-[200px]" /> {/* Search input */}
            <Skeleton className="h-10 w-[100px]" /> {/* Column visibility */}
          </div>
        </div>
  
        {/* Table Skeleton */}
        <div className="rounded-md border">
          <div className="border-b">
            <div className="flex items-center p-4 bg-gray-50">
              <Skeleton className="h-4 w-4 mr-6" /> {/* Checkbox */}
              <Skeleton className="h-4 w-[150px] mr-6" /> {/* Username */}
              <Skeleton className="h-4 w-[200px] mr-6" /> {/* Email */}
              <Skeleton className="h-4 w-[100px] mr-6" /> {/* Role */}
              <Skeleton className="h-4 w-[120px] mr-6" /> {/* Created At */}
              <Skeleton className="h-4 w-[120px] mr-6" /> {/* Updated At */}
              <Skeleton className="h-4 w-[80px]" /> {/* Actions */}
            </div>
          </div>
          {/* Table Body Skeleton - 5 rows */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center p-4 border-b last:border-0">
              <Skeleton className="h-4 w-4 mr-6" />
              <Skeleton className="h-4 w-[150px] mr-6" />
              <Skeleton className="h-4 w-[200px] mr-6" />
              <Skeleton className="h-4 w-[100px] mr-6" />
              <Skeleton className="h-4 w-[120px] mr-6" />
              <Skeleton className="h-4 w-[120px] mr-6" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
          ))}
        </div>
  
        {/* Pagination Skeleton */}
        <div className="flex items-center justify-between py-4">
          <Skeleton className="h-8 w-[200px]" /> {/* Rows per page */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-[100px]" /> {/* Page info */}
            <Skeleton className="h-8 w-[32px]" /> {/* Prev button */}
            <Skeleton className="h-8 w-[32px]" /> {/* Next button */}
          </div>
        </div>
      </div>
    );
  }

export default TableSkeleton;