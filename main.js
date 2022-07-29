let track_index = 0;
let isPlaying = false;
let updateTimer;
let shuffle = false;

let track_name = document.querySelector("#track-name");
let track_artist = document.querySelector("#track-artist");
let track_art = document.querySelector("#track-art");

let playpause_btn = document.querySelector("#play_pause");
let previous_btn = document.querySelector("#previous-track");
let next_btn = document.querySelector("#next-track");
let shuffle_btn = document.querySelector("#shuffle-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
  
// Create the audio element for the player
let curr_track = document.createElement('audio');
let track_list = [
  {
    name: "Nigina",
    artist: "Janob Rasul",
    path: "Janob Rasul - Nigina.mp3"
  },
  {
    name: "Olti Yarim",
    artist: "Janob Rasul",
    album_image_small_jpg: "tory_lanez-shooters_500px.jpp",
    album_image_small_webp: "tory_lanez-shooters_500px.webp",
    album_image_big_jpg: "tory_lanez-shooters_1000px.jpg",
    album_image_big_webp: "tory_lanez-shooters_1000px.webp",
    path: "Janob Rasul - Olti Yarim.mp3"
  },
  {
    name: "san Garak",
    artist: "Sardor Mamadaliev",
    album_image_small_jpg: "little_kirk-weed_them_out_500px.jpg",
    album_image_small_webp: "little_kirk-weed_them_out_500px.webp",
    album_image_big_jpg: "little_kirk-weed_them_out_1000px.jpg",
    album_image_big_webp: "little_kirk-weed_them_out_1000px.webp",
    path: "Sardor_Mamadaliyev-San-garak_(uzhits.net).mp3"
  },
  {
    name: "Tarnov",
    artist: "Via Marokanda",
    album_image_small_jpg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrGNj_O40PcGXq-nVbqioxiTs9PALVLwIukYgSLSGy8tzM5UNHNJliCp_CCKZD4ZpzwTU&usqp=CAU",
    album_image_small_webp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrGNj_O40PcGXq-nVbqioxiTs9PALVLwIukYgSLSGy8tzM5UNHNJliCp_CCKZD4ZpzwTU&usqp=CAU",
    album_image_big_jpg: "pop_smoke-hello_1000px.jpg",
    album_image_big_webp: "data:image/jpeg;base64,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",
    path: "Via_Marokand_-_Tarnov_(uzhits.net).mp3"
  }
  
];

shuffle_btn.addEventListener("click", () => {
  if(shuffle === false){
    shuffle = true;
    document.querySelector(".fa-random").className += " active";
  }
  else{
    shuffle = false;
    removeActive()
    track_index = track_list.findIndex(x => x.path === curr_track.getAttribute("src"));
  }
})

playpause_btn.addEventListener("click", () => {
  playpauseTrack();
})

previous_btn.addEventListener("click", () => {
  prevTrack();
})

next_btn.addEventListener("click", () => {
  nextTrack();
})


function removeActive(){
  var current = document.querySelectorAll(".active");
  current[0].className = current[0].className.replace(" active", "");
}

function playpauseTrack() {
  if (!isPlaying) 
    playTrack();
  else 
    pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fas fa-pause"></i>';
}

function randomIndex(arr, excludeIndex){
  let indexes = Object.keys(arr); //get a list of indexes 
  indexes.splice(excludeIndex, 1); //remove the unwanted
  return indexes[Math.floor(Math.random() * indexes.length)]; //pick a new index
}

function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();

  // If shuffle is activated choose a random song without repeating
  if(shuffle){
    track_index = randomIndex(track_list, track_list.findIndex(x => x.path === curr_track.getAttribute("src")));
  }

  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  // Update details of the track
  track_art.style.backgroundImage = `linear-gradient(to bottom, transparent 0%, black), url(${track_list[track_index].album_image_small_webp})`;
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;

  track_name.classList.add('animate__animated', 'animate__fadeInUp');
  track_artist.classList.add('animate__animated', 'animate__fadeInUp');

  track_name.addEventListener('animationend', () => {
    track_name.classList.remove('animate__animated', 'animate__fadeInUp');
  });

  track_artist.addEventListener('animationend', () => {
    track_artist.classList.remove('animate__animated', 'animate__fadeInUp');
  });

  document.body.style.background = "#000000";
  document.body.style.background = `-webkit-radial-gradient(center, rgba(0, 0, 0, 0.4), #000000 90%), url(${track_list[track_index].album_image_big_webp})`;
  document.body.style.background = `-moz-radial-gradient(center, rgba(0, 0, 0, 0.4), #000000 90%), url(${track_list[track_index].album_image_big_webp})`;
  document.body.style.background = `radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4), #000000 90%), url(${track_list[track_index].album_image_big_webp})`;

  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);

  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);

}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  
  playpause_btn.innerHTML = '<i class="fa fa-play"></i>';
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length - 1;
    
  loadTrack(track_index);
  playTrack();
}

function nextTrack() {
  if (track_index < track_list.length - 1) 
    track_index += 1;
  else 
    track_index = 0;

  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);

  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


document.addEventListener("click", e => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]")
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return

  let currentDropdown
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]")
    currentDropdown.classList.toggle("active")
  }

  document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
    if (dropdown === currentDropdown) return
    dropdown.classList.remove("active")
  })
})

// Load the first track in the tracklist
loadTrack(track_index);