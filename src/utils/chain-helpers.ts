import { Connection, ParsedAccountData, PublicKey } from "@solana/web3.js";

export async function getTokenDecimals(connection: Connection, mint: PublicKey): Promise<number> {
  const info = await connection.getParsedAccountInfo(new PublicKey(mint));
  const result = (info.value?.data as ParsedAccountData).parsed.info.decimals as number;
  return result;
}
