export type FunctionReturn<T> = () => T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Fn<Args extends any[] = any[], Return = void> = (
  ...args: Args
) => Return;
export type ClearParametres<F extends Fn> = () => ReturnType<F>;

export type FnP<F extends Fn, T extends number> = Parameters<F>[T];
export type FnParams<T extends unknown[]> = [...T];

export type CompounedComponent<Parent, SubComponents extends object> = Parent &
  SubComponents;
