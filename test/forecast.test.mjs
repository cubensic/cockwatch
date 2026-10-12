import test from 'node:test';
import assert from 'node:assert/strict';
import { predict, countdown } from '../public/forecast.js';
test('feature requests delay believer forecast by two days each', () => {
  assert.equal(predict('believer',3).toISOString(),'2026-10-19T16:00:00.000Z');
  assert.equal(predict('believer',4)-predict('believer',3),2*86400000);
  assert.equal(predict('optimist',12)-predict('optimist',0),0);
  assert.equal(predict('doomer',3).toISOString(),'2027-11-24T17:00:00.000Z');
});
test('countdown reaches zero and marks an overdue prediction', () => {
  const target = new Date('2026-10-19T16:00:00Z');
  assert.deepEqual(countdown(target,target.getTime()-90061000),{expired:false,days:1,hours:1,minutes:1,seconds:1});
  assert.deepEqual(countdown(target,target.getTime()+1000),{expired:true,days:0,hours:0,minutes:0,seconds:0});
});
