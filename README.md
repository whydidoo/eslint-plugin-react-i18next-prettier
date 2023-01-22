# [eslint](https://eslint.org/)-plugin-react-i18next-prettier &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/whydidoo/eslint-plugin-react-i18next-prettier/blob/master//LICENSE) 

### Description

It is quite common to use auto formatting tools like "Prettier" in IDEs or autofix by Node commands. Unfortunately those tools tend to reformat these JSX code parts as soon as they become too complex. It will always break the component.

Plugin resolves a [problem](https://github.com/i18next/react-i18next/issues/575) between a component [```<Tras></Trans>```](https://react.i18next.com/latest/trans-component)and prettier(max length) adding ```/*prettier-ignore*/``` before the component. 

```js
/*
  <0/> is <b>bold</b>
  <1/> is ' unbolded '
  <2/> is <i>italicized</i>
 */
<Trans>
  <span>
    <b>bold</b> unbolded <i>italicized</i>
  </span>
</Trans>

/*
  <0/> is <b>bold</b>
  <1/> is ' '
  <2/> is 'unbolded'
  <3/> is ' '
  <4/> is <i>italicized</i>

  Prettier will insert the spaces if these strings are very long.
 */
<Trans>
  <span>
    <b>bold</b>
    {' '}unbolded{' '}
    <i>italicized</i>
  </span>
</Trans>
```

### Installation
```npm install eslint-plugin-react-i18next-prettier -D```

```yarn add eslint-plugin-react-i18next-prettier -D```
### Usage:

The most important  need to use a plugin [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) and should keep a order of rules.

.eslintrc.js
```js
module.export = {
    plugin: ['another-plugin', 'prettier', 'react-i18next-prettier'],
    rules: {
        'react-i18next-prettier/no-trans-without-prettier-ignore': 'error',
        "prettier/prettier": "error"
    }
}
```

### Examples

JS/Typescript coce:
```jsx
const fn = () => {
  return (<Trans>Test <span>span element</span></Trans>)
}

const fn = () => () =>  <Trans>Test <span>span element</span></Trans>;                 

const fn = () => <Trans>Test <span>span element</span></Trans>

(() => <Trans>Test <span>span element</span></Trans>)()

const fn = (testArg, testArg2 = <Trans>Test <span>span element</span></Trans>, testArg3) => {}

const Obj = {
  '2':23,
  "test": <Trans>Test <span>span element</span></Trans>,
  "3": 'sdfsdf'
}

const value = 343,  value2 = <Trans>Test <span>span element</span></Trans>

const value = <Trans>Test <span>span element</span></Trans>

const boleanExpression = true ? null : <Trans>Test <span>span element</span></Trans>

const array = [1, 2, <Trans>Test <span>span element</Trans>, 3 ]

<div>
    <Trans></Trans>
    
    <Component attr={<Trans>Test <span>span element</Trans>}></Test>
    
    {true ? null : (<Trans>Test <span>span element</Trans>)}
    
    {true && 1 &&  <Trans>Test <span>span element</Trans>}
</div>

// RESULT

const fn = () => {
  /* prettier-ignore */
  return (<Trans>Test <span>span element</span></Trans>)
}

/* prettier-ignore */
const fn = () => () =>  <Trans>Test <span>span element</span></Trans>;

/* prettier-ignore */
const fn = () => <Trans>Test <span>span element</span></Trans>

/* prettier-ignore */
(() => <Trans>Test <span>span element</span></Trans>)()

const fn = (testArg, /* prettier-ignore */ testArg2 = <Trans>, testArg3) => {}

const TestObj = {
  '2': 23,
  /* prettier-ignore */
  "test": <Trans>Test <span>span element</span></Trans>,
  "3": 'sdfsdf'
}

const value = 343, /* prettier-ignore */ value2 = <Trans>Test <span>span element</span></Trans>

/* prettier-ignore */
const value = <Trans>Test <span>span element</span></Trans>

const Test2 = true ? null : /* prettier-ignore */ <Trans>Test <span>span element</span></Trans>

const array = [1, 2, /* prettier-ignore */ <Trans>Test <span>span element</span></Trans>, 3 ]

<div>
    {/* prettier-ignore */}
    <Trans></Trans>
    
    <Component attr={/* prettier-ignore */ <Trans>Test <span>span element</span></Trans>}></Test>
    
    {true ? null : (/* prettier-ignore */ <Trans>Test <span>span element</span></Trans>)}
    
    {true && 1 &&  /* prettier-ignore */ <Trans>Test <span>span element</span></Trans>}
</div>
```