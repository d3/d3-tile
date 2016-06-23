# d3-tile

A D3 layout for working with image-based map tiles. This layout can be used to create a simple slippy map, or render standard map tiles (e.g., MapBox, CloudMade) as a base layer behind a geographic projection.

<table>
  <tr>
    <td>
      <a href="http://bl.ocks.org/curran/e857dbe6db49d4cac379855b0b6b58e9">Raster & Vector 4.0</a>
      <br>
      <a href="http://bl.ocks.org/curran/e857dbe6db49d4cac379855b0b6b58e9">
        <img src="http://bl.ocks.org/curran/raw/e857dbe6db49d4cac379855b0b6b58e9/thumbnail.png">
      </a>
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

Computes the set of 256x256 quadtree tiles to display given the current layout [extent](#tile_extent), [scale](#tile_scale) and [translate](#tile_translate). Returns an array of arrays that specify tile addresses as [*x*, *y*, *z*] where *z* is the zoom level. For example, the address of a tile from OpenStreetMap can be computed as follows, where *d* is an entry in the returned array.

```js
"http://a.tile.openstreetmap.org/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"
```

The returned array also has properties `scale` and `translate` that can be used to apply the correct transformation to an SVG G element containing the tile images where tile images have unit width and height, and *x*- and *y*-coordinates corresponding to the tile address. For example usage, see [Raster & Vector 4.0](http://bl.ocks.org/curran/e857dbe6db49d4cac379855b0b6b58e9).

<a href="#tile_extent" name="tile_extent">#</a> <i>tile</i>.<b>extent</b>([<i>extent</i>])

If *extent* is specified, sets this tile layout’s extent to the specified array of points [[*x0*, *y0*], [*x1*, *y1*]], where [*x0*, *y0*] is the top-left corner and [*x1*, *y1*] is the bottom-right corner, and returns this tile layout. If *extent* is not specified, returns the current layout extent.

<a href="#tile_size" name="tile_size">#</a> <i>tile</i>.<b>size</b>([<i>size</i>])

If *size* is specified, sets this tile layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this tile layout. If *size* is not specified, returns the current layout size. This is a convenience method equivalent to setting the [extent](#tile_extent) to [[0, 0], [*width*, *height*]].

<a href="#tile_scale" name="tile_scale">#</a> <i>tile</i>.<b>scale</b>([<i>scale</i>])

If *scale* is specified, sets this tile layout’s scale to the specified number *scale* and returns this tile layout. If *scale* is not specified, returns the current layout scale.

<a href="#tile_translate" name="tile_translate">#</a> <i>tile</i>.<b>translate</b>([<i>translate</i>])

If *translate* is specified, sets this tile layout’s translate to the specified two-element array of numbers [*x*, *y*] and returns this tile layout. If *translate* is not specified, returns the current layout translate.

<a href="#tile_transform" name="tile_transform">#</a> <i>tile</i>.<b>transform</b>([<i>transform</i>])

If *transform* is specified, sets this tile layout’s scale and translate from the specified [zoom transform](https://github.com/d3/d3-zoom#zoom-transforms) and returns this tile layout. If *transform* is not specified, returns the current layout scale and translate as a transform.

The following two invocations are equivalent:

```js
tile.transform(transform);
```

```js
tile
  .scale(transform.k)
  .translate([transform.x, transform.y]);
```
