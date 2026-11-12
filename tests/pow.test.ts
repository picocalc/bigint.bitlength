import assert from "node:assert";
import { describe, it } from "node:test";

import { powBitLength } from "bigint.bitlength";

void describe("powBitLength", () => {
  void it("Correctly handles zero, unity, and edge exponents", () => {
    assert.strictEqual(powBitLength(5000n, 0n), 1n);
    assert.strictEqual(powBitLength(0n, 5000n), 0n);
    assert.strictEqual(powBitLength(1n, 5000n), 1n);
    assert.strictEqual(powBitLength(-1n, 5000n), 1n);
  });

  void it("Correctly handles powers of 2", () => {
    assert.strictEqual(powBitLength(2n, 10n), 11n);
    assert.strictEqual(powBitLength(16n, 100n), 401n);
  });

  void it("Correctly handles negative bases", () => {
    assert.strictEqual(powBitLength(-2n, 3n), 4n);
    assert.strictEqual(powBitLength(-3n, 2n), 4n);
  });

  void it("Correctly handles non-powers-of-two with exact bit precision", () => {
    assert.strictEqual(powBitLength(3n, 2n), 4n);
    assert.strictEqual(powBitLength(3n, 3n), 5n);
    assert.strictEqual(powBitLength(10n, 3n), 10n);
  });

  void it("Correctly handles large exponents without evaluation", () => {
    assert.strictEqual(powBitLength(3n, 1_000_000n), 1_584_963n);
    assert.strictEqual(powBitLength(10n, 10_000_000_000n), 33_219_280_949n);
    assert.strictEqual(
      powBitLength(23n, 10n ** 50n),
      452356195605701287229414824416266884449882512544256n,
    );
  });
});
