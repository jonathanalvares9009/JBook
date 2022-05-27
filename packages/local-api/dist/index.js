"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const serve = (port, filename, dir) => {
    console.log(`Serving ${filename} on port ${port}`);
    console.log(`Directory: ${dir}`);
};
exports.serve = serve;
