import expect from 'expect';

describe('Our first suite', () => {

  // it.only('test 3.1', (done) => {
  //   let num = getRand(0, 10000);
  //   setTimeout(() => {
  //     expect(true).toBe(false);
  //     done();
  //   }, num);
  // });

  it('test 1.1', (done) => {
    let num = getRand(0, 10000);
    setTimeout(function(){return getBoolTrue(done);}, num);
  });

  it('test 1.2', (done) => {
    let num = getRand(0, 10000);
    setTimeout(function(){return getBoolFalse(done);}, num);
  });

  it('test 1.3', (done) => {
    let num = getRand(0, 10000);
    setTimeout(function(){return getBoolFalse(done);}, num);
  });
});

function getBoolTrue(done) {
  console.log(new Date());
  expect(true).toEqual(true);
  done();
};

function getBoolFalse(done) {
  console.log(new Date());
  expect(false).toEqual(true);
  done();
};

function getRand(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);

  let rand = Math.floor(Math.random() * (max - min + 1) + min);

  console.log('rand:', rand)
  return rand;
};
