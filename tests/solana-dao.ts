import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaDao } from "../target/types/solana_dao";

import {createToken, createTokenAccount, mintTo} from "./helpers/token";
import { expect } from "chai";

let provider, payer;

let govToken, dao;

describe("solana-dao", () => {
  provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);
  payer = provider.wallet.payer;

  const program = anchor.workspace.SolanaDao as Program<SolanaDao>;

  it("Could create Dao", async () => {
    govToken = await createToken(18);

    dao = new anchor.web3.Keypair();

    const tx = await program.methods.createDao(govToken.publicKey)
      .accounts({
        signer: payer.publicKey,
        dao: dao.publicKey,
      })
      .signers([dao])
      .rpc()
      .catch(e => console.error(e));;
    
    const daoData = await program.account.dao.fetch(dao.publicKey);
    expect(daoData.governanceToken).to.deep.equal(govToken.publicKey);
    // console.log("Your transaction signature", tx);
  });
});
