'use strict';

const config = require('./config.js');
const Tile = require('./tile.js');

/**
 * Key class, represents a given key used for
 * encryption/decryption
 */
class Key {
    /**
     * constructor - Create a new Key to
     * operate on
     *
     * @param  {string} key 36 letter permutation of config.alphabet (See config.js)
     */
    constructor(key) {
        this.key = Array.from(key);

        /* Construct the 2D array of tiles */
        this.tiles = [];  // 2D array of tiles
        for (let i=0; i<config.box_size; i++) {
            this.tiles.push(
                this.key.slice(i * config.box_size, (i + 1) * config.box_size)
                    .map(x => new Tile(x))
            );
        }

        /* Define the position of the marker */
        this.marker_x = 0;
        this.marker_y = 0;
    }

    /**
     * encrypt - Encrypts a singular letter
     *
     * @param  {string} letter String. Letter must be in the alphabet
     * @return {string}        ciphertext
     */
    encrypt(letter) {
        /* temp tile is to get movement vector */
        let temp_tile = this.get_tile_at_marker();
        let plain_tile_pos = this.get_pos_of_letter(letter);

        /* Before we return, we need to do some things */
        let ny = (plain_tile_pos[1] + temp_tile.dy) % config.box_size;
        let nx = (plain_tile_pos[0] + temp_tile.dx) % config.box_size;
        let returned = this.tiles[ny][nx];

        this.shift_row_right(plain_tile_pos[1]);
        this.shift_column_down(this.get_pos_of_letter(returned.value)[0]);
        this.move_marker(returned.dx, returned.dy);

        return returned.value;
    }

    /**
     * decrypt - Decrypt a singular letter
     *
     * @param  {string} letter Strng. Letter must be in the alphabet
     * @return {string}        plaintext
     */
    decrypt(letter) {
        /* temp tile is to get movement vector */
        let temp_tile = this.get_tile_at_marker();
        let cipher_tile_pos = this.get_pos_of_letter(letter);
        let cipher_tile = this.get_tile(letter);

        /* Before we return, we need to do some things
         * config.box_size is added as a fix for negative mod */
        let ny = (cipher_tile_pos[1] - temp_tile.dy + config.box_size) % config.box_size;
        let nx = (cipher_tile_pos[0] - temp_tile.dx + config.box_size) % config.box_size;

        let returned = this.tiles[ny][nx];

        this.shift_row_right(ny);
        this.shift_column_down(this.get_pos_of_letter(letter)[0]);
        this.move_marker(cipher_tile.dx, cipher_tile.dy);

        return returned.value;
    }

    /**
     * shift_row_right - Shifts a given row right
     * 1 space. Elements loop over to the left. If the
     * marker is on a shifted tile, it also moves.
     *
     * @param  {number} row y value of row, 0 = top
     */
    shift_row_right(row) {
        if (this.marker_y === row) {
            this.move_marker(1, 0);
        }
        this.tiles[row] = [this.tiles[row][this.tiles[row].length - 1]].concat(this.tiles[row].slice(0, -1));
    }

    /**
     * shift_column_down - Shifts a given col down
     * 1 space. Elements loop over to the top. If the
     * marker is on a shifted tile, it also moves.
     *
     * @param  {number} col x value of col, 0 = left
     */
    shift_column_down(col) {
        if (this.marker_x === col) {
            this.move_marker(0, 1);
        }
        let temp = this.tiles[this.tiles.length - 1][col];

        this.tiles.forEach(row => {
            let t2 = row[col];

            row[col] = temp;
            temp = t2;
        });
    }

    /**
     * move_marker - Moves the marker by
     * dx and dy
     *
     * @param  {number} dx x distance to move
     * @param  {number} dy y distance to move
     */
    move_marker(dx, dy) {
        this.marker_x = (this.marker_x + dx) % config.box_size;
        this.marker_y = (this.marker_y + dy) % config.box_size;
    }

    /**
     * get_tile_at_marker - Returns the tile under
     * the marker's current position
     *
     * @return {Tile}
     */
    get_tile_at_marker() {
        return this.tiles[this.marker_y][this.marker_x];
    }

    /**
     * get_pos_of_letter - Return the position
     * of a given letter (tile)
     *
     * @param  {string} letter letter to find
     * @return {array}         [x, y] pos, or [-1, -1] if not found
     */
    get_pos_of_letter(letter) {
        for (let y=0; y<this.tiles.length; y++) {
            for (let x=0; x<this.tiles.length; x++) {
                if (this.tiles[y][x].value === letter) {
                    return [x, y];
                }
            }
        }

        return [-1, -1];
    }

    /**
     * get_tile - Return a tile given letter
     *
     * @param  {string} letter letter to search
     * @return {Tile}         Tile with value letter
     */
    get_tile(letter) {
        let pos = this.get_pos_of_letter(letter);
        
        if (pos[0] !== -1) {
            return this.tiles[pos[1]][pos[0]];
        }

        return null;
    }

    /**
     * toString - Returns the string
     * representation of current tile space
     *
     * @return {string}
     */
    toString() {
        let returned = '';

        for (let row of this.tiles) {
            returned += row.map(x => x.toString()).join(' ') + '\n';
        }

        return returned;
    }
}

module.exports = Key;
