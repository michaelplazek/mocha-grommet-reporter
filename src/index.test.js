import expect from 'expect';

describe('Our first suite', () => {
  it('test 1.1', () => {
    expect(true).toEqual(true);
  });

  it('test 1.2', () => {
    expect(true).toEqual(false);
  });
});

describe('Our second suite', () => {
  it('test 2.1', () => {
    expect(true).toEqual(true);
  });

  it('test 2.2', () => {
    expect(true).toEqual(false);
  });

  it('test 2.3', () => {
    expect(true).toEqual(false);
  });
});

describe('Our third suite', () => {
  it('test 3.1', () => {
    expect(true).toEqual(true);
  });

  it('test 3.2', () => {
    expect(true).toEqual(false);
  });

  it('test 3.3', () => {
    expect(true).toEqual(true);
  });

  it('test 3.4', () => {
    expect(true).toEqual(false);
  });

  it('test 3.5', () => {
    expect(true).toEqual(false);
  });
});
