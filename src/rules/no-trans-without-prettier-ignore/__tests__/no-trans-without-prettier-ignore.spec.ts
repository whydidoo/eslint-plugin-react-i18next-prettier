import { ESLintUtils } from '@typescript-eslint/utils';
import {
  PRETTIER_IGNORE_CODE,
  PRETTIER_IGNORE_CODE_INLINE,
  PRETTIER_IGNORE_JSX_FIX
} from '../contants';

import { noTransWithoutPrettierIgnore } from '../no-trans-without-prettier-ignore';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser'
});

ruleTester.run(
  'no-trans-without-prettier-ignore inside Element',
  noTransWithoutPrettierIgnore,
  {
    valid: [
      {
        filename: 'valid_1.tsx',
        code: `${PRETTIER_IGNORE_CODE}const Test = <Trans> <span> </span>sdfsdfsd</Trans>`
      },
      {
        filename: 'valid_2.tsx',
        code: `const Test = 343, fn = () => ${PRETTIER_IGNORE_CODE_INLINE}<Trans>sdfsdfsdfdsfsdsdfsdf</Trans>, ${PRETTIER_IGNORE_CODE}df= <Trans>sdfsdfsdfdsfsdsdfsdf</Trans>`
      },
      {
        filename: 'valid_3.tsx',
        code: `${PRETTIER_IGNORE_CODE}setTest.add(<Trans> <span> </span>sdfsdfsd</Trans>)`
      },
      {
        filename: 'valid_4.tsx',
        code: `${PRETTIER_IGNORE_CODE}const arrTest = () => <Trans> <span> </span>sdfsdfsd</Trans>`
      },
      {
        filename: 'valid_5.tsx',
        code: `${PRETTIER_IGNORE_CODE}(() =>  <Trans> <span> </span>sdfsdfsd</Trans>)()`
      },
      {
        filename: 'valid_6.tsx',
        code: `const Test2 = () => {${PRETTIER_IGNORE_CODE}return (<Trans> <span> </span>sdfsdfsd</Trans>)}`
      },
      {
        filename: 'valid_7.tsx',
        code: `const Test2 = true ? null : ${PRETTIER_IGNORE_CODE_INLINE}<Trans>sdfsdfsdfsdf dsfsdfdsf</Trans>`
      },
      {
        filename: 'valid_8.tsx',
        code: `const TestObj = {'2':23, ${PRETTIER_IGNORE_CODE}"test":  <Trans>sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf</Trans>,"3": 'sdfsdf'}`
      },
      {
        filename: 'valid_9.tsx',
        code: `<>{true ? null : ${PRETTIER_IGNORE_CODE_INLINE}<Trans>sdfsdfsdfsdf dsfsdfdsf</Trans>}</>`
      },
      {
        filename: 'valid_10.tsx',
        code: `const TestArray = [1, 2, ${PRETTIER_IGNORE_CODE_INLINE} <Trans>ывавыаываываываыв</Trans>, 3,${PRETTIER_IGNORE_CODE_INLINE} <Trans>ывавыаываываываыв</Trans> ]`
      },
      {
        filename: 'valid_11.tsx',
        code: `<div>${PRETTIER_IGNORE_JSX_FIX}<Trans>dsfsdfsdfsdfsd</Trans></div>`
      },
      {
        filename: 'valid_12.tsx',
        code: `<>${PRETTIER_IGNORE_JSX_FIX}<Trans>dsfsdfsdfsdfsd</Trans></>`
      },
      {
        filename: 'valid_13.tsx',
        code: `<Test attr={${PRETTIER_IGNORE_CODE_INLINE}<Trans>fdsf</Trans>}></Test>`
      },
      {
        filename: 'valid_14.tsx',
        code: `const Test = (${PRETTIER_IGNORE_CODE_INLINE}att = <Trans>fdsdsfsdfsdfsdff</Trans>) => {}`
      },
      {
        filename: 'valid_15.tsx',
        code: `const Test = (${PRETTIER_IGNORE_CODE_INLINE}att = <Trans>fdsdsfsdfsdfsdff</Trans>, ${PRETTIER_IGNORE_CODE_INLINE}att2 = <Trans>fdsdsfsdfsdfsdff</Trans>) => {}`
      }
    ],
    invalid: [
      {
        filename: 'invalid_1.tsx', // filename must be set to tell parser this code is tsx
        code: `const Test = <Trans>sdfsdfsdfdsfsdsdfsdfsdfdsfsdsdfsdfsdfdsfs <span> </span></Trans>`,
        errors: [{ messageId: 'trans' }],
        output: `${PRETTIER_IGNORE_CODE}const Test = <Trans>sdfsdfsdfdsfsdsdfsdfsdfdsfsdsdfsdfsdfdsfs <span> </span></Trans>`
      },
      {
        filename: 'invalid_2.tsx', // filename must be set to tell parser this code is tsx
        code: `const Test = 343, df= <Trans>sdfsdfsdfdsfsdsdfsdf</Trans>`,
        errors: [{ messageId: 'trans' }],
        output: `const Test = 343, ${PRETTIER_IGNORE_CODE_INLINE}df= <Trans>sdfsdfsdfdsfsdsdfsdf</Trans>`
      },
      {
        filename: 'invalid_3.tsx', // filename must be set to tell parser this code is tsx
        code: `setTest.add(<Trans> <span> </span>sdfsdfsd</Trans>)`,
        errors: [{ messageId: 'trans' }],
        output: `${PRETTIER_IGNORE_CODE}setTest.add(<Trans> <span> </span>sdfsdfsd</Trans>)`
      },
      {
        filename: 'invalid_4.tsx', // filename must be set to tell parser this code is tsx
        code: `const arrTest = () => <Trans> <span> </span>sdfsdfsd</Trans>`,
        errors: [{ messageId: 'trans' }],
        output: `${PRETTIER_IGNORE_CODE}const arrTest = () => <Trans> <span> </span>sdfsdfsd</Trans>`
      },
      {
        filename: 'invalid_5.tsx', // filename must be set to tell parser this code is tsx
        code: `(() =>  <Trans> <span> </span>sdfsdfsd</Trans>)()`,
        errors: [{ messageId: 'trans' }],
        output: `${PRETTIER_IGNORE_CODE}(() =>  <Trans> <span> </span>sdfsdfsd</Trans>)()`
      },
      {
        filename: 'invalid_6.tsx', // filename must be set to tell parser this code is tsx
        code: `const Test2 = () => {return (<Trans> <span> </span>sdfsdfsd</Trans>)}`,
        errors: [{ messageId: 'trans' }],
        output: `const Test2 = () => {${PRETTIER_IGNORE_CODE}return (<Trans> <span> </span>sdfsdfsd</Trans>)}`
      },
      {
        filename: 'invalid_7.tsx', // filename must be set to tell parser this code is tsx
        code: `const Test2 = true ? null : <Trans>sdfsdfsdfsdf dsfsdfdsf</Trans>`,
        errors: [{ messageId: 'trans' }],
        output: `const Test2 = true ? null : ${PRETTIER_IGNORE_CODE_INLINE}<Trans>sdfsdfsdfsdf dsfsdfdsf</Trans>`
      },
      {
        filename: 'invalid_8.tsx', // filename must be set to tell parser this code is tsx
        code: `const TestObj = {'2':23, "test":  <Trans>sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf</Trans>,"3": 'sdfsdf'}`,
        errors: [{ messageId: 'trans' }],
        output: `const TestObj = {'2':23, ${PRETTIER_IGNORE_CODE}"test":  <Trans>sdfsdfsdfsdf sdfsdfsdfsdf sdfsdfsdfsdf</Trans>,"3": 'sdfsdf'}`
      },
      {
        filename: 'invalid_9.tsx', // filename must be set to tell parser this code is tsx
        code: `<>{true ? null : <Trans>sdfsdfsdfsdf dsfsdfdsf</Trans>}</>`,
        errors: [{ messageId: 'trans' }],
        output: `<>{true ? null : ${PRETTIER_IGNORE_CODE_INLINE}<Trans>sdfsdfsdfsdf dsfsdfdsf</Trans>}</>`
      },
      {
        filename: 'invalid_10.tsx', // filename must be set to tell parser this code is tsx
        code: `const TestArray = [1, 2,<Trans>ывавыаываываываыв</Trans>, 3 ]`,
        errors: [{ messageId: 'trans' }],
        output: `const TestArray = [1, 2,${PRETTIER_IGNORE_CODE_INLINE}<Trans>ывавыаываываываыв</Trans>, 3 ]`
      },
      {
        filename: 'invalid_11.tsx', // filename must be set to tell parser this code is tsx
        code: `<div><Trans>dsfsdfsdfsdfsd</Trans></div>`,
        errors: [{ messageId: 'trans' }],
        output: `<div>${PRETTIER_IGNORE_JSX_FIX}<Trans>dsfsdfsdfsdfsd</Trans></div>`
      },
      {
        filename: 'invalid_12.tsx', // filename must be set to tell parser this code is tsx
        code: `<><Trans>dsfsdfsdfsdfsd</Trans></>`,
        errors: [{ messageId: 'trans' }],
        output: `<>${PRETTIER_IGNORE_JSX_FIX}<Trans>dsfsdfsdfsdfsd</Trans></>`
      },
      {
        filename: 'invalid_13.tsx', // filename must be set to tell parser this code is tsx
        code: `<Test attr={<Trans>fdsf</Trans>}></Test>`,
        errors: [{ messageId: 'trans' }],
        output: `<Test attr={${PRETTIER_IGNORE_CODE_INLINE}<Trans>fdsf</Trans>}></Test>`
      },
      {
        filename: 'invalid_14.tsx', // filename must be set to tell parser this code is tsx
        code: `const Test = (att = <Trans>fdsdsfsdfsdfsdff</Trans>) => {}`,
        errors: [{ messageId: 'trans' }],
        output: `const Test = (${PRETTIER_IGNORE_CODE_INLINE}att = <Trans>fdsdsfsdfsdfsdff</Trans>) => {}`
      }
    ]
  }
);
