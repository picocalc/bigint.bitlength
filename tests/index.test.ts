import "bigint.bitlength";
import assert from "node:assert";
import { describe, it } from "node:test";

void describe("BigInt.bitLength", () => {
  void it("Correctly handles positive BigInt numbers", () => {
    assert.strictEqual(BigInt.bitLength(1n), 1n);

    assert.strictEqual(BigInt.bitLength(2n), 2n);
    assert.strictEqual(BigInt.bitLength(3n), 2n);

    assert.strictEqual(BigInt.bitLength(4n), 3n);
    assert.strictEqual(BigInt.bitLength(5n), 3n);
    assert.strictEqual(BigInt.bitLength(6n), 3n);
    assert.strictEqual(BigInt.bitLength(7n), 3n);
  });

  void it("Correctly handles big positive BigInt numbers", () => {
    const bigNumberExp = 999_999n;
    const bigNumber = 2n ** bigNumberExp;
    assert.strictEqual(BigInt.bitLength(bigNumber - 1n), bigNumberExp);
    assert.strictEqual(BigInt.bitLength(bigNumber), bigNumberExp + 1n);
    assert.strictEqual(BigInt.bitLength(bigNumber + 1n), bigNumberExp + 1n);
  });
});
