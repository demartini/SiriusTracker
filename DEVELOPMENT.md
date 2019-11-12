# Development Setup

This is a guide to running the SiriusTracker app from a source tree, in order to contribute to developing it. The SiriusTracker development environment can be installed on **macOS, Windows, and Linux** (Debian or Ubuntu recommended). You’ll need at least **2GB of available RAM**. Installing the SiriusTracker development environment requires downloading several hundred megabytes of dependencies, so you will need an **active, reasonably fast, internet connection throughout the entire installation processes.**

# Set up Git & GitHub

You can skip this step if you already have Git, GitHub.

Follow this great [Git Guide](http://rogerdudler.github.io/git-guide/index.html) in order to install Git and set up a GitHub account.

# Install Prerequisites

Jump to:

- [MacOS](#macos)
- [Ubuntu/Debian](#ubuntudebian)
- [Windows](#windows)

## MacOS

**Node JS** Go to the [Node.js Downloads page](https://nodejs.org/en/download/). Download Node.js for MacOS (`v12.13.0` or above recommended). Run the downloaded Node.js `.pkg` Installer. You're finished! To ensure Node.js has been installed, run `node -v` in your terminal - you should get something like `v12.13.0` or above **if** [**NPM**](https://www.npmjs.com/get-npm) **and** [**node-gyp**](https://github.com/nodejs/node-gyp#installation) **don't come bundled with your Node.js installation, Download manually**.

Now you are ready for next step: [Get SiriusTracker Code](#get-siriustracker-code).

## Ubuntu/Debian

If you’re in a hurry, you can copy and paste the following into your terminal:

```
$ sudo apt install git nodejs node-gyp python build-essential snapcraft libxext-dev libxtst-dev lib xkbfile-dev libgconf-2-4
```

after pasting you can jump to next step [Get SiriusTracker Code](#get-siriustracker-code).

**For a step-by-step explanation, read on.**

1. **Node JS**

```
$ sudo apt-get install nodejs
```

2. **Install** [**Node-gyp**](https://github.com/nodejs/node-gyp#installation)

```
$ npm install -g node-gyp
```

3. **Python (v2.7.x recommended)**

```
$ sudo apt install python2.7
```

4. **C++ compiler compatible with C++11**

```
$ sudo apt install build-essential
```

5. **Snapcraft**

```
$ sudo apt install snapcraft
```

6. **Development** **headers**

```
$ sudo apt install libxext-dev libxtst-dev libxkbfile-dev libgconf-2-4
```

**if** [**NPM**](https://www.npmjs.com/get-npm) **don't come bundled with your Node.js installation, Download manually**.

Now you are ready for next step: [Get SiriusTracker Code](#get-siriustracker-code).

## Windows

**Node JS** Go to the [Node.js Downloads page](https://nodejs.org/en/download/). Download Node.js for MacOS (`v12.13.0` or above recommended). Run the downloaded Node.js `.msi` Installer. You're finished! To ensure Node.js has been installed, run `node -v` in your terminal - you should get something like `v12.13.0` or above.

**Followings are optional yet recommended prerequisites**

**Cmder**

1. Download the [latest release](https://github.com/cmderdev/cmder/releases/)
2. Extract the archive. _Note: This path should not be_ `C:\Program Files` _or anywhere else that would require Administrator access for modifying configuration files_
3. (optional) Place your own executable files into the `%cmder_root%\bin` folder to be injected into your PATH.
4. Run `Cmder.exe`

**Chocolatey**

You can download chocolatey from here https://chocolatey.org and for Installing Chocolatey on your machine follow this steps

1. First, ensure that you are using an administrative shell.
2. Copy the text specific to your command shell: [cmd.exe](https://chocolatey.org/install#install-with-cmdexe) or [powershell.exe](https://chocolatey.org/install#install-with-powershellexe).
3. Paste the copied text into your shell and press Enter.
4. Wait a few seconds for the command to complete.
5. If you don't see any errors, you are ready to use Chocolatey! Type `choco` or `choco -?`

**if** [**NPM**](https://www.npmjs.com/get-npm) **don't come bundled with your Node.js installation, Download manually**.

Now you are ready for next step: [Get SiriusTracker Code](#get-siriustracker-code).

# Get SiriusTracker Code

1. In your browser, visit https://github.com/demartini/SiriusTracker and click the `fork` button. You will need to be logged in to GitHub to do this.
2. Open Terminal (macOS/Ubuntu) or Git BASH (Windows; must **run as an Administrator**).
3. In Terminal/Git BASH, [clone your fork of the SiriusTracker repository](#clone-to-your-machine) and [connect the SiriusTracker upstream repository](#connect-your-fork-to-siriustracker-upstream).

## Clone to your machine

1. On GitHub, navigate to the main page of your fork repository.
2. Under the repository name, click **Clone or download**.
3. In the Clone with HTTPs section, click to copy the clone URL for the repository.
4. Open Terminal, Change the current working directory to the location where you want the cloned directory to be made.

```
git clone https://github.com/YOURUSERNAME/SiriusTracker.git
```

Don’t forget to replace YOURUSERNAME with your git username.

## Connect your fork to SiriusTracker upstream:

```
$ cd SiriusTracker
$ git remote add -f upstream https://github.com/demartini/SiriusTracker.git
```

## Install project dependencies:

```
$ npm install
```

## Start the app:

```
$ npm start
```
