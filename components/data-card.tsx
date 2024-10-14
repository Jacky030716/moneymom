import { VariantProps, cva } from "class-variance-authority"

import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import { CountUp } from "@/components/count-up"
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Skeleton } from "./ui/skeleton"

const boxVariants = cva(
  "rounded-md p-3",
  {
    variants: {
      variant: {
        default: "bg-sky-500/20",
        success: "bg-emerald-500/20",
        danger: "bg-rose-500/20",
        warning: "bg-amber-500/20",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  },
)

const iconVariants = cva(
  "size-6",
  {
    variants: {
      variant: {
        default: "fill-sky-500",
        success: "fill-emerald-500",
        danger: "fill-rose-500",
        warning: "fill-amber-500",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type boxVariants = VariantProps<typeof boxVariants>
type iconVariants = VariantProps<typeof iconVariants>

interface DataCardProps extends boxVariants, iconVariants {
  icon: React.ComponentType<any>
  title: string
  value?: number
  dateRange: string
  percentageChange?: number
}

export const DataCard = ({
  icon: Icon,
  title,
  value = 0,
  variant,
  dateRange,
  percentageChange = 0,
}: DataCardProps) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl line-clamp-1">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-1">
            {dateRange}
          </CardDescription>
        </div>
        <div className={cn(boxVariants({ variant }))}>
          <Icon className={iconVariants({ variant })} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
          <CountUp 
            preserveValue 
            start={0}
            end={value}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatCurrency}
          />
        </h1>
        <p className={cn(
          "text-muted-foreground text-sm line-clamp-1",
          percentageChange > 0 ? "text-emerald-500" : "text-rose-500"
        )}>
          {formatPercentage(percentageChange)} from last period
        </p>
      </CardContent>
    </Card>
  )
}

export const DataCardLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm h-[192px]">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-40 h-4" /> 
        </div>
        <Skeleton className="size-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-24 h-10 mb-2 shrink-0" />
        <Skeleton className="w-40 h-4 shrink-0" />
      </CardContent>
    </Card>
  )
}