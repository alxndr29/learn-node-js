import contactService from "../service/contact-service.js";

const create = async (request, response, next) => {
    try {
        const user = request.user;
        const req = request.body;
        const result = await contactService.create(user, req);
        response.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

export default {
    create
}