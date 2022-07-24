import supertest from 'supertest';
import app from '../index';

const test = supertest(app);

describe('Testing Home Page', (): void => {
  it('home page load sucessfully', async (): Promise<void> => {
    const homePage = await test.get('/');
    expect(homePage.status).toBe(200);
  });
  it('home page error', async (): Promise<void> => {
    const homePageErr = await test.get('/nonapi');
    expect(homePageErr.status).toBe(404);
  });
});
