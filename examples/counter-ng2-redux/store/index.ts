import { CounterActions } from '../actions/counter.actions';

export interface IAppState {
  count?: number;
}

export const INITIAL_STATE: IAppState = { count: 0 };

export function rootReducer(state: IAppState = INITIAL_STATE, action:any) {
  switch (action.type) {
    case CounterActions.INCREMENT_COUNTER:
      return { count: state.count + 1 };
    case CounterActions.DECREMENT_COUNTER:
      return { count: state.count - 1 };
    default:
      return state;
  }
}
