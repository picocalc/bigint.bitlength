declare global {
  interface BigIntConstructor {
    /** Returns the bit length of a bigint. */
    bitLength(this: void, n: bigint): bigint;
  }
}

const bitLength: typeof BigInt.bitLength = (n) => {
  if (n === 0n) return 0n;
  let absN = n < 0n ? -n : n;

  let length = 1n;

  // Exponentially scaled powers of 2
  const shifts = [
    16777216n,
    8388608n,
    4194304n,
    2097152n,
    1048576n,
    524288n,
    262144n,
    131072n,
    65536n,
    32768n,
    16384n,
    8192n,
    4096n,
    2048n,
    1024n,
    512n,
    256n,
    128n,
    64n,
    32n,
    16n,
    8n,
    4n,
    2n,
    1n,
  ];

  for (const shift of shifts) {
    const test = absN >> shift;
    if (test > 0n) {
      absN = test;
      length += shift;
    }
  }

  return length;
};

// oxlint-disable-next-line no-unnecessary-condition => intended
BigInt.bitLength ??= bitLength;

export { bitLength };
