/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const Button = ({ children, ...rest }) => <button {...rest}>{children}</button>;

export default Button;
