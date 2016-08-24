import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgRedux, DevToolsExtension} from 'ng2-redux';
import { CounterActions } from '../actions/counter.actions';
import { App } from './app.component.ts';
import { Counter } from '../components/counter.component';
import { IAppState, rootReducer, INITIAL_STATE } from '../store/index';

@NgModule({
  imports: [ BrowserModule, CommonModule, ],
  declarations: [ App, Counter, ],
  bootstrap: [ App ],
  providers: [
    DevToolsExtension,
    NgRedux,
    CounterActions,
  ]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      [],
      [ devTool.isEnabled() ? devTool.enhancer() : f => f ]);
  }
}
