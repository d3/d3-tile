# d3-tile

A layout for working with image-based map tiles. This can be used to create a simple slippy map, or to render standard map tiles (*e.g.*, Mapbox, Mapzen, CloudMade, Bing) as a base layer behind a vector layer.

<table>
  <tr>
    <td>
      <a href="https://bl.ocks.org/curran/6df9bb477f8d93e3de2855980f70ace3">Raster & Vector I
      <br><img width="230" height="120" src="https://bl.ocks.org/curran/raw/6df9bb477f8d93e3de2855980f70ace3/thumbnail.png"></a>
    </td>
    <td>
      <a href="https://bl.ocks.org/curran/d0a49f5ef93acd8f220d505d186a6172">Raster & Vector II
      <br><img width="230" height="120" src="https://bl.ocks.org/curran/raw/d0a49f5ef93acd8f220d505d186a6172/thumbnail.png"></a>
    </td>
    <td>
      <a href="https://bl.ocks.org/curran/7f355dc5f8d4722c01b40f0566d5b4c3">Raster & Vector III
      <br><img width="230" height="120" src="https://bl.ocks.org/curran/raw/7f355dc5f8d4722c01b40f0566d5b4c3/thumbnail.png"></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://bl.ocks.org/curran/ba11b173edcf17020cd076eaddbe1654">Raster & Vector IV
      <br><img width="230" height="120" src="https://bl.ocks.org/curran/raw/ba11b173edcf17020cd076eaddbe1654/thumbnail.png"></a>
    </td>
    <td>
      <a href="https://observablehq.com/@mbostock/d3-vector-tiles">D3 Vector Tiles
      <br><img width="230" height="120" src="https://user-images.githubusercontent.com/68416/54068670-50759200-4275-11e9-9a7a-c1b04636bc3c.png"></a>
    </td>
    <td>
      <a href="https://bl.ocks.org/curran/20827d0f55d8b474bcfe5e1a2c06f0d8">Tile by Bounding Box
      <br><img width="230" height="120" src="https://bl.ocks.org/curran/raw/20827d0f55d8b474bcfe5e1a2c06f0d8/thumbnail.png"></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://bl.ocks.org/curran/96823ad84b0415536980b1cbf57b1dcc">Cross Country Trip
      <br><img width="230" height="120" src="https://bl.ocks.org/curran/raw/96823ad84b0415536980b1cbf57b1dcc/thumbnail.png"></a>
    </td>
    <td>
      <a href="https://bl.ocks.org/curran/1c17b0b923d52c0a573d5be3132489c2">d3-tile wrapping
      <br><img width="230" height="120" src="https://bl.ocks.org/curran/raw/1c17b0b923d52c0a573d5be3132489c2/thumbnail.png"></a>
    </td>
    <td>
      <a href="https://bl.ocks.org/curran/67cd5dc86eb259690c6848697e04e551">d3-tile tileSize
      <br><img width="230" height="120" src="https://bl.ocks.org/curran/raw/67cd5dc86eb259690c6848697e04e551/thumbnail.png"></a>
    </td>
  </tr>
</table>

## Note on Migrating From v0.0.3 to v0.0.4
Previously in `v0.0.3` of `d3-tile`, the following: 

```js
var tile = d3.tile();
tile();
``` 

Returned a two dimensional array data structure, where each the index of each inner array corresponded to `z`, `x`, and `y`:

```js
[
  [273, 376, 10],
  [274, 376, 10],
  [275, 376, 10],
  // etc...
]
```

In the `v0.0.4` of `d3-tile`, the data structured has become:

```js
[
  {x: 273, y: 376, z: 10, tx: 69888, ty: 96256},
  {x: 274, y: 376, z: 10, tx: 70144, ty: 96256},
  {x: 275, y: 376, z: 10, tx: 70400, ty: 96256},
  // etc...
]
```

As a result, the examples listed above will need to be modified if using a version of `d3-tile` > `v0.0.3`.

## Installing

