import { password } from "@inquirer/prompts";

export async function promptPassword() {
  const pass = await password({
    message: "Please enter a password for your keypair.",
  });

  return pass;
}

export async function newPromptPassword() {
  const pass = await promptPassword();

  const passRepeat = await password({
    message: "Confirm password",
  });

  if (pass !== passRepeat) {
    throw new Error("Passwords don't match!");
  }

  return pass;
}
