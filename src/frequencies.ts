
const frequencies: Record<12 | 15 | 30 | 60 | 120, number> = {
  [120]: 8.33333333,
  [60]: 16.6666667,
  [30]: 33.3333333,
  [15]: 66.6666667,
  [12]: 83.3333333,
};

/**
 * @param hz Frequency
 * @returns The number of milliseconds in each cycle for the given frequency
 */
export const getMillisecondsFromFrequency = (hz: number): number => {
  return 1 / hz * 1000;
}

export default frequencies;
