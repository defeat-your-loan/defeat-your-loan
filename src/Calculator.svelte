<script>
  import { loanStats, startMonth, amount, rate, term, termType, strategy } from './stores'
  import PayOffBy from './PayOffBy.svelte'
  import SaveMoney from './SaveMoney.svelte'

  function setStrategy(s) {
    return function () {
      strategy.set(s)
    }
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  function submit(e) {
    e.preventDefault()
  }
</script>

<form on:submit={submit}>
  <fieldset>
    <label for="startMonth">My loan started in</label>
    <div>
      <input
        type="month"
        placeholder="Loan Start Date"
        id="startMonth"
        autocomplete="off"
        bind:value={$startMonth} />
    </div>
    <label for="amount">with the amount</label>
    <div class="dollars">
      <input
        type="text"
        placeholder="Loan Amount"
        id="amount"
        autocomplete="off"
        bind:value={$amount} />
    </div>
    <label for="rate">at the interest rate</label>
    <div class="rate">
      <input
        type="text"
        placeholder="Interest Rate"
        id="rate"
        autocomplete="off"
        bind:value={$rate} />
    </div>
    <label for="term">and has the term:</label>
    <div class="row">
      <div class="column">
        <input
          type="text"
          placeholder="Months/Years"
          id="term"
          autocomplete="off"
          bind:value={$term} />
      </div>
      <div class="column column-25">
        <select id="term-unit" autocomplete="off" bind:value={$termType}>
          <option>Years</option>
          <option>Months</option>
        </select>
      </div>
    </div>
    {#if $loanStats}
      <div class="stats">
        <h3>
          You pay <strong>{formatter.format($loanStats.monthlyPayment)}</strong> per month
        </h3>
        <h3 class="positive-text">
          You have paid <strong>{formatter.format($loanStats.interestPaid)}</strong> in interest so far.
        </h3>
        <h3 class="negative-text">
          You will pay <strong>{formatter.format($loanStats.interestToPay)}</strong> more interest for
          the rest of the loan.
        </h3>
        <h3>
          Principal Remaining: <strong>{formatter.format($loanStats.principalRemaining)}</strong>
        </h3>
      </div>

      <div class="mt-2">
        <h3>"I want to"</h3>
        <button on:click={setStrategy('payOffByDate')}>pay off by a date</button>
        <button on:click={setStrategy('saveMoney')}>save money on my loan</button>
      </div>

      {#if $strategy === 'payOffByDate'}
        <PayOffBy />
      {/if}
      {#if $strategy === 'saveMoney'}
        <SaveMoney />
      {/if}
    {/if}
  </fieldset>
</form>
