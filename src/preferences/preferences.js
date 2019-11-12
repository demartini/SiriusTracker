'use strict'

const { ipcRenderer } = require('electron')

const store = require('../store')

const githubSyncInterval = document.getElementById('github-sync-interval')
const launchAtLoginCheckbox = document.getElementById(
  'launch-at-login-checkbox'
)

githubSyncInterval.value = store.get('syncInterval')
launchAtLoginCheckbox.checked = store.get('autoLaunch')

githubSyncInterval.addEventListener('input', () => {
  if (isInvalid(githubSyncInterval)) return
  const syncInterval = parseInt(githubSyncInterval.value, 10)
  if (syncInterval > 0) {
    ipcRenderer.send('setSyncInterval', syncInterval)
  }
  githubSyncInterval.classList.toggle('is-danger', syncInterval < 1)
})

launchAtLoginCheckbox.addEventListener('change', () => {
  ipcRenderer.send('activateLaunchAtLogin', launchAtLoginCheckbox.checked)
})

function isInvalid(input) {
  return !input.value && !input.disabled
}
