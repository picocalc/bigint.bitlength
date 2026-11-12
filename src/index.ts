declare global {
  interface BigIntConstructor {
    /** Returns the bit length of a bigint. */
    bitLength(this: void, n: bigint): bigint;
  }
}

// Exponentially scaled powers of 2
const shifts: readonly bigint[] = [
  4294967296n,
  2147483648n,
  1073741824n,
  536870912n,
  268435456n,
  134217728n,
  67108864n,
  33554432n,
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

const bitLength: typeof BigInt.bitLength = (n) => {
  if (n === 0n) return 0n;
  let abs = n < 0n ? -n : n;

  let length = 1n;

  for (const shift of shifts) {
    const test = abs >> shift;
    if (test > 0n) {
      abs = test;
      length += shift;
    }
  }

  return length;
};

// oxlint-disable-next-line no-unnecessary-condition => intended
BigInt.bitLength ??= bitLength;

function powBitLength(a: bigint, b: bigint): bigint {
  if (b === 0n) return 1n;

  const abs = a < 0n ? -a : a;
  if (abs === 0n) return 0n;
  if (abs === 1n) return 1n;

  if ((abs & (abs - 1n)) === 0n) {
    return (BigInt.bitLength(abs) - 1n) * b + 1n;
  }

  let prec = BigInt.bitLength(b) + 32n;

  while (true) {
    const int = BigInt.bitLength(abs) - 1n;
    let x = int >= prec ? abs >> (int - prec) : abs << (prec - int);

    let log2 = int << prec;
    const two = 1n << (prec + 1n);

    for (let i = prec - 1n; i >= 0n; i--) {
      x = (x * x) >> prec;
      if (x >= two) {
        log2 |= 1n << i;
        x >>= 1n;
      }
    }

    const lo = (b * log2) >> prec;
    const hi = (b * (log2 + 1n)) >> prec;

    if (lo === hi) {
      return lo + 1n;
    }

    prec *= 2n;
  }
}

export { bitLength, powBitLength };
