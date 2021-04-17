// @ts-check
import Parcel from '@oasislabs/parcel';

export async function createApp() {
  const tokenSourcePassport = {
    clientId: 'CGq8spSP3Z5fFPavKoFBphc',
    privateKey: {
      kid: "server-client",
      use: "sig",
      kty: "EC",
      crv: "P-256",
      alg: "ES256",
      x: "Z_wpBvEoDfbw9pggajLlk2R6KpEg6Sd5_41LiGE31Rg",
      y: "ayph6_9PQUuA5SiG8PChZd_n1BLRtkAes2bjvn31v-s",
      d: "meoiREIwcYGslCNZFNoqnBn1x4xdPER-IFh539TI7As"
    },
  };
  const newUserParcel = new Parcel(tokenSourcePassport);

  const app = await newUserParcel.createApp({
    name: 'Data Passport',
    organization: 'WADC',
    shortDescription: 'Ditch cookies and own your browsing data',
    extendedDescription: 'Ditch cookies and own your browsing data',
    homepageUrl: 'https://github.com/Andrew7234/oasis-data-passport',
    privacyPolicy: 'https://github.com/Andrew7234/oasis-data-passport',
    termsAndConditions: 'https://github.com/Andrew7234/oasis-data-passport',
    logoUrl: 'https://animesoldier.com/wp-content/uploads/2019/04/tensei-slime.jpg',

    invitationText: 'Join Oasis Data Passport!',
    acceptanceText: 'Thanks for the data!',
    rejectionText: '🙁',

    admins: [...new Set([
      (await newUserParcel.getCurrentIdentity()).id,
      'I32QuMCAFRuKmY3QTH2awAC', // Andy
      'I4ro8P3fuChEaGnWyxtcfrc', // Warren
    ])],
    collaborators: [],
    inviteOnly: false,
    invites: [],
    allowUserUploads: false,
    brandingColor: '',
    category: 'App data',
    identity: {
      tokenVerifiers: [
        {
          publicKey: await getAuthPublicKey(),
          iss: 'https://auth.oasislabs.com',
        },
      ],
    },

    published: true, // Don't have app.createPermission, we use createGrant on share
  });

  const client = await newUserParcel.createClient(app.id, {
    name: 'frontend canActOnBehalfOfUsers',
    redirectUris: ['http://localhost:8080/callback.html'],
    postLogoutRedirectUris: [],
    // @ts-expect-error Bad types
    canActOnBehalfOfUsers: true,
    canHoldSecrets: false,
    isScript: false,
    publicKeys: [],
  });

  console.log(`
    APP_ID: ${app.id}
    CLIENT_ID: ${client.id}
  `)
  return { app, client };
}

async function getAuthPublicKey() {
  const response = await fetch(`https://auth.oasislabs.com/.well-known/jwks.json`);
  if (!response.ok) {
    const hint = await response.text();
    throw new Error(`${response.statusText}${hint ? `: ${hint}` : ''}`);
  }

  const { keys } = await response.json();

  if (!keys?.[0]) {
    throw new Error(`Oasis Auth public key is not available from 'https://auth.oasislabs.com'`);
  }

  return keys[0];
}

await createApp();
// /*
// APP_ID: A8o2vc8Cpy3C3eNKFAmP5ra
// CLIENT_ID: C43vyaBHdW8v4TmzKvuHzbZ
// */

// const newUserParcel = new Parcel(your auth token);
// const c = await newUserParcel.getClient('A8o2vc8Cpy3C3eNKFAmP5ra', 'C43vyaBHdW8v4TmzKvuHzbZ');
// await c.update({
//   ...c,
//   postLogoutRedirectUris: c.redirectUris,
// });
