console.log("hey");

// abhi me koi backend use ni kr rha tu mjhe aoni hi directry me loclly jo songs hai folder me onkko yha lana hai target kr ke tu oskee le fetch api kr ke onko fetch kro ga me

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
// ye es le bnya varible take ham esko use kr ke bs only curnt song jis pr clik hua 1 hi br ose play kr ske bs
let currenntSong = new Audio();
currenntSong.addEventListener("timeupdate", () => {
  console.log("Time:", currenntSong.currentTime);
  console.log("Duration:", currenntSong.duration);
});
// play song function neche async me define kia haii bs osko ab yha bna rha ho me take jis pr clik kre vhi music play kre ok

const playMusic = (track, name) => {
  currenntSong.src = track;
  currenntSong.play();
  // jb jb library se song play kre tb play svg pause se chng ho oske le neche function oska bna kr oper se likha hai ok
  play.src = "pause.svg";
  // me chahta ho song ka name or timimg show krwana player me jb koi song run ho
  document.querySelector(".songinfo").innerHTML = name;
  document.querySelector(".playtime").innerHTML = "00:00/00:00";
};

// ab me js se song list ko target kr ke vha song ki list bnana chahta ho jo jo  hai mere ps tu oske le ye kro ga me
async function main() {
  // get list of all songs
  let songs = await getsong();
  console.log("Songs:", songs);

  // display all songs in play list
  let songUL = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];
  for (let song of songs) {
    let originalPath = song;
    // 1️⃣ decode %20 %5C etc
    song = decodeURIComponent(song);

    // 2️⃣ remove path ( / or \ )
    let cleanName = song.replace(/^.*[\\/]/, "");

    // 3️⃣ remove extension
    cleanName = cleanName.replace(".mp3", "");

    // 4️⃣ remove (Official Video) etc
    cleanName = cleanName.replace(/\(.*?\)/g, "").trim();

    // 5️⃣ agar dash ho to sirf pehla part lo
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
      currenntSong.pause(); // ✅ yahan pause() hoga
      play.src = "play.svg";
    }
  });

  // add listner for time update of songs events 
  // let currenntSong = new Audio();



}
main();
