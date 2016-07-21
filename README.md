# d3-tile

A layout for working with image-based map tiles. This can be used to create a simple slippy map, or to render standard map tiles (*e.g.*, Mapbox, Mapzen, CloudMade, Bing) as a base layer behind a vector layer.

<table>
  <tr>
    <td>
      <a href="http://bl.ocks.org/mbostock/94b9fd26e12c586f342d">Raster & Vector I
      <br><img width="230" height="120" src="http://bl.ocks.org/mbostock/raw/94b9fd26e12c586f342d/thumbnail.png"></a>
    </td>
    <td>
      <a href="http://bl.ocks.org/mbostock/5342063">Raster & Vector II
      <br><img width="230" height="120" src="http://bl.ocks.org/mbostock/raw/5342063/thumbnail.png"></a>
    </td>
    <td>
      <a href="http://bl.ocks.org/mbostock/5914438">Raster & Vector III
      <br><img width="230" height="120" src="http://bl.ocks.org/mbostock/raw/5914438/thumbnail.png"></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="http://bl.ocks.org/mbostock/9535021">Raster & Vector IV
      <br><img width="230" height="120" src="http://bl.ocks.org/mbostock/raw/9535021/thumbnail.png"></a>
    </td>
    <td>
      <a href="http://bl.ocks.org/mbostock/5593150">Vector Tiles
      <br><img width="230" height="120" src="http://bl.ocks.org/mbostock/raw/5593150/thumbnail.png"></a>
    </td>
    <td>
      <a href="http://bl.ocks.org/mbostock/eb0c48375fcdcdc00c54a92724733d0d">Tile by Bounding Box
      <br><img width="230" height="120" src="http://bl.ocks.org/mbostock/raw/eb0c48375fcdcdc00c54a92724733d0d/thumbnail.png"></a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="http://bl.ocks.org/curran/96823ad84b0415536980b1cbf57b1dcc">Cross Country Trip
      <br><img width="230" height="120" src="http://bl.ocks.org/curran/raw/96823ad84b0415536980b1cbf57b1dcc/thumbnail.png"></a>
    </td>
  </tr>
</table>

## Installing

If you use NPM, `npm install d3-tile`. Otherwise, download the [latest release](https://github.com/d3/d3-tile/releases/latest). You can also load directly from [d3js.org](https://d3js.org) as a [standalone library](https://d3js.org/d3-tile.v0.0.min.js). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3` global is exported:

```html
<script src="https://d3js.org/d3-array.v1.min.js"></script>
<script src="https://d3js.org/d3-tile.v0.0.min.js"></script>
<script>

var tile = d3.tile();

</script>
```

[Try d3-tile in your browser.](https://tonicdev.com/npm/d3-tile)

## API Reference

<a href="#tile" name="tile">#</a> d3.<b>tile</b>()

Constructs a layout for determining which 256x256 quadtree tiles to display in a rectangular viewport.

```js
var tile = d3.tile();
```

<a href="#_tile" name="_tile">#</a> <i>tile</i>()

Computes the set of 256x256 quadtree tiles to display given the current layout [extent](#tile_extent), [scale](#tile_scale) and [translate](#tile_translate). Returns an array of objects with the following properties:

 * `x` The integer X coordinate of the tile address. Periodic if [wrap](#tile_wrap) is set to *true*.
 * `y` The integer Y coordinate of the tile address.
 * `z` The integer Z coordinate of the tile address (zoom level).
 * `tx` The X translate to be applied to the tile. This is the `x` value multiplied by 256, but without wrapping logic applied.
 * `ty` The Y translate to be applied to the tile. This is the `y` value multiplied by 256.

The returned array also has properties `scale` and `translate` that can be used to apply the correct transformation to the group of tile images. For example usage, see [Raster & Vector III](http://bl.ocks.org/mbostock/5914438).

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

![image](https://cloud.githubusercontent.com/assets/68416/16513800/0c158872-3f85-11e6-84c6-e481b7e0af5d.png)
<p align="center"><b>wrap</b>(<i>true</i>)</p>

If *wrap* is *true*, wrapping logic will be applied to tile address *x* values when the layout is evaluated. This will cause map tiles to be displayed in a periodic manner, going beyond longitude values between -180 and 180.

![image](https://cloud.githubusercontent.com/assets/68416/16513812/2644b43e-3f85-11e6-83fc-a34a37c852ab.png)
<p align="center"><b>wrap</b>(<i>false</i>)</p>

If *wrap* is *false*, wrapping logic will be disabled, limiting tiles to be within longitude values between -180 and 180.
