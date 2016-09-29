[![CircleCI](https://img.shields.io/circleci/project/SethDavenport/ng2-redux-select/master.svg?maxAge=2592000)](https://circleci.com/gh/SethDavenport/ng2-redux-select/tree/master)
[![npm version](https://img.shields.io/npm/v/ng2-redux-select.svg)](https://www.npmjs.com/package/ng2-redux-select)
[![npm downloads](https://img.shields.io/npm/dt/ng2-redux-select.svg)](https://www.npmjs.com/package/ng2-redux-select)

# Select

Standalone-version of the
`@select` decorator from [ng2-redux](https://github.com/angular-redux/ng2-redux).
Experiment to see if I can make it work with
[ngrx](https://github.com/ngrx/store) too.

Credit to [Cosmin Ronnin](https://github.com/kosz) for the original decorator implementation.

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
    ngSelect.connect(ngRedux);
  }
}
```

## @ngrx/store:

```typescript
import { NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { NgSelect } from '../../../src';
import { IAppState, rootReducer, INITIAL_STATE } from '../store/index';

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
    ngSelect.connect(store);
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
