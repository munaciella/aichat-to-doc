/* eslint-disable @typescript-eslint/no-require-imports */
const React = require('react');

// Replace `next/image` with a plain <img>
module.exports = function Image(props) {
  return React.createElement('img', props);
};
