import { isoLanguageMapping } from '../mapping';

test('isoLanguageMapping should work', () => {
  expect(isoLanguageMapping['nn']).toBe('nno');
  expect(isoLanguageMapping['nb']).toBe('nob');
  expect(isoLanguageMapping['no']).toBe('nob');
});
