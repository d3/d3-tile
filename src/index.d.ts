type Tile = {
  (...args: any): [number, number, number][] & {
    translate: [number, number];
    scale: number;
  };

  size(param: null | [number, number]): Tile;
  size(): [number, number];

  extent(param: null | [[number, number], [number, number]]): Tile;
  extent(): [[number, number], [number, number]];

  scale(params: (() => number) | null | number): Tile;
  scale(): () => number;

  translate(params: (() => [number, number]) | null | [number, number]): Tile;
  translate(): () => [number, number];

  zoomDelta(params: null | number): Tile;
  zoomDelta(): () => number;

  tileSize(params: null | number): Tile;
  tileSize(): number;

  clamp(params: null | boolean): Tile;
  clamp(): boolean;

  clampX(params: null | boolean): Tile;
  clampX(): boolean;

  clampY(params: null | boolean): Tile;
  clampY(): boolean;
}

export function tile(): Tile;

export function tileWrap(param: [number, number, number]): [number, number, number];
