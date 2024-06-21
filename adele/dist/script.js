// DEFAULT CODE ////////////////////////
const BASE_URL = "https://lyric-api-403c0.firebaseio.com/";
const songList = document.querySelector("#song-list");
const lyricsPanel = document.querySelector("#lyrics-panel");
const album = {
  artist: "Adele",
  album: "25",
  tracks: [
    "Hello",
    "Send My Love (To Your New Lover)",
    "I Miss You",
    "When We Were Young",
    "Remedy",
    "Water Under the Bridge",
    "River Lea",
    "Love in the Dark",
    "Million Years Ago",
    "All I Ask",
    "Sweetest Devotion"
  ]
};

// WRITE YOUR CODE ////////////////////////
//forEach生成左欄的歌曲列表
album.tracks.forEach((track) => {
  const li = document.createElement("li");
  li.innerHTML = `<li>
        <a class="nav-link" href="#" role="tab">${track}</a>
      </li>`;

  songList.appendChild(li);
});

songList.addEventListener("click", (event) => {
  const activeItem = document.querySelector("#song-list .active");
  if (activeItem) {
    activeItem.classList.remove("active");
  }
  if (event.target.matches(".nav-link")) {
    event.target.classList.add("active");
    const song = event.target.innerText;
    axios
      .get(`${BASE_URL}Adele/${song}.json`)
      .then((response) => {
        const lyrics = response.data.lyrics;
      // 直接在這裡更新 lyricsPanel 的內容
        lyricsPanel.innerHTML = `
          <h3>${song}</h3>
          <pre>${lyrics}</pre>
          `;
      })
      .catch((error) => console.log(error));
  }
});