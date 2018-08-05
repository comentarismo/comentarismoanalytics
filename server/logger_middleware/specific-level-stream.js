var bunyan  = require('bunyan');
var safeCycles = bunyan.safeCycles;

module.exports = class SpecificLevelStream {
  constructor(levels, stream) {
    this.levels = {};

    levels.forEach((level) => {
      this.levels[bunyan.resolveLevel[level]] = true;
    });

    this.stream = stream;
  }

  write(rec) {
    if (this.levels[rec.level] !== undefined) {
      this.stream.write(
        `${JSON.stringify(rec, safeCycles())} \n`
      );
    }
  }
}
