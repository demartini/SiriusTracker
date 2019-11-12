'use strict'

const electron = require('electron')
const numeral = require('numeral')
const { shell, ipcRenderer } = electron

const store = require('../store')

document.addEventListener('click', event => {
  if (event.target.href) {
    // Open links in external browser
    shell.openExternal(event.target.href)
    event.preventDefault()
  } else if (event.target.classList.contains('refresh-action')) {
    updateInfo()
  } else if (event.target.classList.contains('quit-action')) {
    window.close()
  }
})

const getInfo = () => {
  const url =
    'https://api.coingecko.com/api/v3/simple/price?ids=sirius&vs_currencies=btc,usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true'

  return window.fetch(url).then(response => {
    return response.json()
  })
}

const updateInfoView = info => {
  const sirius = info.sirius

  document.querySelector('.btc').textContent = '₿ ' + sirius.btc
  document.querySelector('.btc-market-cap').textContent =
    '₿ ' + sirius.btc_market_cap === 1
      ? 1
      : numeral(sirius.btc_market_cap).format('0,0.000000')
  document.querySelector('.btc-24h-vol').textContent =
    '₿ ' + sirius.btc_24h_vol === 1
      ? 1
      : numeral(sirius.btc_24h_vol).format('0,0.000000')
  document.querySelector('.btc-24h-change').textContent = numeral(
    sirius.btc_24h_change / 100
  ).format('0.00%')

  document.querySelector('.usd').textContent = numeral(sirius.usd).format(
    '$ 0,0[.]0000'
  )
  document.querySelector('.usd-market-cap').textContent = numeral(
    sirius.usd_market_cap
  )
    .format('$ 0.0 a')
    .toUpperCase()
  document.querySelector('.usd-24h-vol').textContent = numeral(
    sirius.usd_24h_vol
  )
    .format('$ 0.0 a')
    .toUpperCase()
  document.querySelector('.usd-24h-change').textContent = numeral(
    sirius.usd_24h_change / 100
  ).format('0.00%')
}

const updateInfo = () => {
  getInfo().then(info => {
    // Use local time
    info.sirius.last_updated_at = Date.now()

    ipcRenderer.send('info-updated', info)
    updateInfoView(info)
  })
}

// Refresh info every 10 seconds
// setInterval(updateInfo, 10000)
setInterval(updateInfo, store.get('syncInterval') * 1000)

// Update initial info when loaded
document.addEventListener('DOMContentLoaded', updateInfo)
