import oidc from 'oidc-client';

import {BUILTIN_OIDC_CONFIG} from './consts.js';

oidc.Log.logger = console;
oidc.Log.level = oidc.Log.DEBUG;
const userManager = new oidc.UserManager(BUILTIN_OIDC_CONFIG);

(async () => {
    try {
        await userManager.signinCallback();
        const user = await userManager.getUser();
        console.log(`id_token: ${user.id_token}`);
        console.log(`access token: ${user.access_token}`);
        console.log('sign in fulfilled'); // %%%
    } catch (e) {
        console.error(e);
    }
})();
