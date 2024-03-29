import {
    response
} from "express";
import userService from "../service/user-service.js";

const register = async (request, response, next) => {
    try {
        const result = await userService.register(request.body);
        response.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const login = async (request, response, next) => {
    try {
        const result = await userService.login(request.body);
        console.log(request.body);
        response.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const get = async (request, response, next) => {
    try {
        const username = request.user.username;
        const result = await userService.get(username);
        response.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};
export default {
    register,
    login,
    get
}