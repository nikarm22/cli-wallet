import CryptoJS from "crypto-js";

export class AESEncryptor {
  private static ivSize = 128;
  private static keySize = 256;
  private static pbkdf2Iterations = 100;

  public static decrypt(encrypted: string, password: string): Buffer {
    const salt = CryptoJS.enc.Hex.parse(encrypted.slice(0, 32));
    const iv = CryptoJS.enc.Hex.parse(encrypted.slice(32, 64))
    const encryptedData = encrypted.slice(64);
    
    const key = AESEncryptor.getDerivedKey(password, salt.toString());
  
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, { 
      hasher: CryptoJS.algo.SHA256, 
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return Buffer.from(decrypted.toString(CryptoJS.enc.Utf8), "base64");
  }

  public static encrypt(content: Buffer, password: string): string {

    const salt = CryptoJS.lib.WordArray.random(AESEncryptor.ivSize / 8);
    const key = AESEncryptor.getDerivedKey(password, salt.toString());
    const iv = CryptoJS.lib.WordArray.random(AESEncryptor.ivSize / 8);
    
    const encrypted = CryptoJS.AES.encrypt(content.toString("base64"), key, { 
      hasher: CryptoJS.algo.SHA256, 
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return `${salt.toString()}${iv.toString()}${encrypted.toString()}`;
  }

  public static getDerivedKey(password: string, salt: string) {
    // eslint-disable-next-line new-cap
    return CryptoJS.PBKDF2(password, salt, {
      iterations: AESEncryptor.pbkdf2Iterations,
      keySize: AESEncryptor.keySize / 32,
    });
  }
}
