import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux-select';
import { CounterActions } from '../actions/counter.actions';

@Component({
  selector: 'counter',
  template: `
  <p>
    Clicked: {{ count$ | async }} times
    <button (click)="actions.increment()">+</button>
    <button (click)="actions.decrement()">-</button>
  </p>
  `
})
export class Counter {
  @select() count$: Observable<number>;

  // TODO: test name, function, and path selectors.

  constructor(private actions: CounterActions) {}
}
