import colors from '@/theme/colors';

import Input from './inputs';
import FormLabel from './FormLabel';
import FormErrorMessage from './FormErrorMessage';

const styleWrap = {
  display: 'flex',
  flexDirection: 'column',
};

const styleLabel = {
  width: '5.5em',
};

const BoxedInputControl = ({ name, label, type = 'text', value, required, error, onChange }) => {
  const styleInnerWrap = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid',
    borderColor: error ? colors.error : colors.body,
    borderRadius: '4px',
    width: '100%',
    padding: '0.5rem',
    ' > input': {
      padding: 0,
      border: 'none',
    },
  };
  return (
    <div css={styleWrap}>
      <div css={styleInnerWrap}>
        <FormLabel htmlFor={name} required={required} inline overrideCSS={styleLabel}>
          {label}
        </FormLabel>
        <Input id={name} name={name} type={type} required={required} value={value} onChange={onChange} />
      </div>
      <FormErrorMessage>{error}</FormErrorMessage>
    </div>
  );
};
export default BoxedInputControl;
