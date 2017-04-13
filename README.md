To run web server:
1. `npm install`
1. `meteor`

To run desktop app in dev mode
1. `npm install -g electron`
1. `meteor --mobile-server=localhost:3000`
1. `npm run desktop`

To build desktop installer:

`npm run desktop -- build-installer <server host url> (--win | --linux | --mac)` (look description [here](https://github.com/wojtkowiak/meteor-desktop#building-installer))

[Requrements](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build#linux) to build installer for Linux

[Requrements](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build#to-build-app-for-windows-on-linux) to build installer for Windows on Linux

Followed by [this documentation](https://github.com/wojtkowiak/meteor-desktop)
