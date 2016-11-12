import {range} from "d3-array";

export default function() {
    var left = 0,
        top = 0,
        right = 960,
        bottom = 500,
        centerX = (left + right) / 2,
        centerY = (top + bottom) / 2,
        scale = 256,
        // zoomDelta: controls the sizes of the tiles, and in consequence,
        // the detail level.  zoomDelta of +1 will result in 128x128 tiles.
        // TODO: provide easy method for retrieving tile size (`scale`) for 
        // non-zero values of zoomDelta.
        zoomDelta = 0,
        transform = {},
        wrap = true;

    // This 'instantiates' an array-like object with tile data, when call
    // thusly:
    //     var tiles = tile
    //         .scale(transform.k)
    //         .translate([transform.x, transform.y])
    //     ();
    function tile() {
        // z:  the traditional zoom factor as used by (well everyone) (not-rounded)
        var z = Math.max(Math.log(scale) / Math.LN2 - 8, 0),
            // z0: rounded zoom factor
            z0 = Math.round(z + zoomDelta),
            // j: number of tiles required to cover the width or height of the world
            j = 1 << z0,
            // k: fractional remainder of rounding z, converted back to d3 zoom factor
            k = Math.pow(2, z - z0 + 8),
            // x:  center of screen (pixels) subtracting half the width of the world
            x = centerX - scale / 2,
            // y:  center of screen (pixels) subtracting half the height of the world
            y = centerY - scale / 2,
            tiles = [],
            // TODO: I think I might have mangled the explanation a little bit.
            //
            // With the map zoomed out to 256 pixels wide (usually the min-zoom),
            // with `scale` = 256, at what we would call 'z0', k represents the number
            // of tiles (one) it would take to span the globe, multiplied by
            // `scale` (256) (assuming deltaZoom is 0).
            //
            // Given that k (`scale`) is actually the number of pixels taken
            // to display the width or height of entire world, create a range
            // from the left of the screen to the right.
            //
            // TODO: What about the remainder of the rounding (z - z0)?
            // TODO: The effects of zoomDelta?
            //
            // Note, by subtracting x (large negative number) from left (0),
            // the range flips back into positive numbers. Dividing by k then
            // splits the range into tile sized pieces.
            //
            // To extend the range (creating a buffer of pre-loaded tiles),
            // assumedly one could subtract/add n*k/256 [guess] to either end of the
            // range, or alter the initially set size of the screen equally in
            // in both directions (the latter sounds safer).
            cols = range(
                Math.max(wrap ? -Infinity : 0, Math.floor((left - x) / k)),
                Math.min(Math.ceil((right - x) / k), wrap ? Infinity : j)
            ),
            rows = range(
                Math.max(0, Math.floor((top - y) / k)),
                Math.min(Math.ceil((bottom - y) / k), j)
            );

        rows.forEach(function(y) {
            cols.forEach(function(x) {
                tiles.push({
                    x: (x % j + j) % j,
                    y: y,
                    z: z0,
                    tx: x * 256,
                    ty: y * 256
                });
            });
        });

        tiles.translate = [x / k, y / k];
        tiles.scale = k;
        // a convience to avoid having to write tiles[0][2], becomes quite handy
        // when dealing with multiple instances with different z levels
        tiles.z = z0;
        // a way to tell an object (array) of tiles from a standard array
        tiles.name = 'tiles';

        // Wrapped because of excessive variable shadowing
        !function() {
            // For convenience, we preserve the original transform, implement
            // a method to directly set the transform, and add a property
            // containing the default `stringify` output.
            var scale = tiles.scale, 
                translate = tiles.translate;
            var k = scale / 256, r = scale % 1 ? Number : Math.round;
            var x = r(translate[0] * scale);
            var y = r(translate[1] * scale);
            var matrix = [
                k, 0, 0, 0,
                0, k, 0, 0,
                0, 0, k, 0,
                x, y, 0, 1
            ];
            tiles.matrix3d = "matrix3d(" + matrix + ")";
            tiles.matrix = matrix;
            tiles.k = k;
            tiles.x = x;
            tiles.y = y;
        }();

        return tiles;
    }

    tile.size = function(_) {
        return arguments.length ? (left = top = 0, right = +_[0], bottom = +_[1], tile) : [right - left, bottom - top];
    };

    tile.extent = function(_) {
        return arguments.length ? (left = +_[0][0], top = +_[0][1], right = +_[1][0], bottom = +_[1][1], tile) : [[left, top], [right, bottom]];
    };

    // Convient way to capture original transform, and make our tile
    // setup easier. Combines `tile.scale` and `tile.translate`
    // e.g.,
    //
    // function zoomed() {
    //     var transform = d3.event.transform;
    //     var tiles = tile
    //         .transform(transform)();
    //  ...
    tile.transform = function(_) {
        return arguments.length
            ? (
                transform = _,
                scale = transform.k,
                centerX = transform.x,
                centerY = transform.y,
                tile
            )
            : transform;
    };

    tile.scale = function(_) {
        return arguments.length
            ? (transform.k = scale = +_, tile)
            : scale;
    };

    tile.translate = function(_) {
        return arguments.length
            ? (transform.x = centerX = +_[0], transform.y = centerY = +_[1], tile)
            : [centerX, centerY];
    };

    tile.zoomDelta = function(_) {
        return arguments.length ? (zoomDelta = +_, tile) : zoomDelta;
    };

    tile.wrap = function(_) {
        return arguments.length ? (wrap = _, tile) : wrap;
    };

    return tile;
}
