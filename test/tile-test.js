var tape = require("tape"),
    d3 = require("../"),
    zoomIdentity = require("d3-zoom").zoomIdentity;

tape("tile", function(test) {
  var width = 960,
      height = 500,
      tile = d3.tile()
        .size([width, height]),
      transform = zoomIdentity
        .translate(1617, 747)
        .scale(4096),
      tiles = tile(transform);

  test.deepEqual(tile.size(), [width, height]);

  test.equal(tiles.scale, 256);
  test.equal(tiles.translate[0], -1.68359375);
  test.equal(tiles.translate[1], -5.08203125);
  test.equal(tiles.length, 15);
  test.deepEqual(tiles[0], [ 1, 5, 4 ]);
  test.deepEqual(tiles[1], [ 2, 5, 4 ]);
  test.deepEqual(tiles[2], [ 3, 5, 4 ]);
  test.end();
});
