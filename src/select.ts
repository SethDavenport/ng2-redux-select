import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { getIn } from './get-in';
import { NgSelect } from './ng-select';
import { PropertySelector, PathSelector, FunctionSelector, Comparator} from './types'

export function select<T>(
  selector?: PropertySelector | PathSelector | FunctionSelector<any, T>,
  comparator?: Comparator): PropertyDecorator {

  return function decorate(target: any, key: string): void {
    let bindingKey = selector || _getDefaultSelector(key);

    if (delete target[key]) {
      Object.defineProperty(target, key, {
        get: () => _select<T>(NgSelect.state$, bindingKey, comparator),
        enumerable: true,
        configurable: true
      });
    }
  };
}

/**
 * The default selector is the name of the property being decorated. If it ends
 * in the common '$' convention for Observable variables, we'll ignore the '$'.
 */
function _getDefaultSelector(key) {
  return (key.lastIndexOf('$') === key.length - 1) ?
    key.substring(0, key.length - 1) :
    key;
}

function _select<T>(
  observable$: Observable<any>,
  selector: PropertySelector | PathSelector | FunctionSelector<any, T>,
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
