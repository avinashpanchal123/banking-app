const UserService = require('../service/user');
const Logger = require("../../../utils/logger");
const { HttpStatusCode } = require("axios");
const { createUUID, validateUUID } = require("../../../utils/uuid");
const { setXTotalCountHeader } = require("../../../utils/response.js");

class UserController {
    constructor() {
        this.userService = new UserService();
    }
    async createUser(req, res, next) {
        try {
            Logger.info("Create user controller started...");

            const { full_name, username, email } = req.body;

            let id = createUUID();

            let response = await this.userService.createUser(
                id,
                full_name,
                username,
                email
            );
            Logger.info("Create user controller ended...");
            res.status(HttpStatusCode.Created).json(response);
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            Logger.info("getAll users controller called...");
            const { count, rows } = await this.userService.getAllUsers();
            setXTotalCountHeader(res, count);
            res.status(HttpStatusCode.Ok).json({ totalCount: count, users: rows });
        } catch (err) {
            next(err);
        }
    }
}

const userController = new UserController();
module.exports = userController;