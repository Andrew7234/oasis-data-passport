const PARCEL_AUTH_URL = 'https://auth.oasislabs.com';
// TODO: Set this.
const SIGNIN_CLIENT_ID = 'CEfiao99HjM5K1dCUwxnshg';
const REDIRECT_URI = new URL('callback.html', location.href).href;
const BUILTIN_OIDC_CONFIG = {
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
    scope: 'openid',
    filterProtocolClaims: false,
    loadUserInfo: false,
    extraQueryParams: {
        audience: 'https://api.oasislabs.com/parcel',
    },
    extraTokenParams: {
        audience: 'https://api.oasislabs.com/parcel',
    },
};
