import { Command, Flags } from "@oclif/core";
import { Keypair, PublicKey } from "@solana/web3.js";
import path from "node:path";

import { AESEncryptor } from "../encryption/aes-encryptor.js";
import { KeyStorage } from "../storage/key-storage.js";
import { newPromptPassword } from "../utils/prompts.js";

type EncryptedKeypair = {
  privateKey: string;
  publicKey: PublicKey;
}

export default class New extends Command {
  static description = "Generate an encrypted key and stores it in ~/.cli-wallet/default.key";

  static examples = [
    `<%= config.bin %> <%= command.id %>`,
  ];

  static flags = {
    force: Flags.boolean({
      char: "f",
      description: "Forcefully overrides existing keypair",
      name: "Force override",
      required: false,
    }),
  };

  generateEncryptedKeypair(password: string): EncryptedKeypair {
    const keypair = Keypair.generate();
    const privateKey = Buffer.from(keypair.secretKey);
    const encrypted = AESEncryptor.encrypt(privateKey, password);

    return {
      privateKey: encrypted,
      publicKey: keypair.publicKey,
    };
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(New);
    const password = await newPromptPassword();

    this.log(`Generating a Keypair...`);

    const encryptedKeypair = this.generateEncryptedKeypair(password);

    try {
      KeyStorage.store(encryptedKeypair.privateKey, {
        fileName: "private.key",
        override: flags.force
      });
      KeyStorage.store(encryptedKeypair.publicKey.toBase58(), {
        fileName: "public.key",
        override: flags.force
      });
    } catch (error) {
      if (flags.force) {
        this.error(error as string);
      } else {
        this.error("Keypair already exists. Use -f flag to override.");
      }
    }

    this.log(`Your address is ${encryptedKeypair.publicKey.toBase58()}`);
    this.log(`Keypair has successfully generated in ${path.join(KeyStorage.location, KeyStorage.defaultName)}`);
  }
}
