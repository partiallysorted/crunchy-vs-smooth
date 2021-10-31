# crunchy-vs-smooth
Tutorial from https://www.brianfriel.xyz/learning-how-to-build-on-solana/

```
anchor init crunchy-vs-smooth
```

Get the ProgramId

```
solana address -k target/deploy/crunchy_vs_smooth-keypair.json
```

Paste into programs/crunchy-vs-smooth/src/lib.rs and Anchor.toml

Check that Solana is using localhost

```
solana config get
```

If not,

```
solana config set --url localhost
```

Test that Solana is ready

```
solana-test-validator
```

Check address and balance.

```
solana address
solana balance
```

Airdrop if necessary.

```
solana airdrop 1000
```

Kill the solana-test-validator.

Run anchor test

```
anchor test
```

To deploy the program
```
solana-test-validator

solana logs

anchor deploy
```

To create React app
```
npx create-react-app app

cd app
​
npm install @project-serum/anchor \
@solana/web3.js \
@solana/wallet-adapter-react \
@solana/wallet-adapter-wallets \
@solana/wallet-adapter-base

npm install @material-ui/core \
@material-ui/icons \
@solana/wallet-adapter-material-ui \
notistack
```

Anchor does not automatically copy the IDL to the app directory.
```
cp ../target/idl/crunchy_vs_smooth.json src/idl.json

npm start
```

Connect Phantom wallet and fund it.

```
solana airdrop 1000 <your-phantom-address-here>
```

Install express as a proxy.
```
cd ..

npm install express
```

Add index.js to the root directory
```
const path = require("path");
const anchor = require("@project-serum/anchor");
const express = require("express");

const voteAccount = anchor.web3.Keypair.generate();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "app/build")));

app.get("/voteAccount", (req, res) => {
  res.json({ voteAccount });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "app/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
```

Run express
```
node index.js
```

Restart the React app
```
npm start
```
