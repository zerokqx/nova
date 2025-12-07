import { createNotation } from './create-notation.ts';

describe('slashNotation', () => {
  const separator = '/';
  const notation = createNotation('/');
  it('equals-slash', () => {
    expect(notation.inferSep()).toEqual(separator);
  });

  it('create-notation', () => {
    expect(notation.createStringNotation('test', separator, 'test')).toEqual(
      'test/test'
    );
    expect(() => {
      notation.createStringNotation('1', '/', '');
    }).toThrow('Parts the length is not more than 0 ');
  });

  it('parse-separator', () => {
    expect(notation.parseSeparator(`test${notation.inferSep()}test`)).toEqual(
      separator
    );
  });

  it('parse-notation', () => {
    expect(notation.parseNotation(`test${separator}second`)).toStrictEqual({
      partFirst: 'test',
      partSecond: 'second',
    });
  });
});
