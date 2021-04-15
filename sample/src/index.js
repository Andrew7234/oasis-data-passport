import Passport from './../../lib/main.js';

const passport = new Passport();
passport.logVisit(location.href, Date.now());
