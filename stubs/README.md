# Stubbed libraries

`@oasislabs/parcel` does some weird things for polyfilling, where they
statically import libraries like `node-fetch` and then at runtime decide
whether or not to use them.
This causes webpack to pull in all those libraries when building.
Those libraries were built with Node.js in mind, so they of course import a
lot of Node.js core modules like `http`.
Then webpack needs to go through the trouble to instruct us how to set up
polyfills for those Node.js modules.
Ironic.

We're remedying this awkwardness by writing stubs for the names that Parcel
wants to import but which we know it won't use.
