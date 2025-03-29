import { expect, test } from "vitest";
import { generateHandler } from "../handler";

test("Check not the same reference", () => {
  const h = generateHandler();
  const h2 = generateHandler();
  expect(h).not.equal(h2);
  expect(h.get).not.equal(h2.get);
});
