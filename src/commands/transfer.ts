import { Args, Command, Flags } from "@oclif/core";
import { Connection, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";

import { getKeypair } from "../utils/get-keypair.js";
import { amountToLamports } from "../utils/numbers.js";
import { promptPassword } from "../utils/prompts.js";

export default class Transfer extends Command {
  static args = {
    amount: Args.string({
      required: true,
    }),
  };

  static description = "Transfer SOL to specified recipient";

  static examples = [
    `<%= config.bin %> <%= command.id %> 2500 -r SOMEADDRESS`,
  ];

  static flags = {
    recipient: Flags.string({
      char: "r",
      description: "Recipient address",
      name: "Recipient address",
      required: true,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Transfer);

    const password = await promptPassword();
    
    const keypair = getKeypair(password);
    const connection = new Connection("https://api.devnet.solana.com");

    const recipient = new PublicKey(flags.recipient);

    this.log("Connecting to RPC Node");
    const recentBlockhash = await connection.getLatestBlockhash();

    const tx = new Transaction(recentBlockhash).add(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        lamports: amountToLamports(args.amount, 9),
        toPubkey: recipient,
      }),
    );

    this.log("Submitting transaction.");
    await sendAndConfirmTransaction(connection, tx, [keypair]);

    this.log(`${args.amount} SOL have been sent to ${flags.recipient}`);
  }
}
