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

tape("size uses default values", function(test) {
  var size = d3.tile().size();
  test.equal(size[0], 960);
  test.equal(size[1], 500);
  test.end();
});

tape("wrap", function(test) {
  var tile = d3.tile()
        .scale(1 << 8)
        .translate([480, 250]);
      tiles = tile();

  test.equal(tile.wrap(), true);
  test.equal(tile().length, 5);

  test.equal(tiles[0][0], 0);
  test.equal(tiles[0][1], 0);
  test.equal(tiles[0][2], 0);
  test.equal(tiles[0].x, -512);
  test.equal(tiles[0].y, 0);

  test.equal(tiles[1][0], 0);
  test.equal(tiles[1][1], 0);
  test.equal(tiles[1][2], 0);
  test.equal(tiles[1].x, -256);
  test.equal(tiles[1].y, 0);

  test.equal(tiles[2][0], 0);
  test.equal(tiles[2][1], 0);
  test.equal(tiles[2][2], 0);
  test.equal(tiles[2].x, 0);
  test.equal(tiles[2].y, 0);

  test.equal(tiles[3][0], 0);
  test.equal(tiles[3][1], 0);
  test.equal(tiles[3][2], 0);
  test.equal(tiles[3].x, 256);
  test.equal(tiles[3].y, 0);

  test.equal(tiles[4][0], 0);
  test.equal(tiles[4][1], 0);
  test.equal(tiles[4][2], 0);
  test.equal(tiles[4].x, 512);
  test.equal(tiles[4].y, 0);

  test.equal(tile.wrap(false), tile);
  test.equal(tile.wrap(), false);
  test.equal(tile().length, 1);

  test.equal(tiles[0][0], 0);
  test.equal(tiles[0][1], 0);
  test.equal(tiles[0][2], 0);
  test.equal(tiles[0].x, -512);
  test.equal(tiles[0].y, 0);

  test.end();
});
