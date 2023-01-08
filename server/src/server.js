require("dotenv").config();

const fastify = require("fastify")({ logger: true });
const fastifyCors = require("@fastify/cors");
const PORT = process.env.PORT || 3001;
fastify.register(fastifyCors, {
    origin: "*",
    allowedHeaders:
        "Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range",
    methods: "GET,POST,PUT,DELETE",
});

const userRoutes = require("./routes/user");

userRoutes.forEach((route, index) => {
    fastify.route(route);
});

// server
const start = async () => {
    try {
        await fastify.listen(PORT, () => {
            fastify.log.info(`server listening on ${PORT}`);
        });
    } catch (err) {
        fastify.log.error(err);
    }
};

start();
