<script>
  export let name;
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;600&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main>
  <h1>Defeat your loan</h1>
  <h2>Pay off your loans early and save money</h2>

  <form class="mt-1">
    <label for="amount">Initial Loaned Amount</label>
    <div class="dollars">
      <input
        type="text"
        placeholder="Loan Amount"
        id="amount"
        autocomplete="off"
      />
    </div>
    <label for="rate">Interest Rate</label>
    <div class="rate">
      <input
        type="text"
        placeholder="Interest Rate"
        id="rate"
        autocomplete="off"
      />
    </div>
    <label for="rate">Term</label>
    <div class="row">
      <div class="column">
        <input
          type="text"
          placeholder="Months/Years"
          id="term"
          autocomplete="off"
        />
      </div>
      <div class="column column-25">
        <select id="term-unit" autocomplete="off">
          <option>Years</option>
          <option>Months</option>
        </select>
      </div>
    </div>
  </form>
</main>
