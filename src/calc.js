function monthsSince(monthString) {
  let then = new Date(monthString)
  let now = new Date()
  let months
  months = (now.getFullYear() - then.getFullYear()) * 12
  months -= then.getMonth()
  months += now.getMonth()
  return months <= 0 ? 0 : months
}

function getTermInMonths(term, termType) {
  if (termType === 'Years') {
    return term * 12
  } else {
    return term
  }
}

function interestInMonths({ startMonth, rate, amount, term }, payments) {
  let interestPaid = 0
  let balance = amount
  let monthly = monthlyPayment({ rate, amount, term })

  for (let i = 0; i < payments; i++) {
    let interest = (balance * rate) / 12
    interestPaid += interest
    balance -= monthly - interest
  }

  return interestPaid
}

function interestPaid({ startMonth, rate, amount, term }) {
  return interestInMonths({ rate, amount, term }, monthsSince(startMonth))
}

function interestTotal({ rate, amount, term }) {
  return interestInMonths({ rate, amount, term }, term)
}

function interestToPay({ startMonth, rate, amount, term }) {
  return (
    interestTotal({ startMonth, rate, amount, term }) -
    interestPaid({ startMonth, rate, amount, term })
  )
}

function principalRemaining({ startMonth, rate, amount, term }) {
  const months = monthsSince(startMonth)
  const totalPaid = months * monthlyPayment({ rate, amount, term })
  return amount - (totalPaid - interestPaid({ startMonth, rate, amount, term }))
}

function percentToDecimal(rate) {
  return rate / 100
}

function monthlyPayment({ rate, amount: a, term: n }) {
  let r = rate / 12

  return a / ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)))
}

// TODO Current loan payoff date
// TODO Payment to payoff by
// TODO Amortization data
// TODO Money saved with diff payment

function calculateLoanStats(data) {
  if (data.startMonth && data.rate && data.amount && data.term && data.termType) {
    const loanData = {
      startMonth: data.startMonth,
      rate: percentToDecimal(Number(data.rate)),
      amount: Number(data.amount.replace(/,/g, '')),
      term: Number(getTermInMonths(data.term, data.termType)),
    }

    const stats = {
      interestPaid: interestPaid(loanData),
      interestToPay: interestToPay(loanData),
      interestTotal: interestTotal(loanData),
      monthlyPayment: monthlyPayment(loanData),
      principalRemaining: principalRemaining(loanData),
    }
    return stats
  }
}

export { calculateLoanStats }
