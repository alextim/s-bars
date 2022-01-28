import ButtonBase from '../ButtonBase';
import Link from '../LocalizedLink';

const linkComponent = ({ children, ...rest }) => <Link {...rest}>{children}</Link>;

const Button = ({ to, overrideCSS, icon, children, tag, secondary, tracking, variant, ...rest }) => (
  <ButtonBase
    to={to}
    overrideCSS={overrideCSS}
    icon={icon}
    tag={tag}
    secondary={secondary}
    tracking={tracking}
    variant={variant}
    linkComponent={linkComponent}
    {...rest}
  >
    {children}
  </ButtonBase>
);

export default Button;
