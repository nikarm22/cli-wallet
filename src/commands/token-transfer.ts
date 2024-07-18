import { Args, Command, Flags } from "@oclif/core";
import { createTransferInstruction, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { Connection, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";

import { getTokenDecimals } from "../utils/chain-helpers.js";
import { getKeypair } from "../utils/get-keypair.js";
import { amountToLamports } from "../utils/numbers.js";
import { promptPassword } from "../utils/prompts.js";

export default class Token extends Command {
  static args = {
    amount: Args.string({
      required: true,
    }),
  };

  static description = "Transfer SPL Token to specified recipient";

  static examples = [
    `<%= config.bin %> <%= command.id %> 2000 -r SOMEADDRESS -t TOKENMINT`,
  ];

  static flags = {
    mint: Flags.string({
      char: "t",
      description: "Token mint address base58",
      name: "Token mint",
      required: true,
    }),
    recipient: Flags.string({
      char: "r",
      description: "Recipient address in base58",
      name: "Recipient address",
      required: true,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Token);

    const password = await promptPassword();
    
    const keypair = getKeypair(password);
    const connection = new Connection("https://api.devnet.solana.com");

    const recipient = new PublicKey(flags.recipient);
    const tokenMint = new PublicKey(flags.mint);

    this.log("Connecting to RPC Node");
    const recentBlockhash = await connection.getLatestBlockhash();

    const sourceAccount = await getOrCreateAssociatedTokenAccount(
      connection, 
      keypair,
      tokenMint,
      keypair.publicKey
    );
    const destinationAccount = await getOrCreateAssociatedTokenAccount(
      connection, 
      keypair,
      tokenMint,
      recipient,
    );

    const numberDecimals = await getTokenDecimals(connection, tokenMint);

    const tx = new Transaction(recentBlockhash).add(
      createTransferInstruction(
        sourceAccount.address,
        destinationAccount.address,
        keypair.publicKey,
        amountToLamports(args.amount, numberDecimals),
      ),
    );

    this.log("Submitting transaction.");
    await sendAndConfirmTransaction(connection, tx, [keypair]);

    this.log(`${args.amount} tokens have been sent to ${flags.recipient}`);
  }
}
