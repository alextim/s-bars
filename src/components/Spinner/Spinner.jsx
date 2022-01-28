import { keyframes, css as CSS } from '@emotion/react';

const right = keyframes`
  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}
  100% {transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg)}
`;

const left = keyframes`
  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}
  100% {transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg)}
`;

const unit = 'rem';

const Spinner = ({ css, color, size = 2.5 }) => {
  const style = (i) => CSS`
    position: absolute;
    top: 0;
    left: 0;
    width: ${`${size}${unit}`};
    height: ${`${size}${unit}`};
    border: ${`${size / 10}${unit}`} solid ${color};
    opacity: 0.4;
    border-radius: 100%;
    animation-fill-mode: forwards;
    perspective: 800px;
    animation: ${i === 1 ? right : left} 2s 0s infinite linear;
  `;

  const styleWrap = {
    width: `{size}${unit}`,
    height: `${size}${unit}`,
    position: 'relative',
  };

  return (
    <span css={[styleWrap, css]}>
      <span css={style(1)} />
      <span css={style(2)} />
    </span>
  );
};

export default Spinner;
