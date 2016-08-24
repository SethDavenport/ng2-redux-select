import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../store';

@Injectable()
export class CounterActions {
  constructor (private store: Store<IAppState>) {}

  static INCREMENT_COUNTER: string = 'INCREMENT_COUNTER';
  static DECREMENT_COUNTER: string = 'DECREMENT_COUNTER';

  increment(): void {
    this.store.dispatch({ type: CounterActions.INCREMENT_COUNTER });
  }

  decrement(): void {
    this.store.dispatch({ type: CounterActions.DECREMENT_COUNTER });
  }
}
