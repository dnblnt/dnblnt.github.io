import { mkdir, writeFile } from 'node:fs/promises'

const get = async (url) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000), headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' } })
  if (!response.ok) throw new Error(`${response.status}: ${url}`)
  return response
}
await mkdir('public/fonts', { recursive: true })
await mkdir('public/work', { recursive: true })
const css = await (await get('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans+Condensed:wght@600;700&display=swap')).text()
const fontFiles = []
for (const [, block] of css.matchAll(/\/\* latin \*\/\s*@font-face\s*\{([\s\S]*?)\}/g)) {
  const family = block.match(/font-family:\s*'([^']+)'/)[1]
  const weight = block.match(/font-weight:\s*(\d+)/)[1]
  const url = block.match(/url\(([^)]+)\)/)[1]
  const filename = `${family.includes('Mono') ? 'plex-mono' : 'plex-condensed'}-${weight}.woff2`
  await writeFile(`public/fonts/${filename}`, Buffer.from(await (await get(url)).arrayBuffer()))
  fontFiles.push(filename)
}
if (fontFiles.length !== 5) throw new Error(`Expected five fonts, received ${fontFiles.length}`)
console.log(`Downloaded ${fontFiles.length} self-hosted font files.`)
await writeFile('public/fonts/OFL.txt', await (await get('https://raw.githubusercontent.com/IBM/plex/master/LICENSE.txt')).text())

const games = [
  ['viewfinder', 1382070], ['shots-fired', 650120], ['goblin-stone', 1521970],
  ['political-animals', 458630], ['academia', 672630], ['wild-season', 328220],
]
const sources = await Promise.all(games.map(async ([slug, id]) => {
  const details = await (await get(`https://store.steampowered.com/api/appdetails?appids=${id}&l=english`)).json()
  const header = details[id]?.data?.header_image
  if (!header) throw new Error(`No official artwork available for ${slug}`)
  const preferred = header.replace(/header\.jpg(?:\?.*)?$/, 'capsule_616x353.jpg')
  let response
  let source = preferred
  try { response = await get(preferred) } catch { source = header; response = await get(header) }
  await writeFile(`public/work/${slug}.jpg`, Buffer.from(await response.arrayBuffer()))
  console.log(`Downloaded official ${slug} artwork.`)
  return { slug, source, store: `https://store.steampowered.com/app/${id}/` }
}))
await writeFile('public/work/sources.json', `${JSON.stringify(sources, null, 2)}\n`)
