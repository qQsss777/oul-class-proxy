import { expect, test } from "vitest";
import { withProxyInstance } from "../withProxyInstance.js";

class Sample {
  counter: number;
  name = "foo";
  constructor() {
    this.counter = 7;
  }
  sayHello() {
    console.log(this.name);
  }
}

test("Check property change", () => {
  const sample = new Sample();
  const sampleProxified = withProxyInstance(sample);
  let testValue = sampleProxified.name;
  let old = "";
  sampleProxified.subscribePropertyChange("name", (newValue, oldValue) => {
    testValue = newValue as string;
    old = oldValue as string;
  });
  sampleProxified.name = "bar";
  expect(testValue).toBe("bar");
  expect(old).toBe("foo");
});

test("Check Class is not modified", () => {
  const sampleTwo = new Sample();
  expect(sampleTwo["subscribePropertyChange"]).toBe(undefined);
});

test("Check non-enumerable properties", () => {
  const sample = new Sample();
  const sampleProxified = withProxyInstance(sample);
  expect(Object.keys(sampleProxified).length).toBe(3);
});
