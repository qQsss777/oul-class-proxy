import {
  TExtraProps,
  IExtraPublicProps,
  TPropertyChangeCallback,
  IExtraPrivateProps,
} from "./interface.js";

/**
 * Proxify an instance and add extraproperties to subcribe to change and run callback
 * @param classInstance instance of the class to proxify
 * @returns class proxified with extraprops
 */
export const withProxifierInstance = <T extends object>(
  classInstance: T,
): T & IExtraPublicProps => {
  // add an object of subscribe properties
  Object.defineProperty(classInstance, "subscribedProperties", {
    value: {},
    writable: true,
    enumerable: true,
    configurable: true,
  });
  //add callback to subscribedProperties
  Object.defineProperty(classInstance, "subscribePropertyChange", {
    value: function (prop: string, cb: TPropertyChangeCallback) {
      const instance = classInstance as T & IExtraPrivateProps;
      if (instance.subscribedProperties[prop]) {
        instance.subscribedProperties[prop].push(cb);
      } else {
        instance.subscribedProperties[prop] = [cb];
      }
    },
    writable: false,
    enumerable: false,
    configurable: false,
  });
  //proxy the instance
  const newInstance = new Proxy(
    classInstance as Record<string, unknown> & TExtraProps,
    {
      get(target, prop: string) {
        return target[prop];
      },
      set(target, prop: string, value: unknown) {
        const oldValue = target[prop];
        target[prop] = value;
        if (target.subscribedProperties[prop])
          target.subscribedProperties[prop].forEach((cb) =>
            cb(value, oldValue),
          );
        return true;
      },
    },
  );
  return newInstance as T & IExtraPublicProps;
};
