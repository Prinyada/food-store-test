const Calculator = require("./calculator");

describe("Calculator", () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test("no discount", () => {
    const order = { red: 0, green: 1, blue: 1, yellow: 0, pink: 0, purple: 0, orange: 0 };
    expect(calculator.calculatePrice(order, false)).toBe(70);
  });

  test("member card 10% discount", () => {
    const order = { red: 1, green: 1, blue: 0, yellow: 0, pink: 0, purple: 0, orange: 0 };
    expect(calculator.calculatePrice(order, true)).toBe(81);
  });

  test("5% discount for doubles 2 set", () => {
    const order = { red: 0, green: 2, blue: 0, yellow: 0, pink: 2, purple: 0, orange: 0 };
    expect(calculator.calculatePrice(order, false)).toBe(228);
  });

  test("10% discount for member and 5% doubles discount", () => {
    const order = { red: 0, green: 0, blue: 0, yellow: 0, pink: 2, purple: 0, orange: 2 };
    expect(calculator.calculatePrice(order, true)).toBe(342);
  });
});
