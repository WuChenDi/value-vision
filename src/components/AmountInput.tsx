import { CURRENCY_CONFIG } from '@/app/page'
import { Input } from '@/components/ui/input'

interface AmountInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  currency: string
}

export default function AmountInput(props: AmountInputProps) {
  const { value, onChange, placeholder, currency } = props

  const getCurrencySymbol = (currencyValue: string) => {
    const crypto = CURRENCY_CONFIG.crypto.find((c) => c.value === currencyValue)
    const fiat = CURRENCY_CONFIG.fiat.find((f) => f.value === currencyValue)
    if (crypto) return crypto.symbol || crypto.value
    if (fiat) return fiat.symbol || fiat.value
    return ''
  }

  return (
    <div className="relative">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pr-16"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
        {getCurrencySymbol(currency)}
      </div>
    </div>
  )
}
