export const ESLINT_DIRECTIVE_PATTERN =
  /^(?:eslint[- ]|(?:globals?|exported) )/u;
export const PRETTIER_IGNORE_JSX_FIX = `\n{/* prettier-ignore */}\n`;
export const RegPrettierWithCode =
  /({?\s?\/\*\s?prettier-ignore\s?\*\/\s?}?).*(\s*)?\(?<Trans(.|\s)*?>((.|\n|\r)*?)<\/Trans>\)?(\s+)?\)?/;

export const RegPrettierForReturnStatement =
  /({?\S?\/\*\s?prettier-ignore\s?\*\/\s?}?)(\s+?(return)\s+?)\(?(\s*)?\(?<Trans(.|\s)*?>((.|\n|\r)*?)<\/Trans>\)?(\s+)?\)?/;
export const RegPrettierForInline =
  /({?\s?\/\*\s?prettier-ignore\s?\*\/\s?}?)(\s|\s+)?\(?<Trans(.|\s)*?>((.|\n|\r)*?)<\/Trans>\)?(\s+)?\)?/;

export const RegPrettierForArguments =
  /({?\s?\/\*\s?prettier-ignore\s?\*\/\s?}?)((.|\n|\r)*?)\(?<Trans(.|\s)*?>((.|\n|\r)*?)<\/Trans>\)?(\s+)?\)?/;

export const PRETTIER_IGNORE_CODE = '/* prettier-ignore */\n';
export const PRETTIER_IGNORE_CODE_INLINE = '/* prettier-ignore */';
