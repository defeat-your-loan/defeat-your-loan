<script>
  import Calculator from './Calculator.svelte'

  export let name
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;600&display=swap"
    rel="stylesheet" />
</svelte:head>

<main>
  <h1>Defeat your loan</h1>
  <h2>Pay off your loans early and save money</h2>

  <Calculator />
</main>
