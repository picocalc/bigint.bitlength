import "bigint.bitlength";

import assert from "node:assert";
import { describe, it } from "node:test";

describe("BigInt.bitLength", () => {
  it("Correctly handles positive BigInt numbers", () => {
    assert.strictEqual(BigInt.bitLength(3n), 2n);
    assert.strictEqual(BigInt.bitLength(4n), 3n);
    assert.strictEqual(BigInt.bitLength(5n), 3n);
  });
});
