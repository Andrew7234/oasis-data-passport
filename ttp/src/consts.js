import {WebStorageStateStore} from 'oidc-client';
export const PARCEL_AUTH_URL = 'https://auth.oasislabs.com';
// TODO: Set this.
export const SIGNIN_CLIENT_ID = 'CUX6xbzcLUxZ8LFdCr9boPr';
export const REDIRECT_URI = new URL('callback.html', location.href).href;
export const BUILTIN_OIDC_CONFIG = /** @type {oidc.UserManagerSettings} */ ({
    authority: PARCEL_AUTH_URL,
    metadata: {
        issuer: PARCEL_AUTH_URL,
        authorization_endpoint: PARCEL_AUTH_URL + '/oauth/authorize',
        jwks_uri: PARCEL_AUTH_URL + '/.well-known/jwks.json',
        token_endpoint: PARCEL_AUTH_URL + '/oauth/token',
    },
    client_id: SIGNIN_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'openid parcel.*',
    filterProtocolClaims: false,
    loadUserInfo: false,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    extraQueryParams: {
        audience: 'https://api.oasislabs.com/parcel',
    },
    extraTokenParams: {
        audience: 'https://api.oasislabs.com/parcel',
    },
});
