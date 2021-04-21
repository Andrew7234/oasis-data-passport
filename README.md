# oasis-data-passport

## To build the project

```sh
yarn
yarn build
```

To generate a Parcel App with explicit permissions, first ensure that you are using Node ^v14.8
```sh
node src/createApp.mjs
```

## To run the demo
There are two sites involved in the demo: a trusted third party origin (ttp) and a sample site.
The trusted third party serves as the trusted point for login with Oasis, whereas the sample site
represents how a typical site would implement and utilize Passport.

First, start the ttp which will listen on http://localhost:8080
```sh
npm run ttp
```

Then, start the sample website on http://localhost:8081
```sh
npm run sample
```

1. Visit the ttp at http://localhost:8080.
2. Login to Oasis and follow the prompts until you get to the landing page.
3. Visit the sample site at http://localhost:8080.
4. Optional: open the javascript console.
5. Accept the cookies on the page, which will then upload a log of your browser visit
   along with any cookie data to Oasis.
6. Visit any other sample sites, or refresh the page and create more logs.
7. Visit https://steward.oasislabs.com/apps/A3D4dqRVT1KsGWo3sQRhyMY/join and accept the terms. You should now 
   be able to view your data under the `Your Data` tab
