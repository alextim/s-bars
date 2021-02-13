/** @jsx jsx */
import { jsx } from '@emotion/react';

const Input = ({ ...props }) => <input {...props} />;

export default Input;

export const TextArea = ({ ...props }) => <textarea {...props} />;
export const Select = ({ children, ...props }) => <select {...props}>{children}</select>;
export const CheckBox = ({ ...props }) => <input type="checkbox" {...props} />;
