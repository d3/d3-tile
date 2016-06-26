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

  test.equal(tiles.scale, 256);
  test.equal(tiles.translate[0], -1.68359375);
  test.equal(tiles.translate[1], -5.08203125);
  test.equal(tiles.length, 15);

  test.equal(tiles[0][0], 1);
  test.equal(tiles[0][1], 5);
  test.equal(tiles[0][2], 4);
  test.equal(tiles[0].x, 256);
  test.equal(tiles[0].y, 5 * 256);

  test.equal(tiles[1][0], 2);
  test.equal(tiles[1][1], 5);
  test.equal(tiles[1][2], 4);
  test.equal(tiles[1].x, 2 * 256);
  test.equal(tiles[1].y, 5 * 256);

  test.equal(tiles[2][0], 3);
  test.equal(tiles[2][1], 5);
  test.equal(tiles[2][2], 4);
  test.equal(tiles[2].x, 3 * 256);
  test.equal(tiles[2].y, 5 * 256);

  test.end();
});
