import expect from 'expect';

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).toEqual(true);
  });

  it('shouldnt pass', () => {
    expect(true).toEqual(false);
  });
});
