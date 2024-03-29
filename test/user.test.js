import supertest from "supertest";
import {
    web
} from "../src/application/web.js";
import {
    logger
} from "../src/application/logging.js";
import {
    createTestUser,
    removeTestUser
} from "./test-util.js";

describe('POST /api/users', function () {

    afterEach(async () => {
        await removeTestUser();
    });

    it('should cant register new user', async () => {
        const result = await supertest(web).post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if username already register', async () => {
        let result = await supertest(web).post('/api/users')
            .send({
                username: 'evan',
                password: 'rahasia',
                name: 'alexander evan'
            });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("alexander evan");
        expect(result.body.data.username).toBe("evan");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web).post('/api/users')
            .send({
                username: 'evan',
                password: 'rahasia',
                name: 'alexander evan'
            });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('POST /api/users/login', function () {
    beforeEach(async () => {
        await createTestUser();
    });
    afterEach(async () => {
        await removeTestUser();
    });
    it('should can login', async () => {
        const result = await supertest(web).post('/api/users/login')
            .send({
                username: 'evan',
                password: 'rahasia'
            });
        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe('test');
    });
    it('should reject login if request invalid', async () => {
        const result = await supertest(web).post('/api/users/login')
            .send({
                username: '',
                password: '',
            });
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
    it('should reject login if password wrong', async () => {
        const result = await supertest(web).post('/api/users/login')
            .send({
                username: 'evan',
                password: '1234',
            });
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
    it('should reject login if username wrong', async () => {
        const result = await supertest(web).post('/api/users/login')
            .send({
                username: 'a',
                password: 'rahasia',
            });
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });
    afterEach(async () => {
        await removeTestUser();
    });
    it('should can get current user', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test');
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('evan');
        expect(result.body.data.name).toBe('alexander evan');
    });
    it('should reject if token is invalid', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'a');
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();

    });
});