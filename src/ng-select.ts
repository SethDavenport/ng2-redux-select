import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FunctionSelector } from './types'

export interface ISelectable {
  select: (...any) => any;
}

// Provides an initialization routine where a selectable store can be passed
// in for the decorator to use later on.
@Injectable()
export class NgSelect {
  public static state$: Observable<any>;

  initialize(store: ISelectable) {
    // TODO: error check for double init.
    NgSelect.state$ = store.select(s => s);
  }
}
