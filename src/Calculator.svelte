<script>
  import { loanStats } from './calc'
  import PayOffBy from './PayOffBy.svelte'
  import SaveMoney from './SaveMoney.svelte'

  let startMonth
  let amount
  let rate
  let term
  let termType

  let iWantTo = ''

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  $: stats = loanStats({ startMonth, amount, rate, term, termType })

  function submit(e) {
    e.preventDefault()
  }

  function payOffByDate() {
    iWantTo = 'payOffByDate'
  }

  function saveMoney() {
    iWantTo = 'saveMoney'
  }
</script>

<form on:submit={submit}>
  <label for="startMonth">My loan started in</label>
  <div>
    <input
      type="month"
      placeholder="Loan Start Date"
      id="startMonth"
      autocomplete="off"
      bind:value={startMonth} />
  </div>
  <label for="amount">with the amount</label>
  <div class="dollars">
    <input
      type="text"
      placeholder="Loan Amount"
      id="amount"
      autocomplete="off"
      bind:value={amount} />
  </div>
  <label for="rate">at the interest rate</label>
  <div class="rate">
    <input type="text" placeholder="Interest Rate" id="rate" autocomplete="off" bind:value={rate} />
  </div>
  <label for="term">and has the term:</label>
  <div class="row">
    <div class="column">
      <input
        type="text"
        placeholder="Months/Years"
        id="term"
        autocomplete="off"
        bind:value={term} />
    </div>
    <div class="column column-25">
      <select id="term-unit" autocomplete="off" bind:value={termType}>
        <option>Years</option>
        <option>Months</option>
      </select>
    </div>
  </div>
  {#if stats}
    <div class="stats">
      <h3>
        You pay <strong>{formatter.format(stats.monthlyPayment)}</strong> per month
      </h3>
      <h3 class="positive-text">
        You have paid <strong>{formatter.format(stats.interestPaid)}</strong> in interest so far.
      </h3>
      <h3 class="negative-text">
        You will pay <strong>{formatter.format(stats.interestToPay)}</strong> more interest for the rest
        of the loan.
      </h3>
      <!-- <h3>Total Interest: ${stats.interestTotal}</h3> -->
    </div>

    <div class="mt-2">
      <h3>"I want to"</h3>
      <button on:click={payOffByDate}>pay off by a date</button>
      <button on:click={saveMoney}>save money on my loan</button>
    </div>

    {#if iWantTo === 'payOffByDate'}
      <PayOffBy />
    {/if}
    {#if iWantTo === 'saveMoney'}
      <SaveMoney />
    {/if}
  {/if}
</form>
