import { dataMatchHeaders } from '../src/data-match';

describe('dataMatch', () => {
  it('should export dataMatchHeaders array', () => {
    expect(dataMatchHeaders).toBeDefined();
    expect(Array.isArray(dataMatchHeaders)).toBe(true);
    expect(dataMatchHeaders.length).toBeGreaterThan(0);
  });

  it('should have valid header structure', () => {
    const firstHeader = dataMatchHeaders[0];
    expect(firstHeader).toHaveProperty('id');
    expect(firstHeader).toHaveProperty('name');
    expect(firstHeader).toHaveProperty('converters');
    expect(Array.isArray(firstHeader.converters)).toBe(true);
  });

  it('should contain standard AAMVA fields', () => {
    const ids = dataMatchHeaders.map(h => h.id);

    // Check for some key AAMVA fields from the README example
    expect(ids).toContain('DBA'); // expirationDate
    expect(ids).toContain('DBB'); // dateOfBirth
    expect(ids).toContain('DBC'); // sex
    expect(ids).toContain('DCS'); // familyName
    expect(ids).toContain('DAC'); // firstName
  });

  it('should find DBA field with correct mapping', () => {
    const dbaField = dataMatchHeaders.find(h => h.id === 'DBA');
    expect(dbaField).toBeDefined();
    expect(dbaField?.name).toBe('expirationDate');
    expect(dbaField?.converters).toHaveLength(2); // clearConverter + dateConverter
  });

  it('should find DBC field with correct mapping', () => {
    const dbcField = dataMatchHeaders.find(h => h.id === 'DBC');
    expect(dbcField).toBeDefined();
    expect(dbcField?.name).toBe('sex');
    expect(dbcField?.converters).toHaveLength(2); // clearConverter + genderConverter
  });

  it('should contain Florida local fields', () => {
    const floridaFields = dataMatchHeaders.filter(h => h.id.startsWith('ZF'));
    expect(floridaFields.length).toBeGreaterThan(0);

    // Check for specific Florida field from README example
    const zfcField = dataMatchHeaders.find(h => h.id === 'ZFC');
    expect(zfcField).toBeDefined();
    expect(zfcField?.name).toBe('safeDriverIndicator');
  });

  it('should have state-specific fields', () => {
    const stateSpecificFields = dataMatchHeaders.filter(h => h.state);
    expect(stateSpecificFields.length).toBeGreaterThan(0);

    // Check for NY and ON state fields
    const nyFields = dataMatchHeaders.filter(h => h.state === 'NY');
    const onFields = dataMatchHeaders.filter(h => h.state === 'ON');

    expect(nyFields.length).toBeGreaterThan(0);
    expect(onFields.length).toBeGreaterThan(0);
  });
});