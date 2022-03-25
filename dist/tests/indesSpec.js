"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const req = (0, supertest_1.default)(server_1.default);
describe('Test endpoint responses', () => {
    it('gets the image processing endpoint', (done) => {
        req
            .post(`/signup`)
            .send({ firstName: 'Mohammed', lasName: '5amisi', password: '1234' })
            .set('Accept', 'application/json')
            .expect(200, (err, res) => {
            console.log(res.token);
            if (err)
                done.fail(err);
            else {
                console.log(res);
                done();
            }
        });
    });
});
