export const ternary = <O, S>(
  condition: unknown,
  operand: O,
  secondOperand: S,
): O | S => {
  return condition ? operand : secondOperand;
};
