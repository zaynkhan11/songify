// ye golobalu let kia hamne take ham esko apne function me jb chahe use kr ske bghr let kea hue ok
let songs;
// abhi me koi backend use ni kr rha tu mjhe aoni hi directry me loclly jo songs hai folder me onkko yha lana hai target kr ke tu oskee le fetch api kr ke onko fetch kro ga me
// ye es le bnya varible take ham esko use kr ke bs only curnt song jis pr clik hua 1 hi br ose play kr ske bs
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  let minutes = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);

  // always 2 digits
  minutes = String(minutes).padStart(2, "0");
  secs = String(secs).padStart(2, "0");

  return `${minutes}:${secs}`;
}
// ab me yha flder yha lgane ka mean ke songs jo hai voh folder me se fetch ho kr load hoge agr e alug alug folders album bana do tu jis pr clik kre ge ta jo chahe osi folder ke song ham load krwa skte hai
async function getsong(folder) {
  // yha me local folder se  fecth kr rha ho data song ka or console kr ke dkeh rha ho ke ye hota hia ya ni
  // ab jaise esme flder ps kia tu ab esko songs ki jaga chnging kre ge or esko 1 template litral me dale ge or me  ye songs wala jo neche likha hai ye bhi kam kr rha hia fetch kr rha hai songs but ye 1 hu jaga se kr skta alug alug jaga se ni tu eska concpt me commnt out kr rha ho or dosra wala neche likh rha ho folder wala take dono mjhe ydd rhe ok

  // mean me yha folder de kr ye krna cha rha ho ke mere songs jis folder se chaho fetch kr sko ok
  // let a = await fetch("http://127.0.0.1:3000/songs/");
  // GitHub Pages par directory listing nahi hoti, isliye songs/library.json se songs le rahe hain
  let res = await fetch("songs/library.json");
  let library = await res.json();
  let albumId = folder.replace(/^songs\//, "");
  let album = library.albums.find((al) => al.id === albumId);
  let songsArray = album ? album.tracks.slice() : [];

  // display all songs in library
  let songUL = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];
  songUL.innerHTML = "";
  for (let song of songsArray) {
    let originalPath = song;
    //  decode %20 %5C etc
    song = decodeURIComponent(song);

    //  remove path ( / or \ )
    let cleanName = song.replace(/^.*[\\/]/, "");

    // remove extension
    cleanName = cleanName.replace(".mp3", "");

    //  remove (Official Video) etc
    cleanName = cleanName.replace(/\(.*?\)/g, "").trim();

    // agar dash ho to sirf pehla part lo
    if (cleanName.includes("-")) {
      cleanName = cleanName.split("-")[0].trim();
    }
    songUL.innerHTML += `
  <li data-song="${originalPath}" data-name="${cleanName}">

    <img class="invert" src="images/music.svg" alt="" />
    <div class="infoo">
      <div>${cleanName}</div>
      <div class="siz">Zayn khan</div>
    </div>
    <div class="playnow">
      <span>Play Now</span>
      <img class="invert" src="images/play.svg" alt="" />
    </div>
  </li>`;

    // songUL.innerHTML += `<li>${cleanName}</li>`;
  }
  //  website r kahi bhi clik kr rha tha tu song play ho rha tha
  // document.addEventListener("click", () => {
  //   var audio = new Audio(songs[4]); // play first song
  //   audio.play();
  // });

  // me chahta ho jis song pr clik kro vhi play ho oske le mean yha ham addd event listner to each song kr rhe hia ok
  //yha hum event listner ko hr song se attach kr rhe hai
  Array.from(
    document.querySelector(".songlist").getElementsByTagName("li"),
  ).forEach((e) => {
    e.addEventListener("click", () => {
      let actualSong = e.getAttribute("data-song"); // original filename
      let displayName = e.getAttribute("data-name"); // ✅ song name

      console.log("Playing:", displayName); // ab console me naam aayega
      playMusic(actualSong, displayName);
    });
  });

  // update the global variable too
  songs = songsArray;

  // return the array
  return songsArray;
}
// async fnction khbhi value return ni krta direct voh hame promise deta hai tu osme se nikalne ke le value ham .then use krte hai ok/
// eska mean getsong se jo output mili mean songs ose console me show krwa rhe hai ok

// getsong().then((songs) => {
//   console.log(songs);

// });
// song ko play krna hai first ko tu oske le ye likho ga me

// async function main(){
//     let songs = await getsong();
//     console.log("Songs:", songs);

//     // user interaction required
//     // es se ye hoga ke ham pure page pr addevent lga rhe hia mean user jha bhi clik kre ga song play ho jae ga
//     // agr bustion se krna hota tu getelemntby id ya class se kr ke oska name likhte then lagtate event listner ok
//     document.addEventListener("click", () => {
//         // currentSong.play()
//             var audio = new Audio(songs[3]);
//             audio.play();

