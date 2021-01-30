/** @jsx jsx */
import { keyframes, css as CSS, jsx } from '@emotion/react';

const right = keyframes`
  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}
  100% {transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg)}
`;

const left = keyframes`
  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}
  100% {transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg)}
`;

const Spinner = ({ css, color, size = 2.5 }) => {
  const unit = 'rem';
  const style = (i) => {
    const value = size;

    return CSS`
      position: absolute;
      top: 0;
      left: 0;
      width: ${`${value}${unit}`};
      height: ${`${value}${unit}`};
      border: ${`${value / 10}${unit}`} solid ${color};
      opacity: 0.4;
      border-radius: 100%;
      animation-fill-mode: forwards;
      perspective: 800px;
      animation: ${i === 1 ? right : left} 2s 0s infinite linear;
    `;
  };

  const wrapper = () => {
    return CSS`
      width: ${size}${unit};
      height: ${size}${unit};
      position: relative;
    `;
  };

  return (
    <span css={[wrapper(), css]}>
      <span css={style(1)} />
      <span css={style(2)} />
    </span>
  );
};

export default Spinner;
