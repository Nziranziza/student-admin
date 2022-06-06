export * from './student';
export * from './studyGroup';
export type Action<P = any> = {
  type: string;
  payload: P
}