//     })
// }

// main();
let currenntSong = new Audio();

// jis song pr clik kro voh play hoor duration kia hai or kitne time chul gya osko dekhne or show krnwane ke le ye hai code
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  let minutes = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);

  // always 2 digits
  minutes = String(minutes).padStart(2, "0");
  secs = String(secs).padStart(2, "0");

  return `${minutes}:${secs}`;
}

// play song function neche async me define kia haii bs osko ab yha bna rha ho me take jis pr clik kre vhi music play kre ok

const playMusic = (track, name, pause = false) => {
  currenntSong.src = track;
  // agr me chahta ho ke jaise me website open kro ya load kro tu first song play bar me automatic load ho jae or vhi se ose chala lo agr chaho tu vrna jo dil ho ospr clik kr ke playbar me load krlo ose ok
  if (!pause) {
    currenntSong.play();
  }

  // jb jb library se song play kre tb play svg pause se chng ho oske le neche function oska bna kr oper se likha hai ok
  play.src = "images/pause.svg";
  // me chahta ho song ka name or timimg show krwana player me jb koi song run ho
  document.querySelector(".songinfo").innerHTML = name;
  document.querySelector(".playtime").innerHTML = "00:00/00:00";
};
async function displayAlbums() {
  // albums bhi library.json se aa rahe hain (directory listing ki jaga)
  let a = await fetch("songs/library.json");
  let library = await a.json();
  let cardContainer = document.querySelector(".card-container");
  library.albums.forEach((album) => {
    // inner html ki jaga insert adjacent html use ki take jo event kisnter lage hai cards pr voh thek se kam kre ok
    cardContainer.insertAdjacentHTML(
      "beforeend",
      `<div  data-folder="${album.id}" class="cards">
              <div class="playbuton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-encore-id="icon"
                  role="img"
                  aria-hidden="true"
                  class="e-91000-icon e-91000-baseline"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"
                  ></path>
                </svg>
              </div>
              <img src="${album.cover}" alt="" />
              <h2>${album.title}</h2>
              <p>${album.description}</p>
            </div>`,
    );
  });
}
// ab me js se song list ko target kr ke vha song ki list bnana chahta ho jo jo  hai mere ps tu oske le ye kro ga me
async function main() {
  // get list of all songs songs varible ham yha diirect use kr rhe hai ku ke hamne se globalyy let kia hua hai phle hi function se bhar
  // opr mene folder ke le function bana lia or ab me yha neche bta oga kis folder se fetch krne hai yha mene get songs me songs/ncs likha tu mean jo mera ncs me songs hai voh sb yha load ho jae ge get hokr ok
  songs = await getsong("songs/ncs");
  console.log("Songs:", songs);
  // agr me chahta ho ke jaise me website open kro ya load kro tu first song play bar me automatic load ho jae or vhi se ose chala lo agr chaho tu vrna jo dil ho ospr clik kr ke playbar me load krlo ose ok
  songs = await getsong("songs/ncs"); // songs now contains array
  if (songs.length > 0) {
    let firstSongPath = songs[0];
    let cleanName = decodeURIComponent(firstSongPath)
      .replace(/^.*[\\/]/, "")
      .replace(".mp3", "")
      .replace(/\(.*?\)/g, "")
      .trim();

    // load first song but don't auto-play
    playMusic(firstSongPath, cleanName, true);

    // show play icon instead of pause
    play.src = "images/play.svg";

    //  update duration once metadata is loaded
    currenntSong.addEventListener("loadedmetadata", () => {
      let total = formatTime(currenntSong.duration);
      document.querySelector(".playtime").innerHTML = `00:00 / ${total}`;
    });

    // display krne ke all albums page pr diplay jo functin bnaya hai osko yha call kreo ge ok
    displayAlbums();
  }

  // ADD all albums on page dynamically mean ham bs folder bnae ge osme songs de ge voh dynamically khd hi load hokr show ho jae gi website kis screen pr

  // add event listner for ,play and pause svgs.
  play.addEventListener("click", () => {
    if (currenntSong.paused) {
      currenntSong.play();
      play.src = "images/pause.svg";
    } else {
      currenntSong.pause(); //  yahan pause() hoga
      play.src = "images/play.svg";
    }
  });
  // varible jo seekbar or circle ko target kre ge
  const progressBar = document.querySelector(".seekbar");
  const circle = document.querySelector(".circle");

  // circle already moving with timeupdate (tumhara existing code)
  // add listner for time update of songs events
  currenntSong.addEventListener("timeupdate", () => {
    // ab ye code es le hai ke jo seekbar me circle hai voh bhi time ke hisaab se age chale or song ko jha se chaho age peche ya os p clik kr ke osi time se strt kr sko oske le ye code
    let percent = (currenntSong.currentTime / currenntSong.duration) * 100;
    circle.style.left = percent + "%";
    let current = formatTime(currenntSong.currentTime);
    let total = formatTime(currenntSong.duration);
    document.querySelector(".playtime").innerHTML = `${current} / ${total}`;
  });

  // 👇 add click event on progress bar
  progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect(); // get position of seekbar
    const clickX = e.clientX - rect.left; // click relative to progress bar
    const width = rect.width;

    // calculate new time
    const newTime = (clickX / width) * currenntSong.duration;
    currenntSong.currentTime = newTime; // update audio
    circle.style.left = (clickX / width) * 100 + "%"; // move circle
  });
  // ab seekbar tu song ke time ke sth sth chl rha hai but me ye chahtta ho jha pr clik kro seek br pr vhi se song run ho jae ok

  // Add event listner for hamburger
  const img = document.querySelector(".Trending-songs img");
  const menu = document.getElementById("lefto");

  // OPEN menu
  img.addEventListener("click", (e) => {
    menu.style.left = "0";
    e.stopPropagation(); // important 🔥
  });

  // CLOSE when clicking outside
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && e.target !== img) {
      menu.style.left = "-140%";
    }
  });
  // ADD EVENT LISTNER FOR FORWARD AND NEXT BUTTON svgs
  // phle index ko 0 ke equal kia then event listner lgya then lgic bnae eske le jo index ko calculate kre ga

  let currentIndex = 0;

  next.addEventListener("click", () => {
    // next index
    currentIndex++;
    // ye if function bnaya ke agr index equal ya bari hai songs.length se  tu again 0 mean starting sestrt ho jae gaessesb ki index hame ppta lag jae gi
    if (currentIndex >= songs.length) {
      currentIndex = 0; // loop back
    }

    // set next song
    let songPath = songs[currentIndex];

    // clean name same tarah jaise tum pehle kar rahe ho
    let cleanName = decodeURIComponent(songPath)
      .replace(/^.*[\\/]/, "")
      .replace(".mp3", "")
      .replace(/\(.*?\)/g, "")
      .trim();

    // 🔥 split on both "-" and "|"
    cleanName = cleanName.split(/[-|]/)[0].trim();

    // 🔥 MAIN FIX

    playMusic(songPath, cleanName);
  });

  let currentIndex1 = 0;

  previous.addEventListener("click", () => {
    // previous index
    currentIndex1--;
    // ye if function bnaya ke agr index equal ya bari hai songs.length se  tu again 0 mean starting sestrt ho jae gaessesb ki index hame ppta lag jae gi
    if (currentIndex1 < 0) {
      currentIndex1 = songs.length - 1; // loop back
    }

    // set next song
    let songPath = songs[currentIndex1];

    // clean name same tarah jaise tum pehle kar rahe ho
    let cleanName = decodeURIComponent(songPath)
      .replace(/^.*[\\/]/, "")
      .replace(".mp3", "")
      .replace(/\(.*?\)/g, "")
      .trim();

    // 🔥 split on both "-" and "|"
    cleanName = cleanName.split(/[-|]/)[0].trim();

    // 🔥 MAIN FIX

    playMusic(songPath, cleanName);
  });

  // ADD event listner for voulmerange
  // ye krne se ham jb slide kre ge tu oski base pr value mile gi ke kha pr volume ki kia value hai
  document
    .querySelector(".rangvlm")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      console.log("Setting volume to", e.target.value, "/100");
      // ab yha slider ke sath music voulme ko link kr rhe hai ham
      currenntSong.volume = parseInt(e.target.value) / 100;
    });
  // load the playlist on which card user click
  // ab esko array me bnae ge ku ke hame collection return kre ga ye ok  and ku ke for each hame colllection bhi ni deta esle array lgate hai ok
  const cardContainer = document.querySelector(".card-container");
  // awat function bnaya oske le async bnanya esko
  cardContainer.addEventListener("click", async (event) => {
    // Check if the click was on a card or inside a card
    const card = event.target.closest(".cards");
    if (!card) return; // clicked outside a card

    const folderName = card.dataset.folder;
   songs = await getsong(`songs/${folderName}`);
    console.log("Songs loaded from album:", folderName);
    // ✅ PLAY FIRST SONG AUTOMATICALLY
    if (songs.length > 0) {
      let firstSongPath = songs[0];
      let cleanName = decodeURIComponent(firstSongPath)
        .replace(/^.*[\\/]/, "")
        .replace(".mp3", "")
        .replace(/\(.*?\)/g, "")
        .trim();

      playMusic(firstSongPath, cleanName); // automatically play

      // reset currentIndex for next/previous buttons
      currentIndex = 0;
      currentIndex1 = 0;
    }
  });
}
main();
