import * as types from './actionTypes';

export function testAction(test) {
  return {
    type: types.TEST_ACTION,
    test
  }
}