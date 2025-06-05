# Gen-EpiX Demo Client

## Installation

### Prerequisites

Make sure you have node and npm installed.
<br /><br />

### SSL installation

Install mkcert: [docs](https://github.com/FiloSottile/mkcert)

Goto your home directory (`~`) and run:

`mkcert -install`

`mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1`

Two files have now been created in your home directory `key.pem` and `cert.pem`. Copy these two files to the cert directory of this project.
<br /><br />

### Client installation

#### Variation A: Install with versioned @gen-epix/ui

This will install all dependencies, including @gen-epix/ui as the version specified in package.json.

run `npm install`

If you wish the switch to `Variation B`, simply follow it's instructions.
<br /><br />

#### Variation B: Install with linked @gen-epix/ui

This will install all dependencies, including @gen-epix/ui symlinked in `node_modules`.

checkout gen-epix-ui at `../gen-epix-ui`
run `./installWithLinkedCore.sh`

Note: You will have to run this every time dependencies have changed in `package.json`. Don't use `npm install`, it will unlink `@gen-epix/ui`.

If you wish the switch to `Variation A`, simply follow it's instructions.
<br /><br />

### OIDC Mock server installation (optional)

Copy `oidc-mock-server.config.example.json` to `oidc-mock-server.config.json` and make changes in `oidc-mock-server.config.json`
<br /><br />

## Running

**Note: This front-end requires a running backend.**

Follow these steps:

1. Run the OIDC mock server (optional) (see below)
2. Run the backend server (depending on the backend run-/debug profile, this should discover the OIDC mock server if started)
3. Run the frontend (see below)

### Running the OIDC mock server

run `npm start start-oidc-mock-server`

### Running the Demo Client

run `npm start`
