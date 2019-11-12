'use strict'

const electron = require('electron')
const { autoUpdater } = require('electron-updater')
const isDev = require('electron-is-dev')

const { app, dialog, shell } = electron

function appUpdater(updateFromMenu = false) {
  // Don't initiate auto-updates in development
  if (isDev) {
    return
  }

  let updateAvailable = false

  // Create Logs directory
  const LogsDir = `${app.getPath('userData')}/Logs`

  // Log whats happening
  const log = require('electron-log')

  log.transports.file.file = `${LogsDir}/updates.log`
  log.transports.file.level = 'info'
  autoUpdater.logger = log

  const eventsListenerRemove = ['update-available', 'update-not-available']

  autoUpdater.on('update-available', info => {
    if (updateFromMenu) {
      dialog.showMessageBox({
        message: `A new version ${info.version}, of SiriusTracker is available`,
        detail:
          'The update will be downloaded in the background. You will be notified when it is ready to be installed.'
      })

      updateAvailable = true

      // This is to prevent removal of 'update-downloaded' and 'error' event listener.
      eventsListenerRemove.forEach(event => {
        autoUpdater.removeAllListeners(event)
      })
    }
  })

  autoUpdater.on('update-not-available', () => {
    if (updateFromMenu) {
      dialog.showMessageBox({
        message: 'No updates available',
        detail: `You are running the latest version of SiriusTracker.\nVersion: ${app.getVersion()}`
      })
      // Remove all autoUpdator listeners so that next time autoUpdator is manually called these listeners don't trigger multiple times.
      autoUpdater.removeAllListeners()
    }
  })

  autoUpdater.on('error', error => {
    if (updateFromMenu) {
      const messageText = updateAvailable
        ? 'Unable to download the updates'
        : 'Unable to check for updates'
      dialog.showMessageBox(
        {
          type: 'error',
          buttons: ['Manual Download', 'Cancel'],
          message: messageText,
          detail:
            error.toString() +
            `\n\nThe latest version of SiriusTracker is available at -\nhttps://github.com/demartini/SiriusTracker/releases.\n
            Current Version: ${app.getVersion()}`
        },
        response => {
          if (response === 0) {
            shell.openExternal(
              'https://github.com/demartini/SiriusTracker/releases'
            )
          }
        }
      )
      // Remove all autoUpdator listeners so that next time autoUpdator is manually called these
      // listeners don't trigger multiple times.
      autoUpdater.removeAllListeners()
    }
  })

  // Ask the user if update is available
  autoUpdater.on('update-downloaded', event => {
    // Ask user to update the app
    dialog.showMessageBox(
      {
        type: 'question',
        buttons: ['Install and Relaunch', 'Install Later'],
        defaultId: 0,
        message: `A new update ${event.version} has been downloaded`,
        detail: 'It will be installed the next time you restart the application'
      },
      response => {
        if (response === 0) {
          setTimeout(() => {
            autoUpdater.quitAndInstall()
            // force app to quit. This is just a workaround, ideally autoUpdater.quitAndInstall() should relaunch the app.
            app.quit()
          }, 1000)
        }
      }
    )
  })

  // Init for updates
  autoUpdater.checkForUpdates()
}

module.exports = {
  appUpdater
}
