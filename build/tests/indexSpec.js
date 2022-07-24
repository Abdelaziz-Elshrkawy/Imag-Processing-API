"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const test = (0, supertest_1.default)(index_1.default);
describe('Testing Home Page', () => {
    it('home page load sucessfully', async () => {
        const homePage = await test.get('/');
        expect(homePage.status).toBe(200);
    });
    it('home page error', async () => {
        const homePageErr = await test.get('/nonapi');
        expect(homePageErr.status).toBe(404);
    });
});
