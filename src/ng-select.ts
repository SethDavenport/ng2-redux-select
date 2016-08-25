import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FunctionSelector } from './types';

export interface ISelectable {
  select: (...any) => any;
}

@Injectable()
export class NgSelect {
  public static state$: Observable<any>;

  initialize(store: ISelectable) {
    NgSelect.state$ = store.select(s => s);
  }
}
