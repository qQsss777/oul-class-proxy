import { generateHandler } from "./handler.js";
import {
  TExtraProps,
  IExtraPublicProps,
  TPropertyChangeCallback,
  IExtraPrivateProps,
} from "./interface.js";

/**
 * Proxify an instance and add extraproperties to subcribe to change and run callback
 * @param targetClass instance of the class to proxify
 * @returns class proxified with extraprops
 */
export const withProxyInstance = <T extends object>(
  targetClass: T,
): T & IExtraPublicProps => {
  // add an object of subscribe properties
  Object.defineProperty(targetClass, "subscribedProperties", {
    value: {},
    writable: false,
    enumerable: false,
    configurable: false,
  });
  //add callback to subscribedProperties
  Object.defineProperty(targetClass, "subscribePropertyChange", {
    value: function (prop: string, callBack: TPropertyChangeCallback) {
      const instance = targetClass as T & IExtraPrivateProps;
      if (instance.subscribedProperties[prop]) {
        instance.subscribedProperties[prop].push(callBack);
      } else {
        instance.subscribedProperties[prop] = [callBack];
      }
    },
    writable: false,
    enumerable: true,
    configurable: false,
  });
  //proxy the instance
  const handler = generateHandler();
  return new Proxy(
    targetClass as Record<string, unknown> & TExtraProps,
    handler,
  ) as T & IExtraPublicProps;
};
