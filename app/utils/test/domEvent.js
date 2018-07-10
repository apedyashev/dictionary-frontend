// https://github.com/Semantic-Org/Semantic-UI-React/blob/master/test/utils/domEvent.js

import simulant from 'simulant';

/**
 * Generic method for dispatching an event on a DOM node.
 * @param {String|Object} node A querySelector string or DOM node.
 * @param {String} eventType A DOMString
 * @param {Object} [data] Additional event data.
 * @returns {Object} The event
 */
export const fire = (node, eventType, data = {}) => {
  const DOMNode = typeof node === 'string' ? document.querySelector(node) : node;
  const event = simulant(eventType, data);

  return simulant.fire(DOMNode, event);
};

/**
 * Dispatch a 'click' event on a DOM node.
 * @param {String|Object} node A querySelector string or DOM node.
 * @param {Object} [data] Additional event data.
 * @returns {Object} The event
 */
export const click = (node, data) => fire(node, 'click', data);
