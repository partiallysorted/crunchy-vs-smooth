const assert = require("assert");
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe('crunchy-vs-smooth', () => {

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CrunchyVsSmooth;

  const voteAccount = anchor.web3.Keypair.generate();

  it("Initializes with 0 votes for crunchy and smooth", async () => {
    console.log("Testing Initialize...");

    await program.rpc.initialize({
      accounts : {
        voteAccount: voteAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [voteAccount],
    });

    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );

    console.log("Crunchy: ", account.crunchy.toString());
    console.log("Smooth: ", account.smooth.toString());
    assert.ok(account.crunchy.toString() == 0);
    assert.ok(account.smooth.toString() == 0);
  });

  it("Votes correctly for crunchy", async () => {
    console.log("Testing voteCrunchy...");

    await program.rpc.voteCrunchy({
      accounts : {
        voteAccount: voteAccount.publicKey,
      },
    });

    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );

    console.log("Crunchy: ", account.crunchy.toString());
    console.log("Smooth: ", account.smooth.toString());
    assert.ok(account.crunchy.toString() == 1);
    assert.ok(account.smooth.toString() == 0);
  });

  it("Votes correctly for smooth", async () => {
    console.log("Testing voteSmooth...");

    await program.rpc.voteSmooth({
      accounts : {
        voteAccount: voteAccount.publicKey,
      },
    });

    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );

    console.log("Crunchy: ", account.crunchy.toString());
    console.log("Smooth: ", account.smooth.toString());
    assert.ok(account.crunchy.toString() == 1);
    assert.ok(account.smooth.toString() == 1);
  });
  
});