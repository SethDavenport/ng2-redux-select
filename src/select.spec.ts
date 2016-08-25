import 'reflect-metadata';
import { expect } from 'chai';
import { NgSelect } from './ng-select';
import { select } from './select';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

describe('@select', () => {
  let mockState$: BehaviorSubject<Object>;

  beforeEach(() => {
    const ngSelect = new NgSelect();
    mockState$ = new BehaviorSubject({});

    const mockSelectable = {
      select: () => mockState$
    };

    ngSelect.initialize(mockSelectable);
  });

  describe('when passed no arguments', () => {
    it('automatically attempts to bind to a store property that matches the' +
       ' name of the class property', (done) => {

      class MockClass {
        @select() baz: any;
      }

      let mockInstance = new MockClass();
      mockState$.next({ baz: 1 });
      mockInstance.baz.subscribe(val => {
        expect(val).to.eql(1);
        done();
      });
    });

    it('handles property names ending in \'$\'', (done) => {
      class MockClass {
        @select() baz$: any;
      }

      let mockInstance = new MockClass();
      mockState$.next({ baz: 1 });
      mockInstance.baz$.subscribe(val => {
        expect(val).to.eql(1);
        done();
      });
    });
  });

  describe('when passed a string', () => {
    it('attempts to bind to the store property whose name matches that string',
      (done) => {
        class MockClass {
          @select('baz') asdf: any;
        }

        let mockInstance = new MockClass();
        mockState$.next({ baz: 1 });
        mockInstance.asdf.subscribe(val => {
          expect(val).to.eql(1);
          done();
        });
      });
  });

  describe('when passed a function', () => {
    it('attempts to use that function as the selector', (done) => {

      class MockClass {
        @select(state => state.baz * 2) asdf: any;
      }

      let mockInstance = new MockClass();
      mockState$.next({ baz: 1 });
      mockInstance.asdf.subscribe(val => {
        expect(val).to.eql(2);
        done();
      });
    });
  });
});
