import oidc from 'oidc-client';

import {BUILTIN_OIDC_CONFIG} from './consts.js';

oidc.Log.logger = console;
oidc.Log.level = oidc.Log.DEBUG;
const userManager = new oidc.UserManager(BUILTIN_OIDC_CONFIG);

(async () => {
    try {
        const user = await userManager.getUser();
        console.log('getsub user', user); // %%%
        parent.postMessage(/** @type {import('./../..').MessageSub} */ ({
            type: 'oasis-data-passport-sub',
            sub: user?.profile?.sub,
            access_token: user?.access_token,
        }), '*');
    } catch (e) {
        console.error(e);
    }
})();
