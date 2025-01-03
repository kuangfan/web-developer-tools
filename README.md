# web-developer-tools

> a chrome extension tools built with Vite + Vue, and Manifest v3

## Installing

1. Check if your `Node.js` version is >= **14**.
2. Change or configurate the name of your extension on `src/manifest`.
3. Run `npm install` to install the dependencies.

## Developing

run the command

```shell
$ cd web-developer-tools

$ npm run dev
```

### Chrome Extension Developer Mode

1. set your Chrome browser 'Developer mode' up
2. click 'Load unpacked', and select `web-developer-tools/build` folder

### Nomal FrontEnd Developer Mode

1. access `http://0.0.0.0:5173/`
2. when debugging popup page, open `http://0.0.0.0:5173/popup.html`
3. when debugging options page, open `http://0.0.0.0:5173/options.html`

## Packing

```shell
$ npm run build
```
