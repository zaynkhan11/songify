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

async function getsong() {
  // yha me local folder se  fecth kr rha ho data song ka or console kr ke dkeh rha ho ke ye hota hia ya ni
  let a = await fetch("http://127.0.0.1:3000/songs/");
  let response = await a.text();
  // console.log(response)
  // yha 1 js se div bnya jisme html fil hogi jo repnose se mile gi
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];

  // oly href wale songs ko nikalne ke le ye loop bnaya ke onlu vh song wali kine mile jinme href me song bhi hai oske elawa fzol wali namile  ok
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      // ye mjhe jo link de ga songs ka osme se split kr ke song ke bd wala shoe kre ga link but mene bs name krwana hai show tu oske le age dkho code hai smjho jao ok mean ye ab 5C ke bd wali chse url ki show kre ga ok
      let vb = songs.push(element.href);
    }
  }
  return songs;
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
  play.src = "pause.svg";
  // me chahta ho song ka name or timimg show krwana player me jb koi song run ho
  document.querySelector(".songinfo").innerHTML = name;
  document.querySelector(".playtime").innerHTML = "00:00/00:00";
};

// ab me js se song list ko target kr ke vha song ki list bnana chahta ho jo jo  hai mere ps tu oske le ye kro ga me
async function main() {
  // get list of all songs songs varible ham yha diirect use kr rhe hai ku ke hamne se globalyy let kia hua hai phle hi function se bhar
  songs = await getsong();
  console.log("Songs:", songs);
  // agr me chahta ho ke jaise me website open kro ya load kro tu first song play bar me automatic load ho jae or vhi se ose chala lo agr chaho tu vrna jo dil ho ospr clik kr ke playbar me load krlo ose ok
  let firstSongPath = songs[0];
  let cleanName = decodeURIComponent(firstSongPath)
    .replace(/^.*[\\/]/, "")
    .replace(".mp3", "")
    .replace(/\(.*?\)/g, "")
    .trim();

  // load first song but don't auto-play
  playMusic(firstSongPath, cleanName, true);

  // show play icon instead of pause
  play.src = "play.svg";

  //  update duration once metadata is loaded
  currenntSong.addEventListener("loadedmetadata", () => {
    let total = formatTime(currenntSong.duration);
    document.querySelector(".playtime").innerHTML = `00:00 / ${total}`;
  });

  // display all songs in library
  let songUL = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];
  for (let song of songs) {
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

    <img class="invert" src="music.svg" alt="" />
    <div class="infoo">
      <div>${cleanName}</div>
      <div class="siz">Zayn khan</div>
    </div>
    <div class="playnow">
      <span>Play Now</span>
      <img class="invert" src="play.svg" alt="" />
    </div>
  </li>`;

    // songUL.innerHTML += `<li>${cleanName}</li>`;
  }
  //  website r kahi bhi clik kr rha tha tu song play ho rha tha
  // document.addEventListener("click", () => {
  //   var audio = new Audio(songs[4]); // play first song
  //   audio.play();
  // });

  // me chahta ho jis song pr clik kro vhi play ho oske le
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
  // add event listner for ,play and pause svgs.
  play.addEventListener("click", () => {
    if (currenntSong.paused) {
      currenntSong.play();
      play.src = "pause.svg";
    } else {
      currenntSong.pause(); //  yahan pause() hoga
      play.src = "play.svg";
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
  document.querySelector(".rangvlm").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
    console.log("Setting volume to",e.target.value,"/100")
    // ab yha slider ke sath music voulme ko link kr rhe hai ham
    currenntSong.volume=parseInt(e.target.value)/100
    
  })
 
}
main();
