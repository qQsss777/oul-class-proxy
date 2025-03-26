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
