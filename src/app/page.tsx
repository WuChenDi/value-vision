'use client'

import { RefreshCw } from 'lucide-react'

import GradientText from '@/components/reactbits/GradientText'
import ShinyText from '@/components/reactbits/ShinyText'
import { Card, CardContent } from '@/components/ui/card'
import AmountInput from '@/components/AmountInput'
import CurrencySelector from '@/components/CurrencySelector'
import SpotlightCard from '@/components/reactbits/SpotlightCard'

import { useExchangeRates } from '@/hooks/useExchangeRates'
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter'

export default function App() {
  const { rates, loading, refreshRates } = useExchangeRates()
  const {
    fields,
    getUsedCurrencies,
    handleAmountChange,
    handleCurrencyChange,
  } = useCurrencyConverter(rates)

  return (
    <div className="w-full max-w-xl space-y-12 relative">
      <div className="text-center mb-8">
        <GradientText className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r">
          Value Converter
        </GradientText>
        <div className="flex items-center justify-center mt-6">
          <ShinyText
            text="✨ Re-examine your purchasing power and wealth perspective through cryptocurrency"
            disabled={false}
            speed={3}
            className="text-base md:text-lg text-gray-600 dark:text-gray-300"
          />
        </div>
      </div>

      <Card className="relative border-none bg-card/20 backdrop-blur-lg pb-2!">
        <div
          className="absolute top-4 right-6 cursor-pointer"
          title="Refresh the exchange rate"
          onClick={refreshRates}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </div>
        <CardContent className="p-4 sm:p-6 pb-2! space-y-4 sm:space-y-6">
          <div className="space-y-4">
            {fields.map((field, index) => (
              <SpotlightCard key={field.id}>
                <div className="flex items-center gap-3 sm:gap-4">
                  <CurrencySelector
                    value={field.currency}
                    onChange={(currency) =>
                      handleCurrencyChange(index, currency)
                    }
                    excludeCurrencies={getUsedCurrencies(index)}
                  />
                  <AmountInput
                    value={field.amount}
                    onChange={(value) => handleAmountChange(index, value)}
                    placeholder="Enter amount"
                    currency={field.currency}
                  />
                </div>
              </SpotlightCard>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
