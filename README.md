# kucoin

Kucoin API Client

Implemented by METACODI, S.L.

Visit [Kucoin API Documentation](https://docs.kucoin.com/).

Generate [Kucoin API Key](https://www.kucoin.com/es/account/api/create?type=trade).

<br />
<br />

# Setup


## ~~fetch~~

> Error [ERR_REQUIRE_ESM]: require() of ES Module ... from ... not supported.      
> Instead change the require of index.js in ... to a dynamic import() which is available in all CommonJS modules.

Com que estem treballant amb resolució de mòdul `commonjs`, no podem fer servir una versió actual de la llibreria `node-fetch` pq només soporta `esm`.

**Fixed**: <https://stackoverflow.com/questions/70541068/instead-change-the-require-of-index-js-to-a-dynamic-import-which-is-available>

```bash
npm i node-fetch@2.6.1
```

<br />

