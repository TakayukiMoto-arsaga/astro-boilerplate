import type { Gradient, Border } from '@pandacss/types'

type ColorCategory =
  | 'current'
  | 'black'
  | 'white'
  | 'transparent'
  | 'rose'
  | 'pink'
  | 'fuchsia'
  | 'purple'
  | 'violet'
  | 'indigo'
  | 'blue'
  | 'sky'
  | 'cyan'
  | 'teal'
  | 'emerald'
  | 'green'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'red'
  | 'neutral'
  | 'stone'
  | 'zinc'
  | 'gray'
  | 'slate'

type ColorShades =
  | ''
  | '.50'
  | '.100'
  | '.200'
  | '.300'
  | '.400'
  | '.500'
  | '.600'
  | '.700'
  | '.800'
  | '.900'
  | '.950'

export type ColorPath = `${ColorCategory}${ColorShades}`

type ColorValue = [ColorPath, (ColorPath | '')?] // [base, _osDark]、値を追加するときはここへ追加

type ColorValueResult = {
  //値を追加するときはここへ追加
  base: ColorPath
  _osDark: ColorPath | ''
}

export type ColorTokens = {
  [key: string]: ColorValue | ColorTokens
}

export type ColorTokenResult = {
  [key: string]: {
    value: ColorValueResult
  } & {
    [nestedKey: string]: ColorTokenResult | { value: ColorValueResult }
  }
}

type GradientValue = [
  'linear' | 'radial', // type(baseと_osDarkで同じ値を使います。)
  string, // placement(baseと_osDarkで同じ値を使います。)
  ColorPath[], // stops -> color(base)(color(base)とcolor(_osDark)とpositionの要素数は同じにしてください。)
  ColorPath[]?, // stops -> color(_osDark)
  number[]?, // stops -> position(baseと_osDarkで同じ値を使います。単位はpxで、それぞれの数字の間隔にグラデーションがかかります。)
]

export type GradientTokens = {
  [key: string]: GradientValue | GradientTokens
}

export type GradientTokenResult = {
  [key: string]: {
    value: Gradient
  } & {
    [nestedKey: string]: GradientTokenResult | { value: Gradient }
  }
}

export type BorderStyle =
  | 'none'
  | 'hidden'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'

export type BorderColor = [ColorPath] | [ColorPath, ColorPath | '']

type BorderValue = [
  number, // width(単位はremです。baseと_osDarkで同じ値を使います。)
  BorderStyle, // style(baseと_osDarkで同じ値を使います。)
  BorderColor, // color(base) | color(_osDark)
]

export type BorderTokens = {
  [key: string]: BorderValue | BorderTokens
}

export type BorderTokenResult = {
  [key: string]: {
    value: Border
  } & {
    [nestedKey: string]: BorderTokenResult | { value: Border }
  }
}
