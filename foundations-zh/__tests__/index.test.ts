import { parseError } from '../src/index';
import * as  puppeteer from 'puppeteer';


const fixtureStack = `TypeError: Error raised
  at bar http://192.168.31.8:8000/c.js:2:9
  at foo http://192.168.31.8:8000/b.js:4:15
  at calc http://192.168.31.8:8000/a.js:4:3
  at <anonymous>:1:11
  at http://192.168.31.8:8000/a.js:22:3
`

const fixtureFirefoxStack = `
  bar@http://192.168.31.8:8000/c.js:2:9
  foo@http://192.168.31.8:8000/b.js:4:15
  calc@http://192.168.31.8:8000/a.js:4:3
  <anonymous>:1:11
  http://192.168.31.8:8000/a.js:22:3
`

test('equal', () => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', (msg) => { console.log(msg.text()); });

    const result = await page.evaluate(async () => {
      try {
        const obj = { a: 13, b: 37, c: 42 };
        // @ts-ignore: Unreachable code error
        obj.map((num) => {
          return num * 2;
        });
      } catch (err) {
        return err;
      }
    });
    console.log(result)
    // page.on('erroe',)

    await browser.close();
  })();
  const demo = parseError(new Error());

  // const result = {
  //     message:'demo',
  //     stack:[{
  //       line:1,
  //       column:1,
  //       filename:"demo"
  //     }]
  //   };
  expect(demo.message).toEqual('demo')
})