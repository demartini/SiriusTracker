'use strict'

const path = require('path')

switch (process.platform) {
  case 'darwin': {
    module.exports = {
      up: path.join(__dirname, 'icons/macos/upTemplate.png'),
      down: path.join(__dirname, 'icons/macos/downTemplate.png'),
      load: path.join(__dirname, 'icons/macos/iconTemplate.png')
    }
    break
  }
  case 'win32': {
    module.exports = {
      up: path.join(__dirname, 'icons/win/up.ico'),
      down: path.join(__dirname, 'icons/win/down.ico'),
      load: path.join(__dirname, 'icons/win/icon.ico')
    }
    break
  }
  case 'linux': {
    module.exports = {
      up: path.join(__dirname, 'icons/linux/upTemplate.png'),
      down: path.join(__dirname, 'icons/linux/downTemplate.png'),
      load: path.join(__dirname, 'icons/linux/iconTemplate.png')
    }
    break
  }
}
