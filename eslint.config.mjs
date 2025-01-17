import panda from '@pandacss/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import astroParser from 'astro-eslint-parser'
import eslintPluginAstro from 'eslint-plugin-astro'
import jsxA11y from 'eslint-plugin-jsx-a11y'

const styledCss = 'css|cx|cva|sva'
const styledPatterns =
  'box|flex|stack|vstack|hstack|spacer|square|circle|center|link-overlay|aspect-ratio|grid|grid-item|wrap|container|divider|float|bleed|visually-hidden|cq'
const styledCalleeName = `${styledCss}|${styledPatterns}`

const createStyledNoRestrictedSyntax = (rules) =>
  rules.map(([property, suggestion]) => ({
    selector: `CallExpression[callee.name=/^(${styledCalleeName})$/] Property[key.name='${property}'][value.type!='ObjectExpression']`,
    message: `'${property}' は使用しないでください。${suggestion ? `代わりに '${suggestion}' にしてください。` : '非推奨です。'}`
  }))

const createHTMLTagNoRestrictedSyntax = (rules) =>
  rules.map(([property, suggestion]) => ({
    selector: `JSXOpeningElement[name.name='${property}']`,
    message: `'${property}' は使用しないでください。${suggestion ? `代わりに '${suggestion}' にしてください。` : '非推奨です。'}`
  }))

const createAttributeNoRestrictedSyntax = (rules) =>
  rules.map(([property, suggestion]) => ({
    selector: `JSXAttribute[name.name='${property}']`,
    message: `'${property}' は使用しないでください。${suggestion ? `代わりに '${suggestion}' にしてください。` : '非推奨です。'}`
  }))

const pandaRules = {
  ...Object.fromEntries(
    Object.entries(panda.configs.all.rules).map(([key, value]) => [
      key,
      value === 'warn' ? 'error' : value
    ])
  ),
  '@pandacss/no-physical-properties': 'off',
  '@pandacss/prefer-longhand-properties': 'off',
  '@pandacss/prefer-atomic-properties': 'off', // コードが長くなりすぎる場合のみ、compositeプロパティを使用(例えば、borderをatomicで記述すると12個になってしまう場合など)
  '@pandacss/prefer-composite-properties': 'off'
}

const eslintConfig = [
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-strict'],
  {
    files: ['**/*.{js,jsx,ts,tsx,astro}'],
    ignores: ['*.d.ts', 'node_modules/**', 'styled-system', '.astro/**', 'dist/**'],
    plugins: {
      '@pandacss': panda
    },
    languageOptions: {
      parser: typescriptParser
    },
    rules: {
      ...pandaRules,
      'no-duplicate-imports': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./*', '../*'],
              message: "絶対パスでインポートしてください。例: '@/components/toc/types'"
            }
          ],
          paths: [
            {
              name: 'astro:assets',
              importNames: ['Image', 'Picture'],
              message:
                '代わりにローカルにある画像最適化付きの同名のコンポーネントを使用してください。'
            }
          ]
        }
      ],
      'no-restricted-syntax': [
        'error',
        // Panda CSSで特定のプロパティ名の使用を禁止
        // ['使用を禁止したいプロパティ名', '代わりに提案したい方法'](代わりに提案したい方法がなければ、''にしてください。)
        // 使用を禁止するプロパティ名は、https://developer.mozilla.org/ja/docs/Web/CSS を参考にしました。
        ...createStyledNoRestrictedSyntax([
          ['bgImage', 'Imageコンポーネント'],
          ['float', 'flexboxやgridレイアウト'],
          ['clip', 'clipPath'],
          ['boxAlign', ''],
          ['boxDirection', ''],
          ['boxFlex', ''],
          ['boxFlexGroup', ''],
          ['boxLines', ''],
          ['boxOrdinalGroup', ''],
          ['boxOrient', ''],
          ['boxPack', '']
        ]),
        // 特定のHTMLタグの使用を禁止
        // ['使用を禁止したいHTMLタグ', '代わりに提案したい方法'](代わりに提案したい方法がなければ、''にしてください。)
        // Markuplintで<font>、<center>、<marquee>、<frameset>、<frame>、<noframes>、<big>、<applet>、<blink>、<strike>、<rb>、<rtc>、<acronym>、<basefont>、<bgsound>、<dir>、<isindex>、<keygen>、<listing>、<marquee>、<menuitem>、<nobr>、<noembed>、<plaintext>、<tt>、<xmp>の使用は、既に禁止されています。
        // <small>は補足情報で使用するので、禁止にはしていません。
        ...createHTMLTagNoRestrictedSyntax([
          ['b', '<strong>または<em>またはスタイルで太字'],
          ['i', '<em>または<cite>またはスタイルで斜体'],
          ['u', '<mark>または<abbr>またはスタイルで下線'],
          ['s', '<del>または<ins>またはスタイルで打ち消し線'],
          ['hgroup', '<header>または<section>または<div>にARIA属性'],
          ['command', '<menu>または<button>または<kbd>または<ul>または<ol>または<span>'],
          ['style', 'Panda CSS']
          // ['img', 'Imageコンポーネント'], // TODO: いずれ適用
        ]),
        // 特定のHTML属性の使用を禁止
        ...createAttributeNoRestrictedSyntax([['style', 'Panda CSS']])
      ]
    }
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.astro']
      }
    },
    rules: pandaRules
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'jsx-a11y': jsxA11y
    },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules
    }
  }
]

export default eslintConfig
