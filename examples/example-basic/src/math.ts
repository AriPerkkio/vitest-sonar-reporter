function add(a: number, b: number) {
  return a + b;
}

function multiply(a: number, b: number) {
  return a * b;
}

export default function math(a: number, b: number, operator: "*" | "+") {
  if (operator === "*") {
    return multiply(a, b);
  }

  if (operator === "+") {
    return add(a, b);
  }

  throw new Error("Unsupported operator");
}
