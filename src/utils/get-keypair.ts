import { Keypair, PublicKey } from "@solana/web3.js"

import { AESEncryptor } from "../encryption/aes-encryptor.js";
import { KeyStorage } from "../storage/key-storage.js";

export function getKeypair(password: string): Keypair {
  const keyFile = KeyStorage.retrieve("private.key");
  const decrypted = AESEncryptor.decrypt(keyFile, password);
  return Keypair.fromSecretKey(decrypted);
}

export function getPublicKey(): PublicKey {
  const address = KeyStorage.retrieve("public.key");
  return new PublicKey(address);
}
