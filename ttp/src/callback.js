import oidc from 'oidc-client';

import {BUILTIN_OIDC_CONFIG} from './consts.js';

oidc.Log.logger = console;
oidc.Log.level = oidc.Log.DEBUG;
const userManager = new oidc.UserManager(BUILTIN_OIDC_CONFIG);

(async () => {
    try {
        await userManager.signinCallback();
        console.log('sign in fulfilled'); // %%%
    } catch (e) {
        console.error(e);
    }
})();
