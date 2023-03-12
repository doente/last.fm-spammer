const fetch = require('node-fetch');
const $ = require('chalk')
const config = require('./config.json');

console.clear()
console.log(`${$.magenta('[$$$$]')} Trash last.fm spammer by gu#0001`);

let success = 1
let failure = 1

async function scrobble() {
  const infos = await fetch("https://openscrobbler.com/api/v2/scrobble.php", {
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
      "cookie": config.openscrobbler_session,
    },
    "body": `artist%5B0%5D=${config.song.artist}&track%5B0%5D=${config.song.name}&album%5B0%5D=${config.song.album}&albumArtist%5B0%5D=&timestamp%5B0%5D=` + Date.now(),
    "method": "POST"
  })
  const status = await infos.status

  if (status == 200) {
    success++
    console.log(`${$.green('[+]')} Scrobble concluido ${$.green(config.song.name)} by ${$.green(config.song.artist)}`)
  }

  if (status == 429) {
    failure++
    console.log(`${$.red('[-]')} Rate limit`)
  }

  process.title = `Last.fm spammer by gu#0001 | Success: ${success} Failture: ${failure}`
}

setInterval(() => scrobble(), config.timeInMS)