import Parcel, {Identity} from "@oasislabs/parcel";

// TODO: In the real world this will have some public domain.
const TTP_ORIGIN = 'http://localhost:8080';

export default class Passport {
    private static identity: Promise<Identity | null> = new Promise((resolve, reject) => {
        window.addEventListener('message', (e) => {
            if (e.origin !== TTP_ORIGIN) return;
            switch (e.data.type) {
                case 'oasis-data-passport-sub':
                    console.log('message', e.data);
                    const access_token = e.data.access_token;
                    if (access_token) {
                        console.log("ptoey");
                        const parcelPassport = new Parcel(access_token);
                        resolve(parcelPassport.getCurrentIdentity());
                    } else {
                        resolve(null);
                    }
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
                console.log('log visit awaiting identity'); // %%%
                const identity = await Passport.identity;
                console.log('log visit identity', identity); // %%%
                throw new Error('not implemented');
            } catch (e) {
                console.warn('log visit', e);
            }
        })();
        return false;
    }
}
