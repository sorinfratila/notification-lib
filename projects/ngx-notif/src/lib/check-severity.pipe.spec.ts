import { CheckSeverityPipe } from './check-severity.pipe';

describe('CheckSeverityPipe', () => {
  it('create an instance', () => {
    const pipe = new CheckSeverityPipe();
    expect(pipe).toBeTruthy();
  });
});
