async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");

  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

async function main()
{
        let songs = await getSongs()
        console.log(songs)
        let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
        for (const song of songs) {
            songUL.innerHTML = songUL.innerHTML+`
            
            
            <li style="display: flex; align-items: center; gap: 40px; flex-direction: row;     width: 100%;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <img class="invert" src="music.svg" alt="">
                  <div class="info">
                    <div>${song.replaceAll("%20"," ")}</div>
                    <div>Vishnu</div>
                  </div>
                </div>
                <div class="playNow" style="display: flex; align-items: center; gap: 10px;">
                  <span>Play Now</span>
                  <img src="play1.svg" alt="" class="invert">
                </div>
              
            
            
            
            
            
            
            
            
            
            </li>`;

            
        }
        var audio = new Audio(songs[0]);
        audio.play();

        audio.addEventListener("loadeddata",()=>{
            // let duration = audio.duration;
            console.log(audio.duration,audio.currentSrc,audio.currentTime);

        });

}
main();