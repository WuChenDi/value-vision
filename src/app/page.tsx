'use client'

import { RefreshCw } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

import GradientText from '@/components/reactbits/GradientText'
import ShinyText from '@/components/reactbits/ShinyText'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import AmountInput from '@/components/AmountInput'
import CurrencySelector from '@/components/CurrencySelector'
import { defaultRates } from '@/lib/rates'

export const CURRENCY_CONFIG = {
  crypto: [
    { value: 'BTC', label: '🟠 Bitcoin', id: 'bitcoin', symbol: 'BTC' },
    { value: 'ETH', label: '♦️ Ethereum', id: 'ethereum', symbol: 'ETH' },
    { value: 'SOL', label: '🟣 Solana', id: 'solana', symbol: 'SOL' },
    { value: 'BNB', label: '🟡 BNB', id: 'binancecoin', symbol: 'BNB' },
    { value: 'OKB', label: '⚫ OKB', id: 'okb', symbol: 'OKB' },
  ],
  fiat: [
    { value: 'USD', label: '🇺🇸 美元', symbol: '$' },
    { value: 'CNY', label: '🇨🇳 人民币', symbol: '¥' },
    { value: 'JPY', label: '🇯🇵 日元', symbol: '¥' },
    { value: 'KRW', label: '🇰🇷 韩元', symbol: '₩' },
    { value: 'SGD', label: '🇸🇬 新币', symbol: 'S$' },
    { value: 'AED', label: '🇦🇪 迪拉姆', symbol: 'د.إ' },
    { value: 'HKD', label: '🇭🇰 港币', symbol: 'HK$' },
    { value: 'MYR', label: '🇲🇾 马币', symbol: 'RM' },
  ],
  products: [
    { value: 'ZHUJIAO', label: '🍚 猪脚饭', price: 20, currency: 'CNY' },
    { value: 'KFC', label: '🍗 KFC套餐', price: 50, currency: 'CNY' },
    { value: 'IN11', label: '💃 in11嫩模', price: 3000, currency: 'CNY' },
    { value: 'IPHONE17', label: '📱 iPhone17', price: 799, currency: 'USD' },
    { value: 'MACBOOK', label: '💻 MacBook Air', price: 999, currency: 'USD' },
    { value: 'ROLEX', label: '⌚ Rolex手表', price: 56500, currency: 'CNY' },
    { value: 'XIAOMISU7', label: '🚗 小米SU7', price: 215900, currency: 'CNY' },
    {
      value: 'PORSCHE',
      label: '🚗 Porsche 718',
      price: 550000,
      currency: 'CNY',
    },
    {
      value: 'FERRARI',
      label: '🚗 Ferrari Roma',
      price: 1750000,
      currency: 'CNY',
    },
  ],
}

interface Rates {
  [key: string]: {
    [key: string]: number
  }
}

interface ConverterField {
  currency: string
  amount: string
  id: string
}

