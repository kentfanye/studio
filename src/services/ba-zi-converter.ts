/**
 * Represents a date of birth.
 */
export interface Birthdate {
  /**
   * The year of the birthdate.
   */
  year: number;
  /**
   * The month of the birthdate.
   */
  month: number;
  /**
   * The day of the birthdate.
   */
  day: number;

  /**
   * The hour of the birthdate.
   */
  hour: number;
}

/**
 * Represents a Ba Zi chart.
 */
export interface BaZi {
  /**
   * The year pillar of the Ba Zi chart.
   */
  year: string;
  /**
   * The month pillar of the Ba Zi chart.
   */
  month: string;
  /**
   * The day pillar of the Ba Zi chart.
   */
  day: string;
  /**
   * The hour pillar of the Ba Zi chart.
   */
  hour: string;
}

/**
 * Asynchronously converts a birthdate to a Ba Zi chart.
 *
 * @param birthdate The birthdate to convert.
 * @returns A promise that resolves to a BaZi object representing the Ba Zi chart.
 */
export async function convertBirthdateToBaZi(birthdate: Birthdate): Promise<BaZi> {
  // TODO: Implement this by calling an API.

  return {
    year: '甲子',
    month: '丙寅',
    day: '戊辰',
    hour: '庚申',
  };
}
