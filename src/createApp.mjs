// @ts-check
import Parcel from '@oasislabs/parcel';

export async function createApp() {
  const newUserParcel = new Parcel(your auth token);

  const app = await newUserParcel.createApp({
    name: 'Data Passport',
    organization: 'WADC',
    shortDescription: 'Archive web pages from your browser',
    extendedDescription: 'Archive web pages from your browser',
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
    //   'ISkGgYC5j1LZYP1J4DcH53a', // Warren
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
    redirectUris: ['http://localhost:8080/callback'],
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
