import { IHandler } from "./interface.js";

export const generateHandler = () => {
  return {
    get(target: IHandler, prop: string) {
      return Reflect.get(target, prop);
    },
    set(target: IHandler, prop: string, value: unknown) {
      const oldValue = target[prop];
      Reflect.set(target, prop, value);
      if (target.subscribedProperties[prop])
        target.subscribedProperties[prop].forEach((cb) => cb(value, oldValue));
      return true;
    },
  };
};
