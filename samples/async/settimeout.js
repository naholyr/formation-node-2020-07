const fibo = n => {
  if (n === 0) return 1;
  if (n === 1) return 1;
  return fibo(n - 1) + fibo(n - 2);
}

console.log('before');

setTimeout(() => {
  console.log('timeout');
}, 0);

console.log(fibo(40));

console.log('after');