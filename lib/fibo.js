const slowFibo = n =>
  n <= 0 ? 0 :
    n === 1 ? 1 :
      slowFibo(n - 1) + slowFibo(n - 2);

exports.slowFibo = slowFibo;