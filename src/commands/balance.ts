import { Command } from "@oclif/core";
import { Connection } from "@solana/web3.js";

import { getPublicKey } from "../utils/get-keypair.js";
import { lamportsToAmount } from "../utils/numbers.js";

export default class Balance extends Command {
  static description = "Display current Keypair's Solana balance";

  static examples = [
    `<%= config.bin %> <%= command.id %>`,
  ];

  async run(): Promise<void> {
    try {
      const publicKey = getPublicKey();

      const connection = new Connection("https://api.devnet.solana.com");

      const balance = await connection.getBalance(publicKey);

      this.log(`Current balance: ${lamportsToAmount(balance, 9)} SOL`);
    } catch {
      this.error(`Error while processing public key. Make sure to generate keypair with 'new' command!`);
    }
  }
}
