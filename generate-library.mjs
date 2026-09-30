// Usage: node generate-library.mjs
// songs/ ke folders scan karke songs/library.json banata hai.
// GitHub Pages par directory listing nahi hoti, isliye website ye file parhti hai.
// Jab bhi naya folder/song add karo, ye dobara chalao aur commit karo.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SONGS = path.resolve("songs");
const enc = (...p) => p.map((s) => encodeURIComponent(s).replace(/'/g, "%27")).join("/");
const COVER_ORDER = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

const albums = [];
const dirs = (await readdir(SONGS, { withFileTypes: true })).filter((d) => d.isDirectory());

for (const d of dirs.sort((a, b) => a.name.localeCompare(b.name))) {
  const files = await readdir(path.join(SONGS, d.name));
  const mp3 = files.filter((f) => f.toLowerCase().endsWith(".mp3")).sort();
  if (!mp3.length) continue;

  let info = {};
  try {
    info = JSON.parse(await readFile(path.join(SONGS, d.name, "info.json"), "utf8"));
  } catch {}

  const covers = files
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort((a, b) => {
      const ca = /^cover\./i.test(a) ? 0 : 1, cb = /^cover\./i.test(b) ? 0 : 1;
      if (ca !== cb) return ca - cb;
      return COVER_ORDER.indexOf(path.extname(a).toLowerCase()) - COVER_ORDER.indexOf(path.extname(b).toLowerCase());
    });

  albums.push({
    id: d.name,
    title: info.title || d.name,
    description: info.description || "",
    cover: covers[0] ? "songs/" + enc(d.name, covers[0]) : "images/card1.jpg",
    tracks: mp3.map((f) => "songs/" + enc(d.name, f)),
  });
}

await writeFile(path.join(SONGS, "library.json"), JSON.stringify({ albums }, null, 2) + "\n");
console.log(`library.json ban gayi: ${albums.length} albums, ${albums.reduce((n, a) => n + a.tracks.length, 0)} songs`);
