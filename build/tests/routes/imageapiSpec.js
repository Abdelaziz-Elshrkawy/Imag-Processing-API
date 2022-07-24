"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const test = (0, supertest_1.default)(index_1.default);
describe('Testing image route', () => {
    it('all parameter absence error handler', async () => {
        const queryTest = await test.get('/image');
        expect(queryTest.status).toBe(400);
        expect(queryTest.text).toBe('<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please insert filename and image dimensions</h1>');
    });
    it('filename absence error handler', async () => {
        const queryTest = await test.get('/image?filename=&width=500&height=500');
        expect(queryTest.status).toBe(400);
        expect(queryTest.text).toBe('<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please insert the filename </h1>');
    });
    it('filename and dimensions absence error handler', async () => {
        const dimensionTestnoheight = await test.get('/image?filename=&width=500&height=');
        const dimensionTestnowidth = await test.get('/image?filename=&width=&height=500');
        expect(dimensionTestnoheight.status).toBe(400);
        expect(dimensionTestnowidth.status).toBe(400);
        expect(dimensionTestnoheight.text).toBe('<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please insert filename and check image dimensions</h1>');
        expect(dimensionTestnowidth.text).toBe('<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please insert filename and check image dimensions</h1>');
    });
    it('dimension absence but filename present error handler', async () => {
        const dimensionTestnoheight = await test.get('/image?filename=fjord&width=500&height=');
        const dimensionTestnowidth = await test.get('/image?filename=fjord&width=&height=500');
        expect(dimensionTestnoheight.status).toBe(400);
        expect(dimensionTestnowidth.status).toBe(400);
        expect(dimensionTestnoheight.text).toBe('<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please check image dimensions</h1> <h1 style="width: 100%; color: red; text-align: center;">Note: Dimensions must be in numbers as intger only and ZERO not allowed</h1>');
        expect(dimensionTestnowidth.text).toBe('<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please check image dimensions</h1> <h1 style="width: 100%; color: red; text-align: center;">Note: Dimensions must be in numbers as intger only and ZERO not allowed</h1>');
    });
    it('will returned as not valid filename', async () => {
        const filename = await test.get('/image?filename=testfilename&width=500&height=500');
        expect(filename.status).toBe(400);
        expect(filename.text).toBe('<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please insert valid image filename</h1>');
    });
    it('resolution limit handler', async () => {
        const resolution = await test.get('/image?filename=fjord&width=8000&height=4500');
        expect(resolution.status).toBe(400);
        expect(resolution.text).toBe('<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Maximum image dimensions supported up to 8K:(7680 x 4320)</h1>');
    });
    it('checking test validity by making falsy result', async () => {
        const queryTest = await test.get('/image');
        expect(queryTest.status).not.toBe(200);
        expect(queryTest.text).not.toBe(
        //not the same text that should appear
        'Please insert filename and image dimensions');
    });
    it('all parameter typed correctly', async () => {
        const parameterMatched = await test.get('/image?filename=fjord&width=500&height=500');
        expect(parameterMatched.status).toBe(200);
    });
});
