# Trusted third party origin (TTP)

We use this little website to run the Login with Oasis procedure.
Then, sites communicate with an iframe from this origin to retrieve the user ID.

## Development

Run this locally:

```sh
python3 -m http.server --bind 127.0.0.1 8080
```

Then visit http://localhost:8080/.
