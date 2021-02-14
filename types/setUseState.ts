export type SetUseState<T> = (value: T | ((prevVal: T) => T)) => void;
