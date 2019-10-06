"use strict";

require("core-js/modules/es.promise");

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || 3000;

async function main() {
  _app.default.listen(port, () => {
    console.log("Escuchando en el puerto ".concat(port));
  });
}

main();