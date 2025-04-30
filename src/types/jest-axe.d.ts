declare module 'jest-axe' {
    import { AxeResults } from 'axe-core';
    import { MatcherFunction } from 'expect';
  
    export const axe: (container: HTMLElement) => Promise<AxeResults>;
    export const toHaveNoViolations: MatcherFunction<[AxeResults]>;
  }
  