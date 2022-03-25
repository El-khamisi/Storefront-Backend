import supertest from 'supertest';
import app from '../server';


const req = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the image processing endpoint', (done) => {
   
      req
        .post(`/signup`)
        .send({firstName: 'Mohammed', lasName: '5amisi', password: '1234'})
        .set('Accept', 'application/json')
        .expect(200, (err, res) => {
            //@ts-ignore
            console.log(res.token)
          if (err) done.fail(err);
          else {
              console.log(res);
              done();
          }
        });
    });
  
  });