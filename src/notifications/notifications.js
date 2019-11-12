setInterval(function() {
  fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=sirius&vs_currencies=btc'
  )
    .then(response => response.json())
    .then(info => {
      document.getElementById('newRate').value = `${info.sirius.btc}`
    })
    .catch(error => {
      console.log(error)
    })
}, 6000)
