'use strict';

const config = require('./config.js');

/**
 * Tile class, represents a singular tile
 * in a given key.
 */
class Tile {
    /**
     * constructor - Create a new tile object
     *
     * @param  {string} value Letter value of the tile (ie 'a' or '_')
     */
    constructor(value) {
        this.value = value;

        this.dx = config.alphabet.indexOf(value) % config.box_size;
        this.dy = Math.floor(config.alphabet.indexOf(value) / config.box_size);
    }

    /**
     * toString - String representation
     *
     * @return {string}
     */
    toString() {
        return this.value;
    }
}

module.exports = Tile;
