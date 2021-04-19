import oidc from 'oidc-client';
import jwt_decode from 'jwt-decode';
import Parcel from '@oasislabs/parcel';
// import {PODIdentity} from '@oasislabs/parcel/lib/identity.js';

import {BUILTIN_OIDC_CONFIG} from './consts.js';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

oidc.Log.logger = console;
oidc.Log.level = oidc.Log.DEBUG;
const userManager = new oidc.UserManager(BUILTIN_OIDC_CONFIG);

(async () => {
    try {
        const user = await userManager.getUser();
        const id_token = jwt_decode(user.id_token);
        const access_token = jwt_decode(user.access_token);
        console.log(`id_token: ${JSON.stringify(id_token)}`);
        console.log(`access token: ${JSON.stringify(access_token)}`);
        const sub = user?.profile?.sub;
        // TODO: We may have to do things here, on the origin where we're logged in.
        if (sub) {
            const identity = await new Parcel(user.access_token).getCurrentIdentity();
            console.log('inside getsub identity ok', identity); // %%%
        }
        parent.postMessage(/** @type {import('./../..').MessageSub} */ ({
            type: 'oasis-data-passport-sub',
            sub: user?.profile?.sub,
            access_token: user?.access_token,
        }), '*');
    } catch (e) {
        console.error(e);
    }
})();
