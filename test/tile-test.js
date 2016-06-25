var tape = require("tape"),
    d3 = require("../");

tape("tile", function(test) {
  var width = 960,
      height = 500,
      tile = d3.tile()
        .size([width, height])
        .scale(4096)
        .translate([1617, 747]),
      tiles = tile();

  test.deepEqual(tile.size(), [width, height]);
  test.equal(tile.scale(), 4096);
  test.deepEqual(tile.translate(), [1617, 747]);

  test.equal(tiles.transform.k, 256);
  test.equal(tiles.transform.x, -431);
  test.equal(tiles.transform.y, -1301);
  test.equal(tiles.transform.toString(), "translate(-431,-1301) scale(256)");

  test.equal(tiles.length, 15);

  test.deepEqual(tiles[0], [ 1, 5, 4 ]);
  test.deepEqual(tiles[1], [ 2, 5, 4 ]);
  test.deepEqual(tiles[2], [ 3, 5, 4 ]);
  test.end();
});
