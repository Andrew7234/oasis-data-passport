import Parcel, {AppId, IdentityId, PrivateJWK} from "@oasislabs/parcel";

// export const UPLOADER_PRIVATE_KEY = {
//     ...
//     "d": "..."
// };
// export const UPLOADER_CLIENT_ID = 'C...';
import * as secrets from './secrets.js';

// TODO: In the real world this will have some public domain.
const TTP_ORIGIN = 'http://localhost:8080';

const APP_ID = 'A41GLjBmteFYBnrrr9xvBc6' as AppId;

export const MESSAGE_TYPE_SUB = 'oasis-data-passport-sub';

export interface MessageSub {
    type: typeof MESSAGE_TYPE_SUB;
    sub: string | null;
    access_token: string | null;
}

export const DOC_TYPE_VISIT = 'visit';

export interface DocVisit {
    type: typeof DOC_TYPE_VISIT;
    url: string;
    timestamp: number;
}

export default class Passport {
    private static subData: Promise<MessageSub> = new Promise((resolve, reject) => {
        window.addEventListener('message', (e) => {
            if (e.origin !== TTP_ORIGIN) return;
            switch (e.data.type) {
                case 'oasis-data-passport-sub':
                    resolve(e.data);
                    break;
                default:
                    console.warn('unhandled message from ttp', e);
            }
        });
        const f = document.createElement('iframe');
        f.src = `${TTP_ORIGIN}/getsub.html`;
        f.style.display = 'none';
        f.onerror = (e) => {
            reject(e);
        };
        // TODO: Maybe move to DOMContentLoaded to handle scripts included before <body>.
        document.body.appendChild(f);
    });

    public logVisit(url: string, timestamp: number): boolean {
        (async () => {
            try {
                console.log('log visit awaiting sub data'); // %%%
                const subData = await Passport.subData;
                console.log('log visit sub data', subData); // %%%

                if (!subData.access_token) {
                    console.log('log visit no token source, bailing');
                    return;
                }

                const docVisit = {
                    type: DOC_TYPE_VISIT,
                    url,
                    timestamp,
                } as DocVisit;
                console.log('log visit uploading', docVisit); // %%%
                const parcel = new Parcel({
                    clientId: secrets.UPLOADER_CLIENT_ID,
                    privateKey: secrets.UPLOADER_PRIVATE_KEY as PrivateJWK,
                });
                const appid = await parcel.getCurrentIdentity();
                console.log('server side client identity', appid); // %%%
                const upload = parcel.uploadDocument(JSON.stringify(docVisit), {
                    toApp: APP_ID,
                    owner: subData.sub as IdentityId,
                });
                const doc = await upload.finished;
                console.log('log visit upload ok', doc); // %%%
            } catch (e) {
                console.warn('log visit', e);
            }
        })();
        return false;
    }
}
