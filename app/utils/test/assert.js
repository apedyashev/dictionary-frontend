export const assertIn = (node, selector, isPresent = true) => {
  const didFind = node.querySelector(selector) !== null;
  expect(didFind).toEqual(isPresent);
};
export const assertInBody = (...args) => assertIn(document.body, ...args);
