declare global {
  interface BigIntConstructor {
    /** Returns the bit length of a bigint. */
    bitLength(this: void, n: bigint): bigint;
  }
}

// oxlint-disable-next-line no-unnecessary-condition => intended
BigInt.bitLength ??= (n) => {
  return BigInt(n.toString(2).length);
};

export {};
