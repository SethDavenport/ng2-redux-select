# Select

Standalone-version of the
`@select` decorator from [ng2-redux](https://github.com/angular-redux/ng2-redux).
Experiment to see if I can make it work with
[ngrx](https://github.com/ngrx/store) too.

Credit to Evan Schultz and Cosmin Ronnin for the original decorator 
implementation.

# Setup

## Ng2-Redux:

```typescript
import { NgModule } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { NgSelect } from '../../../src';
import { IAppState, rootReducer, INITIAL_STATE } from '../store/index';

@NgModule({
  /* ... */
  providers: [
    NgRedux,
    NgSelect,
    /* ... */
  ]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, ngSelect: NgSelect) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
    ngSelect.initialize(ngRedux);
  }
}
```

## @ngrx/store:

```typescript
import { NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { NgSelect } from '../../../src';
import { IAppState, rootReducer, INITIAL_STATE } from '../store/index';

// TODO: not sure why this is needed here - it's done inside NgSelect as well.
// Ngrx blows up without it - need to research why.
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
// END TODO.

@NgModule({
  imports: [
    StoreModule.provideStore(rootReducer, INITIAL_STATE),
    /* ... */
  ],
  providers: [
    NgSelect,
    /* ... */
  ],
  /* ... */
})
export class AppModule {
  constructor(store: Store<IAppState>, ngSelect: NgSelect) {
    ngSelect.initialize(store);
  }
}
```

# Usage

Usage is exactly the same with both store implementations:

```typescript
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CounterActions } from '../actions/counter.actions';
import { select } from '../../../src';

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
  @select(['path', 'to', 'a', 'prop']) deepProperty$: Observable<any>;
  @select(s => s.count) functionValue$: Observable<any>;

  constructor(private actions: CounterActions) {}
}
```
