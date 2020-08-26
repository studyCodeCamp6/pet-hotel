const passport = require("passport");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const db = require("../models");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};

const jwtStrategy = new JWTStrategy(options, async (payload, done) => {
    const idFromToken = payload.id;
    const user = await db.Customers.findOne({ where: { id: idFromToken } });

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
});

passport.use(
    "jwt",
    jwtStrategy
);