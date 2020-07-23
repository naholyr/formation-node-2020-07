const o = { a: 1, b: 2, c: 3 }

const a = o.a
const b = o.b
const c = o.c

// destructuring
const { a, b, c, d = 4 } = o

const a = "toto"
const b = true

// shorthand properties
const o = { a, b }


// { a: string, b: number, c: boolean }
/**
 * description de ma fonction
 */
const foo = ({ a = "", b, c = 0 }) => {
  a
  b
  c
}

foo({ b, a })