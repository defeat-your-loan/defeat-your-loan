import { derived, writable } from 'svelte/store'
import { calculateLoanStats } from './calc'

export const startMonth = writable(localStorage.getItem('startMonth') || '')
export const amount = writable(localStorage.getItem('amount') || '')
export const rate = writable(localStorage.getItem('rate') || '')
export const term = writable(localStorage.getItem('term') || '')
export const termType = writable(localStorage.getItem('termType') || 'Years')
export const strategy = writable(localStorage.getItem('strategy') || '')
export const payOffBy = writable(localStorage.getItem('payOffBy') || '')

startMonth.subscribe((val) => localStorage.setItem('startMonth', val))
amount.subscribe((val) => localStorage.setItem('amount', val))
rate.subscribe((val) => localStorage.setItem('rate', val))
term.subscribe((val) => localStorage.setItem('term', val))
termType.subscribe((val) => localStorage.setItem('termType', val))
strategy.subscribe((val) => localStorage.setItem('strategy', val))
payOffBy.subscribe((val) => localStorage.setItem('payOffBy', val))

export const loanStats = derived(
  [startMonth, amount, rate, term, termType],
  ([$startMonth, $amount, $rate, $term, $termType]) => {
    return calculateLoanStats({
      startMonth: $startMonth,
      amount: $amount,
      rate: $rate,
      term: $term,
      termType: $termType,
    })
  },
)
