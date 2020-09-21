const passport = require('passport');
require('dotenv').config();
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const db = require('../models');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const jwtStrategy = new JWTStrategy(options, async (payload, done) => {
  const idFromToken = payload.id;
  const idFromTokenFix = Number(payload.id);
  console.log(idFromToken);
  console.log(idFromTokenFix);
  const user = payload.isAdmin
    ? await db.Admins.findOne({ where: { id: idFromToken } })
    : await db.Customers.findOne({ where: { id: idFromToken } });

  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

passport.use('jwt', jwtStrategy);
