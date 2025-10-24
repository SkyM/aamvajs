import { dateConverter } from '../../src/converters/date.converter';

describe('dateConverter', () => {
  it('should handle empty string', () => {
    const result = dateConverter('');
    expect(result).toBe('');
  });

  it('should return empty string for all zeros date', () => {
    const result = dateConverter('00000000');
    expect(result).toBe('');
  });

  it('should parse MMDDYYYY format (start < 13)', () => {
    // 01121957 -> month=01, day=12, year=1957
    const result = dateConverter('01121957');
    expect(result).toBe('1957-01-12');
  });

  it('should parse MMDDYYYY format with month 12', () => {
    // 12252024 -> month=12, day=25, year=2024
    const result = dateConverter('12252024');
    expect(result).toBe('2024-12-25');
  });

  it('should parse YYYYMMDD format (start >= 13)', () => {
    // 20240312 -> year=2024, month=03, day=12
    const result = dateConverter('20240312');
    expect(result).toBe('2024-03-12');
  });

  it('should parse YYYYMMDD format with year starting with 19', () => {
    // 19900515 -> year=1990, month=05, day=15
    const result = dateConverter('19900515');
    expect(result).toBe('1990-05-15');
  });

  it('should remove non-digit characters before parsing', () => {
    // '01/12/1957' -> '01121957' -> '1957-01-12'
    const result = dateConverter('01/12/1957');
    expect(result).toBe('1957-01-12');
  });

  it('should handle date with spaces and special characters', () => {
    // '12-25-2024' -> '12252024' -> '2024-12-25'
    const result = dateConverter('12-25-2024');
    expect(result).toBe('2024-12-25');
  });

  it('should handle mixed format with non-digits', () => {
    // '2024/03/12' -> '20240312' -> '2024-03-12'
    const result = dateConverter('2024/03/12');
    expect(result).toBe('2024-03-12');
  });

  it('should handle edge case where month is 13 (YYYYMMDD format)', () => {
    // 13012024 -> start=13, so YYYYMMDD format -> 1301-20-24
    const result = dateConverter('13012024');
    expect(result).toBe('1301-20-24');
  });

  it('should handle date from AAMVA example (DBD field)', () => {
    // From README example: DBD07272016 -> 07272016 -> 2016-07-27
    const result = dateConverter('07272016');
    expect(result).toBe('2016-07-27');
  });

  it('should handle date from AAMVA example (DBB field)', () => {
    // From README example: DBB01121957 -> 01121957 -> 1957-01-12
    const result = dateConverter('01121957');
    expect(result).toBe('1957-01-12');
  });
});