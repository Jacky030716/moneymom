"use client"

import { useNewCategory } from "@/features/categories/hooks/use-new-category"
import { useGetCategories } from "@/features/categories/api/use-get-categories"
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Loader2, Plus } from "lucide-react"

import { columns } from "./columns"
import { Skeleton } from "@/components/ui/skeleton" 

const CategoriesPage = () => {
  const newCategory = useNewCategory()
  const deleteCategories = useBulkDeleteCategories()
  const categoriesQuery = useGetCategories()
  const categories = categoriesQuery.data || []

  const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending

  if(categoriesQuery.isLoading){
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-md">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 
                className="animate-spin text-muted-foreground size-6"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-md">
        <CardHeader className="gap-y-2 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Categories Page
          </CardTitle>
          <Button 
            onClick={newCategory.onOpen}
            size="sm"
          >
            <Plus className="size-4 mr-2"/>
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={categories}
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id)
              deleteCategories.mutate({ ids })
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default CategoriesPage