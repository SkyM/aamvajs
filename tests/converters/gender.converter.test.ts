import { genderConverter } from '../../src/converters/gender.converter';

describe('genderConverter', () => {
  it('should convert "1" to "M" (Male)', () => {
    const result = genderConverter('1');
    expect(result).toBe('M');
  });

  it('should convert "2" to "F" (Female)', () => {
    const result = genderConverter('2');
    expect(result).toBe('F');
  });

  it('should convert "9" to "NS" (Not Specified)', () => {
    const result = genderConverter('9');
    expect(result).toBe('NS');
  });

  it('should return first character for unknown codes', () => {
    const result = genderConverter('3');
    expect(result).toBe('3');
  });

  it('should return first character for alphabetic codes', () => {
    const result = genderConverter('X');
    expect(result).toBe('X');
  });

  it('should handle empty string', () => {
    const result = genderConverter('');
    expect(result).toBe('');
  });

  it('should handle null/undefined input', () => {
    const result = genderConverter(null as any);
    expect(result).toBe(null);
  });

  it('should handle undefined input', () => {
    const result = genderConverter(undefined as any);
    expect(result).toBe(undefined);
  });

  it('should only use first character of multi-character input', () => {
    const result = genderConverter('1ABC');
    expect(result).toBe('M');
  });

  it('should handle multi-character unknown codes', () => {
    const result = genderConverter('5XYZ');
    expect(result).toBe('5');
  });

  it('should handle AAMVA example (DBC1 -> sex: "M")', () => {
    // From README example: DBC1 means sex code "1" -> "M"
    const result = genderConverter('1');
    expect(result).toBe('M');
  });

  it('should handle female example', () => {
    const result = genderConverter('2FEMALE');
    expect(result).toBe('F');
  });

  it('should handle not specified example', () => {
    const result = genderConverter('9OTHER');
    expect(result).toBe('NS');
  });
});