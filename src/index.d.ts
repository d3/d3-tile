type BaseTile<ScaleArgs extends any[], TranslateArgs extends any[]> = {
  size(): [number, number];
  extent(): [[number, number], [number, number]];
  scale(): (...args: ScaleArgs) => number;
  translate(): (...args: TranslateArgs) => [number, number];
  zoomDelta(): () => number;
  tileSize(): number;
  clamp(): boolean;
  clampX(): boolean;
  clampY(): boolean;
};

type ScaleMethodsMixins<TranslateArgs extends any[]> = {
  scale(params: () => number): ConstantScaleTile<TranslateArgs>;
  scale(params: (...args: TranslateArgs) => number): Tile<TranslateArgs>;
  scale(params: null | number): ConstantScaleTile<TranslateArgs>;
  scale<InvalidScaleArgs extends any[]>(
    params: (...args: InvalidScaleArgs) => number,
  ): InvalidTile<InvalidScaleArgs, TranslateArgs>;
};

type TranslateMethodsMixins<ScaleArgs extends any[]> = {
  translate(params: () => [number, number]): ConstantTranslateTile<ScaleArgs>;
  translate(params: (...args: ScaleArgs) => [number, number]): Tile<ScaleArgs>;
  translate(params: null | [number, number]): ConstantTranslateTile<ScaleArgs>;
  translate<InvalidTranslateArgs extends any[]>(
    params: (...args: InvalidTranslateArgs) => [number, number],
  ): InvalidTile<ScaleArgs, InvalidTranslateArgs>;
};

type InvalidTile<ScaleArgs extends any[], TranslateArgs extends any[]> =
  BaseTile<ScaleArgs,TranslateArgs> &
  ScaleMethodsMixins<TranslateArgs> &
  TranslateMethodsMixins<ScaleArgs>;

type ConstantScaleTile<TranslateArgs extends any[]> = BaseTile<[], TranslateArgs> &
  ScaleMethodsMixins<TranslateArgs> & {
    translate(params: () => [number, number]): Tile<[]>;
    translate(params: null | [number, number]): Tile<[]>;
    translate<InvalidTranslateArgs extends any[]>(
      params: (...args: InvalidTranslateArgs) => [number, number],
    ): ConstantScaleTile<InvalidTranslateArgs>;
  };

type ConstantTranslateTile<ScaleArgs extends any[]> = BaseTile<ScaleArgs, []> &
  TranslateMethodsMixins<ScaleArgs> & {
    scale(params: () => number): Tile<[]>;
    scale(params: null | number): Tile<[]>;
    scale<InvalidScaleArgs extends any[]>(
      params: (...args: InvalidScaleArgs) => number,
    ): ConstantTranslateTile<InvalidScaleArgs>;
  };

type Tile<Args extends any[]> = InvalidTile<Args, Args> & {
  (...args: Args): [number, number, number][] & {
    translate: [number, number];
    scale: number;
  };

  size(param: null | [number, number]): Tile<Args>;
  extent(param: null | [[number, number], [number, number]]): Tile<Args>;
  zoomDelta(params: null | number): Tile<Args>;
  tileSize(params: null | number): Tile<Args>;
  clamp(params: null | boolean): Tile<Args>;
  clampX(params: null | boolean): Tile<Args>;
  clampY(params: null | boolean): Tile<Args>;
};

export function tile(): Tile<[{ x: number; y: number; k: number }]>;

export function tileWrap(param: [number, number, number]): [number, number, number];
