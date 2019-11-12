'use strict'

const electron = require('electron')
const AutoLaunch = require('auto-launch')
const { menubar } = require('menubar')
const numeral = require('numeral')
const isDev = require('electron-is-dev')

const icon = require('./icon')
const store = require('./store')
const { appUpdater } = require('./autoupdater')
const pjson = require('../package.json')

const { app, BrowserWindow, Menu, shell, ipcMain } = electron

// Adds debug features like hotkeys for triggering dev tools and reload in development mode
if (isDev) {
  require('electron-debug')()
  console.log('Running in development')
} else {
  console.log('Running in production')
}

const webPreferences = {
  nodeIntegration: true
}

const mb = menubar({
  browserWindow: {
    alwaysOnTop: process.platform === 'win32',
    darkTheme: true,
    frame: false,
    fullscreen: false,
    fullscreenable: false,
    height: 560,
    maximizable: false,
    minimizable: false,
    resizable: false,
    show: false,
    useContentSize: true,
    webPreferences,
    width: 360
  },
  icon: icon.load,
  index: `file://${__dirname}/index/index.html`,
  preloadWindow: true
})

app.on('ready', () => {
  const autoLauncher = new AutoLaunch({ name: pjson.productName })
  mb.tray.setTitle('Loading...')
  let preferencesWindow = null
  let notificationsWindow = null

  function createPreferencesWindow() {
    preferencesWindow = new BrowserWindow({
      fullscreenable: false,
      height: 356,
      maximizable: false,
      minimizable: false,
      resizable: false,
      show: false,
      title: `${pjson.productName} - Preferences`,
      useContentSize: true,
      webPreferences,
      width: 300
    })

    preferencesWindow.loadURL(
      `file://${__dirname}/preferences/preferences.html`
    )

    preferencesWindow.on('ready-to-show', () => {
      preferencesWindow.show()
      if (process.platform === 'darwin') {
        app.dock.show()
      }
    })

    preferencesWindow.on('closed', () => {
      preferencesWindow = null
      if (process.platform === 'darwin') {
        app.dock.hide()
      }
    })
  }

  function onPreferencesClick() {
    if (preferencesWindow === null) {
      return createPreferencesWindow()
    }
    preferencesWindow.focus()
  }

  function createNotificationsWindow() {
    notificationsWindow = new BrowserWindow({
      height: 600,
      show: false,
      title: `${pjson.productName} - Notifications`,
      useContentSize: true,
      webPreferences,
      width: 800
    })

    notificationsWindow.loadURL(
      `file://${__dirname}/notifications/notifications.html`
    )

    notificationsWindow.on('ready-to-show', () => {
      notificationsWindow.show()
      if (process.platform === 'darwin') {
        app.dock.show()
      }
    })

    notificationsWindow.on('closed', () => {
      notificationsWindow = null
      if (process.platform === 'darwin') {
        app.dock.hide()
      }
      clearInterval()
    })
  }

  function onNotificationsClick() {
    if (notificationsWindow === null) {
      return createNotificationsWindow()
    }
    notificationsWindow.focus()
  }

  function createTrayMenu() {
    return Menu.buildFromTemplate([
      {
        label: 'Notifications',
        click: onNotificationsClick
      },
      { type: 'separator' },
      {
        label: 'Preferences',
        accelerator: 'CmdOrCtrl+,',
        click: onPreferencesClick
      },
      { type: 'separator' },
      {
        label: 'Check for Updates',
        click: appUpdater
      },
      { type: 'separator' },
      {
        label: 'Sirius Website',
        click: () => shell.openExternal('https://getsirius.io')
      },
      { type: 'separator' },
      {
        label: `About ${pjson.productName}`,
        click: () => shell.openExternal(pjson.homepage)
      },
      {
        label: 'Feedback && Support',
        click: () => shell.openExternal(pjson.bugs.url)
      },
      { type: 'separator' },
      {
        label: `Quit ${pjson.productName}`,
        accelerator: 'CmdOrCtrl+Q',
        click: () => app.quit()
      }
    ])
  }

  function setSyncInterval(event, interval) {
    store.set('syncInterval', interval)
    event.sender.send('syncIntervalSet')
  }

  function activateLaunchAtLogin(event, isEnabled) {
    store.set('autoLaunch', isEnabled)
    isEnabled ? autoLauncher.enable() : autoLauncher.disable()
    event.sender.send('activateLaunchAtLoginSet')
  }

  mb.window.webContents.once('did-finish-load', () => {
    appUpdater()
  })

  process.on('uncaughtException', () => {
    mb.tray.setContextMenu(createTrayMenu())
    mb.tray.setImage(icon.load)
  })

  app.on('window-all-closed', () => {})

  mb.tray.on('right-click', () => {
    mb.tray.popUpContextMenu(createTrayMenu())
  })

  mb.on('focus-lost', () => {
    mb.app.hide()
  })

  mb.on('after-close', () => {
    mb.app.quit()
  })

  ipcMain.on('info-updated', (event, info) => {
    // Show the price in tray.
    mb.tray.setTitle(numeral(info.sirius.usd).format('$ 0,0[.]0000'))

    // Show the price on hover tooltip.
    const time = new Date(info.sirius.last_updated_at).toLocaleTimeString()
    mb.tray.setToolTip(
      '1 Sirius (SIRX) equals ' +
        numeral(info.sirius.usd).format('$ 0,0[.]0000') +
        ' USD at ' +
        time
    )
  })

  ipcMain.on('setSyncInterval', setSyncInterval)

  ipcMain.on('activateLaunchAtLogin', activateLaunchAtLogin)
})
