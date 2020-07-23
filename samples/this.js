'use strict';

const c = {
  value: 0,
  incr() {
    this.value++
  }
}

class Counter {
  value = 0

  incr() {
    this.value++;
    return this.value;
  }

  incrAsync() {
    setTimeout(() => {
      this.incr();
    }, 1);
  }
};

const counter = new Counter();

counter.incrAsync();
setTimeout(function () {
  console.log(counter.value);
}, 2);