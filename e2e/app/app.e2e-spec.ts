import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('E2E JWT Sample', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = modRef.createNestApplication();
    await app.init();
  });

  it('should get a JWT then successfully make a call', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/merchant/login')
      .send({ username: 'RoblesVegaSAC', password: 'password' })
      .expect(200);

    const token = loginReq.body.access_token;
    return request(app.getHttpServer())
      .get('/auth/merchant/profile')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect(({ body }) => {
        expect(body.username).to.equal('RoblesVegaSAC');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
