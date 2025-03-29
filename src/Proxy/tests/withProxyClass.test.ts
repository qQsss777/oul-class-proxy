import { expect, test } from "vitest";
import { withProxyClass } from "../withProxyClass.js";

const SampleClass = withProxyClass(
  class MyClass {
    counter: number;
    name = "foo";
    constructor(value: number) {
      this.counter = value;
    }
    sayHello() {
      console.log(this.name);
    }
  },
);

test("Check Proxy Class implementation", () => {
  const sampleClassProxified = new SampleClass(5);
  expect(SampleClass.prototype["subscribePropertyChange"]).not.toBe(undefined);
  expect(sampleClassProxified["subscribePropertyChange"]).not.toBe(undefined);
});

test("Check Property change", () => {
  const sampleClassProxified = new SampleClass(5);
  let testValue = sampleClassProxified.name;
  let old = "";
  sampleClassProxified.subscribePropertyChange("name", (newValue, oldValue) => {
    testValue = newValue as string;
    old = oldValue as string;
  });
  sampleClassProxified.name = "bar";
  expect(testValue).toBe("bar");
  expect(old).toBe("foo");
});
