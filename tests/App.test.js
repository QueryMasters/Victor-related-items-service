import React from 'react';
import mockData from './mockData.js';
import App from '../client/src/index.jsx';
import { shallow, mount, render } from 'enzyme';


const puppeteer = require('puppeteer');
const pageURL = 'http://localhost:8888/';


let page;
let browser;
const width = 1280;
const height = 720;

// beforeAll(async () => {
//     browser = await puppeteer.launch({
//       headless: false,
//     //   slowMo: 80,
//       args: [`--window-size=${width},${height}`]
//     });
//     page = await browser.newPage();
//     await page.setViewport({ width, height });
// });

// afterAll(() => {
//     browser.close();
// });

// describe('related items scroll', () => {
//     beforeEach(() => {
//         await page.goto(pageURL, {waitUntil: 'networkidle2'});
//     });
//     // check for a div that should contain some content
//     test('initial title is correct', async () => {

//     });
// });

describe('<App />', () => {
    let spy;
    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponseOnce(JSON.stringify(mockData));
    });

    it('should render <App />', () => {
        const component = shallow(<App debug />)
        expect(component).toMatchSnapshot();
    });

    afterEach(() => {
        spy.mockClear();
    })
})