If you use NPM, `npm install d3-tile`. Otherwise, download the [latest release](https://github.com/d3/d3-tile/releases/latest). You can also load directly from [unpkg.com](https://unpkg.com) as a [standalone library](https://unpkg.com/d3-tile@0.0). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3` global is exported:

```html
<script src="https://unpkg.com/d3-array@1.0"></script>
<script src="https://unpkg.com/d3-tile@0.0"></script>
<script>

var tile = d3.tile();

</script>
```

[Try d3-tile in your browser.](https://tonicdev.com/npm/d3-tile)

## API Reference

<a href="#tile" name="tile">#</a> d3.<b>tile</b>()

Constructs a layout for determining which quadtree tiles to display in a rectangular viewport.

```js
var tile = d3.tile();
```

<a href="#_tile" name="_tile">#</a> <i>tile</i>()

Computes the set of quadtree tiles to display given the current layout [extent](#tile_extent), [scale](#tile_scale), [translate](#tile_translate) and [tileSize](#tile_tileSize). Returns an array of objects with the following properties:

 * `x` The integer X coordinate of the tile address. Periodic if [wrap](#tile_wrap) is set to *true*.
 * `y` The integer Y coordinate of the tile address.
 * `z` The integer Z coordinate of the tile address (zoom level).
 * `tx` The X translate to be applied to the tile. This is the `x` value multiplied by [tileSize](#tile_tileSize), but without wrapping logic applied.
 * `ty` The Y translate to be applied to the tile. This is the `y` value multiplied by [tileSize](#tile_tileSize).

The returned array also has properties `scale` and `translate` that can be used to apply the correct transformation to the group of tile images. For example usage, see [Raster & Vector III](https://bl.ocks.org/curran/1c17b0b923d52c0a573d5be3132489c2).

<a href="#tile_extent" name="tile_extent">#</a> <i>tile</i>.<b>extent</b>([<i>extent</i>])

If *extent* is specified, sets this tile layout’s extent to the specified array of points [[*x0*, *y0*], [*x1*, *y1*]], where [*x0*, *y0*] is the top-left corner and [*x1*, *y1*] is the bottom-right corner, and returns this tile layout. If *extent* is not specified, returns the current layout extent.

<a href="#tile_size" name="tile_size">#</a> <i>tile</i>.<b>size</b>([<i>size</i>])

If *size* is specified, sets this tile layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this tile layout. If *size* is not specified, returns the current layout size. This is a convenience method equivalent to setting the [extent](#tile_extent) to [[0, 0], [*width*, *height*]].

<a href="#tile_scale" name="tile_scale">#</a> <i>tile</i>.<b>scale</b>([<i>scale</i>])

If *scale* is specified, sets this tile layout’s scale to the specified number *scale* and returns this tile layout. If *scale* is not specified, returns the current layout scale.

<a href="#tile_translate" name="tile_translate">#</a> <i>tile</i>.<b>translate</b>([<i>translate</i>])

If *translate* is specified, sets this tile layout’s translate to the specified two-element array of numbers [*x*, *y*] and returns this tile layout. If *translate* is not specified, returns the current layout translate.

<a href="#tile_wrap" name="tile_wrap">#</a> <i>tile</i>.<b>wrap</b>([<i>wrap</i>])

If *wrap* is specified, sets this tile layout’s wrapping option to the specified boolean value and returns this tile layout. If *wrap* is not specified, returns the current wrapping option, which defaults to *true*.

[![image](https://cloud.githubusercontent.com/assets/68416/16513800/0c158872-3f85-11e6-84c6-e481b7e0af5d.png)](https://bl.ocks.org/curran/1c17b0b923d52c0a573d5be3132489c2)
<p align="center"><b>wrap</b>(<i>true</i>)</p>

If *wrap* is *true*, wrapping logic will be applied to tile address *x* values when the layout is evaluated. This will cause map tiles to be displayed in a periodic manner, going beyond longitude values between -180 and 180.

[![image](https://cloud.githubusercontent.com/assets/68416/16513812/2644b43e-3f85-11e6-83fc-a34a37c852ab.png)](https://bl.ocks.org/curran/1c17b0b923d52c0a573d5be3132489c2)
<p align="center"><b>wrap</b>(<i>false</i>)</p>

If *wrap* is *false*, wrapping logic will be disabled, limiting tiles to be within longitude values between -180 and 180.

<a href="#tile_tileSize" name="tile_tileSize">#</a> <i>tile</i>.<b>tileSize</b>([<i>tileSize</i>])

If *tileSize* is specified, sets this tile layout’s individual tile widths and heights to the specified number *tileSize* and returns this tile layout. If *tileSize* is not specified, returns the current layout tile size, which defaults to 256, the most common tile size among tile service providers.
