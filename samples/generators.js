function* positiveNumbers() {
  let i = 0;
  while (true) {
    console.log({ i })
    yield i;
    i++;
  }
}

const it = positiveNumbers();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());