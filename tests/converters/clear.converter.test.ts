import { clearConverter } from '../../src/converters/clear.converter';

describe('clearConverter', () => {
  it('should remove trailing spaces', () => {
    const input = 'test string   ';
    const result = clearConverter(input);

    expect(result).toBe('test string');
  });

  it('should remove trailing comma', () => {
    const input = 'test string,';
    const result = clearConverter(input);

    expect(result).toBe('test string');
  });

  it('should remove trailing spaces then comma (spaces after comma remain)', () => {
    const input = 'test string   ,';
    const result = clearConverter(input);

    // The function removes trailing spaces first, then removes comma,
    // but leaves the original spaces that were before the comma
    expect(result).toBe('test string   ');
  });

  it('should handle empty string', () => {
    const result = clearConverter('');

    expect(result).toBe('');
  });

  it('should handle null/undefined input', () => {
    const result = clearConverter(null as any);

    expect(result).toBe(null);
  });

  it('should handle string with no trailing spaces or comma', () => {
    const input = 'clean string';
    const result = clearConverter(input);

    expect(result).toBe('clean string');
  });

  it('should handle string with only spaces', () => {
    const input = '   ';
    const result = clearConverter(input);

    expect(result).toBe('');
  });

  it('should handle multiple trailing spaces before comma (spaces remain after comma removal)', () => {
    const input = 'data     ,';
    const result = clearConverter(input);

    // Removes trailing comma but leaves the spaces that were before it
    expect(result).toBe('data     ');
  });

  it('should remove comma when no trailing spaces', () => {
    const input = 'data,';
    const result = clearConverter(input);

    expect(result).toBe('data');
  });
});