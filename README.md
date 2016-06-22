# d3-tile
Image-based map tiles for use with D3.

Derived from [d3-plugins/geo/tile/](https://github.com/d3/d3-plugins/tree/master/geo/tile) and [Let’s Make a (D3) Plugin](https://bost.ocks.org/mike/d3-plugin/)

Example use: [Raster & Vector 4.0](http://bl.ocks.org/curran/e857dbe6db49d4cac379855b0b6b58e9)

## Installing

If you use NPM, `npm install d3-tile`. Otherwise, download the [latest release](https://github.com/d3/d3-tile/releases/latest).

## API Reference

<a href="#tile" name="tile">#</a> <b>tile</b>()

Constructs a layout for determining which 256x256 quadtree tiles to display in a rectangular viewport, based on a scale and translate. This layout can be used to create a simple slippy map, or render standard map tiles (e.g., MapBox, CloudMade) as a base layer behind a geographic projection.

```js
var tile = d3.geoTile();
```

<a href="#tile_size" name="tile_size">#</a> <i>tile</i>.<b>size</b>([<i>size</i>])

If *size* is specified, sets this tile layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this tile layout. If *size* is not specified, returns the current layout size.

<a href="#tile_scale" name="tile_scale">#</a> <i>tile</i>.<b>scale</b>([<i>scale</i>])

If *scale* is specified, sets this tile layout’s scale to the specified number *scale* and returns this tile layout. If *scale* is not specified, returns the current layout scale.

<a href="#tile_translate" name="tile_translate">#</a> <i>tile</i>.<b>translate</b>([<i>translate</i>])

If *translate* is specified, sets this tile layout’s translate to the specified two-element array of numbers [*x*, *y*] and returns this tile layout. If *translate* is not specified, returns the current layout translate.

<a href="#tile_size" name="tile_size">#</a> <i>tile</i>()

Computes the set of 256x256 quadtree tiles to display given the current layout [size](#tile_size), [scale](#tile_scale) and [translate](#tile_translate). Returns an array of arrays that specify tile addresses as `[x, y, z]` where `z` is the zoom level.

For example, the address of a tile from OpenStreetMap can be computed as follows, where `d` is an entry in the returned array.

```js
"http://a.tile.openstreetmap.org/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
```

The returned array also has properties `scale` and `translate` that can be used to apply the correct transformation to a `<g>` element containing the tile images where tile images have unit width and height, and (x, y) coordinates corresponding to the tile address. For example usage, see [Raster & Vector 4.0](http://bl.ocks.org/curran/e857dbe6db49d4cac379855b0b6b58e9).
