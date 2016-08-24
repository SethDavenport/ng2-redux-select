export { NgRedux } from './components/ng-redux';
export { DevToolsExtension } from './components/dev-tools';
export { select } from './decorators/select';


// Agostic selector
// Just needs something that makes an observable...
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { getIn } from './utils/get-in';

import {
  PropertySelector,
  PathSelector,
  FunctionSelector,
  Comparator,
  NgRedux,
} from './components/ng-redux';

interface INgSelectable {
  select: () => Observable<any>;
}

@Injectable()
export class NgSelect {
  static state$;

  initialize(state$: Observable<any>) {
    // TODO: error check for double init.
    NgSelect.state$ = state$;
  }
}

export function selector<T>(
  selector?: PropertySelector | PathSelector | FunctionSelector<any, T>,
  comparator?: Comparator): PropertyDecorator {

  return function decorate(target: any, key: string): void {
    let bindingKey = selector;
    if (!selector) {
      bindingKey = (key.lastIndexOf('$') === key.length - 1) ?
        key.substring(0, key.length - 1) :
        key;
    }

    function getter(): Observable<T> {
      return _select<T>(NgSelect.state$, bindingKey, comparator);
    }

    // Replace decorated property with a getter that returns the observable.
    if (delete target[key]) {
      Object.defineProperty(target, key, {
        get: getter,
        enumerable: true,
        configurable: true
      });
    }
  };
}

function _select<T>(
  observable$,
  selector: PropertySelector |
      PathSelector |
      FunctionSelector<any, T>,
  comparator?: Comparator): Observable<T> {

  let result: Observable<T>;

  if (typeof selector === 'string' ||
      typeof selector === 'number' ||
      typeof selector === 'symbol') {

      result = observable$.map(state => state[selector as PropertySelector]);
  } else if (Array.isArray(selector)) {
      result = observable$.map(state => getIn(state, selector as PathSelector));
  } else {
      result = observable$.map(selector as FunctionSelector<any, T>);
  }

  return result.distinctUntilChanged(comparator);
}
