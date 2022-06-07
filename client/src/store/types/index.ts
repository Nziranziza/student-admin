import { Dispatch } from 'react';

export * from './student';
export * from './studyGroup';
export type Action<P = any> = {
  type: string;
  payload: P
}
export type ActionFunction<P> = (payload: P, dispatch: Dispatch<Action<P>>) => void;