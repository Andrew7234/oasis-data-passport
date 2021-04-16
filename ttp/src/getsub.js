import oidc from 'oidc-client';
import Parcel from '@oasislabs/parcel';
import {PODIdentity} from '@oasislabs/parcel/lib/identity.js';

import {BUILTIN_OIDC_CONFIG} from './consts.js';

oidc.Log.logger = console;
oidc.Log.level = oidc.Log.DEBUG;
const userManager = new oidc.UserManager(BUILTIN_OIDC_CONFIG);

(async () => {
    try {
        const user = await userManager.getUser();
        const sub = user?.profile?.sub;
        // TODO: We may have to do things here, on the origin where we're logged in.
        if (sub) {
            const identity = await new Parcel(sub).getCurrentIdentity();
            console.log('inside getsub identity ok', identity); // %%%
        }
        parent.postMessage({
            type: 'oasis-data-passport-sub',
            sub,
        }, '*');
    } catch (e) {
        console.error(e);
    }
})();
