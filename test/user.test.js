import supertest  from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";

describe('POST /api/users', function(){

    afterEach(async() => {
       await prismaClient.user.deleteMany({
            where:{
                username: 'evan'
            }
        });
    });

    it('should can register new user', async()=>{
        const result = await supertest(web).post('/api/users')
        .send({
            username: 'evan',
            password: 'rahasia',
            name: 'alexander evan'
        });

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("alexander evan");
        expect(result.body.data.username).toBe("evan");
        expect(result.body.data.password).toBeUndefined();
    });
});