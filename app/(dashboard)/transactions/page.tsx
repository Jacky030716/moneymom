"use client"

import { transactions as transactionSchema } from "@/db/schema"

import { useSelectAccount } from "@/features/accounts/hooks/use-select-account"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions"
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions"
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions"

import { ImportCard } from "./import-card"
import { UploadButton } from "./upload-button"
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
import { useState } from "react"
import { toast } from "sonner"

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
}

const TransactionPage = () => {
  const [AccountDialog, confirm] = useSelectAccount()

  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
  const [importResults, setImportResults] = useState<typeof INITIAL_IMPORT_RESULTS>(INITIAL_IMPORT_RESULTS)

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results)
    setVariant(VARIANTS.IMPORT)
  }

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS)
    setVariant(VARIANTS.LIST)
  }

  const newTransaction = useNewTransaction()
  const createTransactions = useBulkCreateTransactions()
  const deleteTransactions = useBulkDeleteTransactions()
  const transactionsQuery = useGetTransactions()
  const transactions = transactionsQuery.data || []

  const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending

  const onSubmitImport = async (
    values: typeof transactionSchema.$inferInsert[]
  ) => {
    const accountId = await confirm()

    if(!accountId){
      return toast.error("Please select an account to continue")
    } 

    const data = values.map((value) => ({
      ...value,
      account_id: accountId as string
    }))

    createTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport()
      }
    })
  }

  if(transactionsQuery.isLoading){
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

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard 
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-md">
        <CardHeader className="gap-y-2 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions History
          </CardTitle>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <Button 
              onClick={newTransaction.onOpen}
              size="sm"
              className="w-full md:w-auto"
            >
              <Plus className="size-4 mr-2"/>
              Add new
            </Button>
            <UploadButton 
              onUpload={onUpload}
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={transactions}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id)
              deleteTransactions.mutate({ ids })
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionPage