import { expect, test } from "vitest";
import { withProxifierInstance } from "../withProxifier.js";

test("Check withProxifier implementation", () => {
  class Sample {
    counter: number;
    name = "foo";
    constructor() {
      this.counter = 7;
    }
  }
  const sample = new Sample();
  const sampleProxified = withProxifierInstance(sample);
  let testValue = sampleProxified.name;
  let old = "";
  sampleProxified.subscribePropertyChange("name", (newValue, oldValue) => {
    testValue = newValue as string;
    old = oldValue as string;
  });
  sampleProxified.name = "toto";
  sampleProxified.counter++;
  expect(testValue).toBe("toto");
  expect(old).toBe("foo");
  expect(sampleProxified.counter).toBe(8);
});
