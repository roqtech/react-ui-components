const esbuild = require("esbuild");
const {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} = require("fs");
const { join } = require("path")

const dist = join(process.cwd(), "dist");

if (!existsSync(dist)) {
  mkdirSync(dist);
}

const entryPoints = readdirSync(join(process.cwd(), "src"))
  // .filter(
  //   (file) =>
  //     !file.endsWith(".ts") &&
  //     statSync(join(process.cwd(), "src", file)).isFile()
  // )
  .map((file) => `src/${file}`);

// esm output bundles with code splitting
// esbuild
//   .build({
//     entryPoints,
//     outdir: "dist/esm",
//     bundle: true,
//     sourcemap: false,
//     minify: true,
//     splitting: true,
//     format: "esm",
//     define: { global: "window" },
//     platform: "node",
//     target: ["node16"],
//   })
//   .catch(() => process.exit(1));

// cjs output bundle
esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/cjs/index.cjs",
    bundle: true,
    sourcemap: false,
    minify: true,
    platform: "node",
    target: ["node16"],
  })
  .catch(() => process.exit(1));

// an entry file for cjs at the root of the bundle
// writeFileSync(join(dist, "index.js"), "export * from './esm/index.js';");

// an entry file for esm at the root of the bundle
writeFileSync(
  join(dist, "index.cjs"),
  "module.exports = require('./cjs/index.cjs');"
);