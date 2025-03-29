import {
  Constructor,
  TExtraProps,
  TPropertyChangeCallback,
} from "./interface.js";
import { generateHandler } from "./handler.js";
export const withProxyClass = <T extends Constructor>(Model: T) => {
  const NewClass = class ModelWithExtraProps
    extends Model
    implements TExtraProps
  {
    subscribedProperties: Record<string, TPropertyChangeCallback[]> = {};
    subscribePropertyChange(prop: string, callBack: TPropertyChangeCallback) {
      if (this.subscribedProperties[prop]) {
        this.subscribedProperties[prop].push(callBack);
      } else {
        this.subscribedProperties[prop] = [callBack];
      }
    }
  };
  return new Proxy(NewClass, {
    construct(target, args) {
      const instance = new target(...args);
      const handler = generateHandler();
      return new Proxy(
        instance as Record<string, unknown> & TExtraProps,
        handler,
      );
    },
  });
};
