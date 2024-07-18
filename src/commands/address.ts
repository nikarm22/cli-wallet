import { Command } from "@oclif/core";

import { getPublicKey } from "../utils/get-keypair.js";

export default class Address extends Command {
  static description = "Display current Keypair's public key";

  static examples = [
    `<%= config.bin %> <%= command.id %>`,
  ];

  async run(): Promise<void> {
    try {
      const publicKey = getPublicKey();

      this.log("Your address is:");
      this.log(publicKey.toBase58());
    } catch {
      this.error(`Error while processing public key. Make sure to generate keypair with 'new' command!`);
    }
  }
}
