import oidc from 'oidc-client';

import {BUILTIN_OIDC_CONFIG} from './consts.js';

oidc.Log.logger = console;
oidc.Log.level = oidc.Log.DEBUG;
const userManager = new oidc.UserManager(BUILTIN_OIDC_CONFIG);

const vLogin = document.getElementById('login');
vLogin.onclick = (e) => {
    userManager.signinRedirect();
};
vLogin.disabled = false;
