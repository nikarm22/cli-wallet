import fs from "node:fs";
import os from "node:os";
import path from "node:path";

type StoreOptions = {
  fileName?: string;
  override?: boolean;
};

export class KeyStorage {
  public static defaultName = "default.key";
  // TODO Make location dynamic
  public static location = `${os.homedir()}/.cli-wallet/`;

  public static retrieve(fileName?: string): string {
    const name = fileName || KeyStorage.defaultName;
    const filePath = path.join(KeyStorage.location, name);

    try {
      const file = fs.readFileSync(filePath, "utf8");
      return file;
    } catch {
      throw new Error(`Keypair is not found!`);
    }
  }

  public static store(key: string, options: StoreOptions): string {
    const fileName = options.fileName || KeyStorage.defaultName;
    const filePath = path.join(KeyStorage.location, fileName);

    if (!fs.existsSync(KeyStorage.location)){
      fs.mkdirSync(KeyStorage.location);
    }

    if (fs.existsSync(filePath) && !options.override) {
      throw new Error("Key is already generated!");
    }

    fs.writeFileSync(filePath, key, {
      // eslint-disable-next-line unicorn/text-encoding-identifier-case
      encoding: "utf-8",
    });

    return filePath;
  }
}
