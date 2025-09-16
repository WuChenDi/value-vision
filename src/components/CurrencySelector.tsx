import { CURRENCY_CONFIG } from '@/app/page'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'

interface CurrencySelectorProps {
  value: string
  onChange: (value: string) => void
  excludeCurrencies?: string[]
}

export default function CurrencySelector({
  value,
  onChange,
  excludeCurrencies = [],
}: CurrencySelectorProps) {
  const getCurrencyInfo = (currencyValue: string) => {
    const crypto = CURRENCY_CONFIG.crypto.find((c) => c.value === currencyValue)
    const fiat = CURRENCY_CONFIG.fiat.find((f) => f.value === currencyValue)
    const product = CURRENCY_CONFIG.products.find(
      (p) => p.value === currencyValue,
    )
    return crypto || fiat || product
  }

  const currentCurrency = getCurrencyInfo(value)

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue>
          {currentCurrency ? (
            <span>{currentCurrency.label}</span>
          ) : (
            <span>选择货币</span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>🚀 加密货币</SelectLabel>
          {CURRENCY_CONFIG.crypto.map((currency) => (
            <SelectItem
              key={currency.value}
              value={currency.value}
              disabled={excludeCurrencies.includes(currency.value)}
            >
              {currency.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>💰 法定货币</SelectLabel>
          {CURRENCY_CONFIG.fiat.map((currency) => (
            <SelectItem
              key={currency.value}
              value={currency.value}
              disabled={excludeCurrencies.includes(currency.value)}
            >
              {currency.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>🛍️ 实物商品</SelectLabel>
          {CURRENCY_CONFIG.products.map((product) => (
            <SelectItem
              key={product.value}
              value={product.value}
              disabled={excludeCurrencies.includes(product.value)}
            >
              {product.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
