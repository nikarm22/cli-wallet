export function lamportsToAmount(value: bigint | number, decimals: number) {
  const bi = BigInt(value);
  const divisor = 10n**BigInt(decimals);

  const intPart = bi / divisor;
  const fraction = bi % divisor;

  return `${intPart}.${fraction.toString().padStart(decimals, "0")}`;
}

export function amountToLamports(value: number | string, decimals: number) {
  const [int, fraction] = value.toString().split(".");
  const multiplier = 10n**BigInt(decimals)

  const wholePart = BigInt(int) * multiplier;

  if (!fraction) {
    return wholePart;
  }

  const fractionDigits = fraction.length;
  const divisor = 10n**BigInt(fractionDigits);
  const fractionPart = BigInt(fraction) * multiplier / divisor;
  return wholePart + fractionPart;
}
