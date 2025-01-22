const express = require("express");
const app = express();
const routeConfig = require("./app/routeConfig/route-config.js");
const cors = require('cors');
const cookieParser = require("cookie-parser");
// app.use('/users', userRoutes);
// app.use('/banks',bankController);
// app.use('/accounts', accountController);


function configureApp(app) {
    app.use(cors());
    app.use((req, res, next) => {
        res.set("Access-Control-Allow-Origin", "*");

        res.set(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });

    app.use(cookieParser());
    app.use(express.json());
}

function configureRoutes(app) {
    routeConfig.registerRoutes(app)
}


function configureWorker(app) {
    configureApp(app);
    configureRoutes(app);
    // configureErrorHandler(app);
    startServer(app);
}

configureWorker(app)

function startServer() {
    const PORT = process.env.app_port || 9000;
    app.listen(PORT, async () => {
        console.log(`Server running on port: ${PORT}`);
    });
}