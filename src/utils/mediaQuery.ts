type BreakPoint = 'md' | 'lg';

const getBreakPoint = (breakpoint: BreakPoint) => {
  const breakpoints = {
    "md": 768,
    "lg": 1440,
  };
  return breakpoints[breakpoint];
}

export const mediaQuery = (breakpoint: BreakPoint) => {
  return `@media only screen and (min-width: ${getBreakPoint(breakpoint)}px)`;
};