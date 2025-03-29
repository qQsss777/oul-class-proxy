export type TPropertyChangeCallback = (
  newValue: unknown,
  oldValue: unknown,
) => void;

export interface IExtraPublicProps {
  subscribePropertyChange: (
    prop: string,
    callBack: TPropertyChangeCallback,
  ) => void;
}

export interface IExtraPrivateProps {
  subscribedProperties: Record<string, TPropertyChangeCallback[]>;
}

export type TExtraProps = IExtraPublicProps & IExtraPrivateProps;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T = object> = new (...args: any[]) => T;

export type IHandler = Record<string, unknown> & TExtraProps;
