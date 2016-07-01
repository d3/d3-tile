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

  var d = [1, 5, 4];
  d.x = 256;
  d.y = 5 * 256;
  test.deepEqual(tiles[0], d);

  d = [2, 5, 4];
  d.x = 2 * 256;
  d.y = 5 * 256;
  test.deepEqual(tiles[1], d);

  d = [3, 5, 4];
  d.x = 3 * 256;
  d.y = 5 * 256;
  test.deepEqual(tiles[2], d);

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
        .translate([480, 250]),
      tiles = tile();

  test.equal(tile.wrap(), true);
  test.equal(tile().length, 5);

  var d = [0, 0, 0];
  d.x = -512;
  d.y = 0;
  test.deepEqual(tiles[0], d);

  d.x = -256;
  test.deepEqual(tiles[1], d);

  d.x = 0;
  test.deepEqual(tiles[2], d);

  d.x = 256;
  test.deepEqual(tiles[3], d);

  d.x = 512;
  test.deepEqual(tiles[4], d);

  test.equal(tile.wrap(false), tile);
  test.equal(tile.wrap(), false);
  test.equal(tile().length, 1);

  d.x = -512;
  test.deepEqual(tiles[0], d);

  test.end();
});