export default function Home() {
  const [rates, setRates] = useState<Rates>({})
  const [fields, setFields] = useState<ConverterField[]>([
    { currency: 'BTC', amount: '', id: 'field-btc' },
    { currency: 'ETH', amount: '', id: 'field-eth' },
    { currency: 'SOL', amount: '', id: 'field-sol' },
    { currency: 'USD', amount: '', id: 'field-usd' },
    { currency: 'CNY', amount: '', id: 'field-cny' },
    { currency: 'HKD', amount: '', id: 'field-hkd' },
  ])
  const [updating, setUpdating] = useState(false)
  const [lastInputIndex, setLastInputIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  // 获取已使用的货币列表
  const getUsedCurrencies = (excludeIndex?: number) => {
    return fields
      .filter((_, index) => index !== excludeIndex)
      .map(field => field.currency)
  }

  const loadRates = async () => {
    setLoading(true)
    try {
      // 获取加密货币价格 (USD)
      const cryptoResponse = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,okb&vs_currencies=usd',
      )
      const cryptoData: any = await cryptoResponse.json()

      // 获取法币汇率 (USD基准)
      const fiatResponse = await fetch(
        'https://api.exchangerate-api.com/v4/latest/USD',
      )
      const fiatData: any = await fiatResponse.json()

      const btcPrice = cryptoData.bitcoin.usd
      const ethPrice = cryptoData.ethereum.usd
      const solPrice = cryptoData.solana.usd
      const bnbPrice = cryptoData.binancecoin.usd
      const okbPrice = cryptoData.okb.usd

      const currencies = ['CNY', 'JPY', 'KRW', 'SGD', 'AED', 'HKD', 'MYR']
      const cryptos = ['BTC', 'ETH', 'SOL', 'BNB', 'OKB']
      const products = [
        'ZHUJIAO',
        'KFC',
        'IN11',
        'IPHONE17',
        'FERRARI',
        'PORSCHE',
        'XIAOMISU7',
        'ROLEX',
        'MACBOOK',
      ]
      const cryptoPrices: any = {
        BTC: btcPrice,
        ETH: ethPrice,
        SOL: solPrice,
        BNB: bnbPrice,
        OKB: okbPrice,
      }
      const productPrices: any = {
        ZHUJIAO: 20 / fiatData.rates.CNY,
        KFC: 50 / fiatData.rates.CNY,
        IN11: 3000 / fiatData.rates.CNY,
        IPHONE17: 799,
        FERRARI: 1750000 / fiatData.rates.CNY,
        PORSCHE: 550000 / fiatData.rates.CNY,
        XIAOMISU7: 215900 / fiatData.rates.CNY,
        ROLEX: 56500 / fiatData.rates.CNY,
        MACBOOK: 999,
      }

      const newRates: Rates = {}

      const allCurrencies = [...cryptos, 'USD', ...currencies, ...products]
      allCurrencies.forEach((from) => {
        newRates[from] = {}
        allCurrencies.forEach((to) => {
          if (from === to) {
            newRates[from][to] = 1
          } else if (cryptos.includes(from) && cryptos.includes(to)) {
            newRates[from][to] = cryptoPrices[from] / cryptoPrices[to]
          } else if (cryptos.includes(from) && to === 'USD') {
            newRates[from][to] = cryptoPrices[from]
          } else if (from === 'USD' && cryptos.includes(to)) {
            newRates[from][to] = 1 / cryptoPrices[to]
          } else if (cryptos.includes(from) && currencies.includes(to)) {
            newRates[from][to] = cryptoPrices[from] * fiatData.rates[to]
          } else if (currencies.includes(from) && cryptos.includes(to)) {
            newRates[from][to] = 1 / (cryptoPrices[to] * fiatData.rates[from])
          } else if (from === 'USD' && currencies.includes(to)) {
            newRates[from][to] = fiatData.rates[to]
          } else if (currencies.includes(from) && to === 'USD') {
            newRates[from][to] = 1 / fiatData.rates[from]
          } else if (currencies.includes(from) && currencies.includes(to)) {
            newRates[from][to] = fiatData.rates[to] / fiatData.rates[from]
          } else if (products.includes(from) && to === 'USD') {
            newRates[from][to] = productPrices[from]
          } else if (from === 'USD' && products.includes(to)) {
            newRates[from][to] = 1 / productPrices[to]
          } else if (products.includes(from) && currencies.includes(to)) {
            newRates[from][to] = productPrices[from] * fiatData.rates[to]
          } else if (currencies.includes(from) && products.includes(to)) {
            newRates[from][to] = 1 / (productPrices[to] * fiatData.rates[from])
          } else if (cryptos.includes(from) && products.includes(to)) {
            newRates[from][to] = cryptoPrices[from] / productPrices[to]
          } else if (products.includes(from) && cryptos.includes(to)) {
            newRates[from][to] = productPrices[from] / cryptoPrices[to]
          } else if (products.includes(from) && products.includes(to)) {
            newRates[from][to] = productPrices[from] / productPrices[to]
          }
        })
      })

      console.log('汇率加载成功:', newRates)
      setRates(newRates)
    } catch (error) {
      console.error('汇率加载失败:', error)
      setRates(defaultRates)
    } finally {
      setLoading(false)
    }
  }

  const convert = useCallback(
    (sourceIndex: number, currentFields?: ConverterField[]) => {
      if (updating) return
      setUpdating(true)

      const fieldsToUse = currentFields || fields
      const sourceField = fieldsToUse[sourceIndex]
      const sourceAmount = parseFloat(sourceField.amount.replace(/,/g, ''))
      const sourceCurrency = sourceField.currency

      if (!sourceField.amount || sourceField.amount === '') {
        setFields((prev) =>
          prev.map((field, index) =>
            index === sourceIndex ? field : { ...field, amount: '' },
          ),
        )
        setUpdating(false)
        return
      }

      if (isNaN(sourceAmount)) {
        setUpdating(false)
        return
      }

      setFields((prev) =>
        prev.map((field, index) => {
          if (index === sourceIndex) return field

          const targetCurrency = field.currency
          let result = 0

          if (sourceCurrency === targetCurrency) {
            result = sourceAmount
          } else if (
            rates[sourceCurrency] &&
            rates[sourceCurrency][targetCurrency]
          ) {
            result = sourceAmount * rates[sourceCurrency][targetCurrency]
          }

          const formattedAmount = result.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })

          return {
            ...field,
            amount: formattedAmount,
          }
        }),
      )

      setUpdating(false)
    },
    [fields, rates, updating],
  )

  useEffect(() => {
    loadRates()
  }, [])

  useEffect(() => {
    if (Object.keys(rates).length > 0 && fields[lastInputIndex]?.amount) {
      convert(lastInputIndex)
    }
  }, [rates])

  const handleAmountChange = (index: number, value: string) => {
    setLastInputIndex(index)

    setFields((prev) => {
      const newFields = prev.map((field, i) =>
        i === index ? { ...field, amount: value } : field,
      )

      setTimeout(() => convert(index, newFields), 0)

      return newFields
    })
  }

  const handleCurrencyChange = (index: number, currency: string) => {
    setFields((prev) => {
      const newFields = prev.map((field, i) =>
        i === index ? { ...field, currency } : field,
      )

      setTimeout(() => convert(lastInputIndex, newFields), 0)

      return newFields
    })
  }

  const refreshRates = () => {
    loadRates()
  }

  return (
    <div className="w-full max-w-4xl space-y-12 relative">
      <div className="text-center mb-8">
        <GradientText className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r">
          价值观纠正器
        </GradientText>
        <div className="mt-6">
          <ShinyText
            text="在这个魔幻现实的世界里，让我们重新审视价值的真正含义 ✨"
            disabled={false}
            speed={3}
            className="text-base md:text-lg text-gray-600 dark:text-gray-300"
          />
        </div>
      </div>

      <Card className="border-none bg-card/20 backdrop-blur-lg">
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex justify-center items-center mb-8">
            <Button
              onClick={refreshRates}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition-all duration-300"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
              />
              {loading ? '更新中...' : '刷新汇率'}
            </Button>
          </div>

          <div className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="space-y-4 p-4 sm:p-6 rounded-xl bg-card/20 backdrop-blur-lg border border-border/50 shadow-sm transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-6 flex-wrap lg:flex-nowrap">
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
                    placeholder="输入金额"
                    currency={field.currency}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
