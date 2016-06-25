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
      <a href="http://bl.ocks.org/mbostock/eb0c48375fcdcdc00c54a92724733d0d">Tile by Bounding Box
      <br><img width="230" height="120" src="http://bl.ocks.org/mbostock/raw/eb0c48375fcdcdc00c54a92724733d0d/thumbnail.png"></a>
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

<a href="#_tile" name="_tile">#</a> <i>tile</i>(transform)

Computes the set of 256x256 quadtree tiles to display given the current layout [extent](#tile_extent) and the specified *[transform](https://github.com/d3/d3-zoom#zoom-transforms)*. Returns an array of arrays that specify tile addresses as [*x*, *y*, *z*] where *z* is the zoom level. For example, the address of a tile from OpenStreetMap can be computed as follows, where *d* is an entry in the returned array.

```js
"http://a.tile.openstreetmap.org/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"
```

The returned array also has properties `scale` and `translate` that can be used to apply the correct transformation to an SVG G element containing the tile images where tile images have unit width and height, and *x*- and *y*-coordinates corresponding to the tile address. For example usage, see [Raster & Vector 4.0](http://bl.ocks.org/curran/e857dbe6db49d4cac379855b0b6b58e9).

<a href="#tile_extent" name="tile_extent">#</a> <i>tile</i>.<b>extent</b>([<i>extent</i>])

If *extent* is specified, sets this tile layout’s extent to the specified array of points [[*x0*, *y0*], [*x1*, *y1*]], where [*x0*, *y0*] is the top-left corner and [*x1*, *y1*] is the bottom-right corner, and returns this tile layout. If *extent* is not specified, returns the current layout extent.

<a href="#tile_size" name="tile_size">#</a> <i>tile</i>.<b>size</b>([<i>size</i>])

If *size* is specified, sets this tile layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this tile layout. If *size* is not specified, returns the current layout size. This is a convenience method equivalent to setting the [extent](#tile_extent) to [[0, 0], [*width*, *height*]].
