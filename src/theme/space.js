// eslint-disable-next-line import/no-extraneous-dependencies
import preval from 'preval.macro';

const s = preval`
  const space = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72];
  const spacePx = space.map((t) => t + 'px');
  const spaceRem = space.map((t) => t / 16 + 'rem');
  module.exports = { space, spacePx, spaceRem };
`;

export const space = s.spaceRem;
export const { spacePx } = s;
export const spaceRaw = s.space;
