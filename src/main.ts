import Parcel, {AppId, IdentityId, PrivateJWK} from "@oasislabs/parcel";

// TODO: In the real world this will have some public domain.
const TTP_ORIGIN = 'http://localhost:8080';

const APP_ID = 'AJwJbEwW9mpCLf8rCD5kfNY' as AppId;

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
                    console.log('message', e.data);
                    // const access_token = e.data.access_token;
                    // if (access_token) {
                    //     console.log("ptoey");
                    //     const parcelPassport = new Parcel(access_token);
                    //     resolve(parcelPassport.getCurrentIdentity());
                    // } else {
                    //     resolve(null);
                    // }
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
                const parcel = new Parcel(subData.access_token);
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
