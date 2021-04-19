import Passport from './../../lib/main.js';

const passport = new Passport();
const visitURL = location.href;
const visitTimestamp = Date.now();

window.Passport = Passport;
window.passport = passport;
window.acceptedLogVisit = () => {
    passport.logVisit(visitURL, visitTimestamp);
};
