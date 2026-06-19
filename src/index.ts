declare global {
  interface BigIntConstructor {
    /** Returns the bit length of a bigint. */
    bitLength(this: void, n: bigint): bigint;
  }
}

const bitLength: typeof BigInt.bitLength = (n) => {
  return BigInt(n.toString(2).length);
};

// oxlint-disable-next-line no-unnecessary-condition => intended
BigInt.bitLength ??= bitLength;

export { bitLength };
