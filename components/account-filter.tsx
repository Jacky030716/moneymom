"use client";

import qs from "query-string"
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const AccountFilter = () => {
  const router = useRouter()
  const pathname = usePathname()

  const params = useSearchParams()
  const accountId = params.get('accountId') || "all"
  const from = params.get('from') || ""
  const to = params.get('to') || ""

  const { isLoading: isLoadingSummary } = useGetSummary()
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts()

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to
    }

    if (newValue === "all") {
      query.accountId = ""
    }

    const url = qs.stringifyUrl({
      url: pathname,
      query,
    }, { skipNull: true, skipEmptyString: true })

    router.push(url)
  }

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger
        className="md:w-auto w-full h-9 rounded-md px-3 font-normal bg-neutral-700/10 hover:bg-neutral-700/5 hover:text-neutral-600 border-none focus:ring-offset-0 focus:ring-transparent outline-none text-neutral-600 transition"
      > 
        <SelectValue 
          placeholder="Filter by account"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          All accounts
        </SelectItem>
        {accounts?.map((account) => (
          <SelectItem 
            key={account.id}
            value={account.id}
          >
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}