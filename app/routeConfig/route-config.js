



class RouteConfig {
    constructor() {

    }

    loadRouteConfig() {
        let config;

        try {
            config = require("./route.config.json");

            if (!config.routes || config.routes.length === 0) {
                throw new Error('"routes" not defined');
            }
        } catch (err) {
            throw new Error(`Unable to parse "/configs/route.config.json": ${err.message}`);
        }

        return config;
    }

    registerRoute(app,
        controller,
        route,
        method,
        action,

        // isAdmin,
        // isClient,
        // verifyClientId
    ) {
        app.route(route)[method]((req, res, next) => {
            controller[action](req, res, next)
        });

    }

    getMethod(routeItem) {
        if (!routeItem || !routeItem.method || routeItem.method.length === 0) {
            throw new Error(
                'Undefined or empty "method" property in "lib/configs/route.config.json"'
            );
        }

        const method = routeItem.method.toLowerCase();

        switch (method) {
            case "get":
            case "put":
            case "post":
            case "delete":
            case "patch":
                return method;
            default:
                throw new Error(
                    `Invalid REST "method" property in "lib/configs/route.config.json": ${method}`
                );
        }
    }


    loadController(routeItem) {
        let controller;
        if (!routeItem || !routeItem.controller) {
            throw new Error(
                'Undefined controller property in "app/configs/route.config.json"'
            )
        }
        try {
            controller = require(routeItem.controller);

        } catch (err) {
            throw new Error(`Unable to load ${routeItem.controller} : ${err}`)
        }
        return controller
    }

    getRoute(routeItem) {
        if (!routeItem || !routeItem.route || routeItem.length == 0) {
            throw new Error('Undefined or empty "route" property in "lib/configs/route.config.json"')
        }
        return routeItem.route;
    }

    getAction(routeItem) {
        if (!routeItem || !routeItem.action || routeItem.action.length === 0) {
            return this.getMethod(routeItem);
        }
        return routeItem.action;
    }



    registerRoutes(app) {
        const config = this.loadRouteConfig();

        for (let i = 0; i < config.routes.length; i++) {
            const routeItem = config.routes[i];
            const controller = this.loadController(routeItem)
            const route = this.getRoute(routeItem);
            const method = this.getMethod(routeItem);
            const action = this.getAction(routeItem);

            this.registerRoute(
                app,
                controller,
                route,
                method,
                action
            )
        }
    }

}

const routeConfig = new RouteConfig();
module.exports = routeConfig;