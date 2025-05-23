let lastTime=0;
let trumpScale=1;
let mainHover=false;
let osc=0;
let tSMultiplier=1;
let Cash = 0;
let song=false;

// Song Loop
const sound = new Audio('Song.mp3');
sound.volume = 0.5;

const trump = document.getElementById("mainButtonImage");
const cash = document.getElementById('cash');
const bButton = document.getElementsByClassName("bButton");

// Event Listeners
trump.addEventListener("mouseenter", () => {
  mainHover=true;
});

trump.addEventListener("mouseleave", () => {
  mainHover=false;
});

for (let btn of bButton) {
  btn.addEventListener("mouseenter", () => {
    new Audio('Hover.mp3').play();
  });
}

trump.addEventListener("click", () => {
  tSMultiplier=tSMultiplier+0.15;
  Cash+=1;
  new Audio('Click.mp3').play();
  if (song==false)
    //sound.play();
    song=true;
    sound.loop = true;
});

// Game Loop Start
requestAnimationFrame(gameLoop);

function gameLoop(time) {
  // Delta Time
  const delta = (time - lastTime) / 1000;
  lastTime = time;

  // Reduce tSMultiplier
  if (tSMultiplier > 1)
    tSMultiplier = tSMultiplier-delta*tSMultiplier;
  if (tSMultiplier > 0.995 && tSMultiplier < 1.005)
    tSMultiplier = 1;

  // Oscillating Movement
  osc=osc+delta
  fluct1=Math.sin(osc)/2+0.5
  fluct2=Math.sin(osc*4)/2+0.5

  // Hover
  if (trumpScale <= 1.05 && mainHover==true)
    trumpScale = trumpScale+delta;
  if (trumpScale > 1 && mainHover==false)
    trumpScale = trumpScale-delta;

  // Updates
  trump.style.transform = `scale(${trumpScale*tSMultiplier}) rotate(${(fluct1-0.5)*4}deg) translateY(${(fluct2-0.5)*6}px)`;
  cash.textContent = Cash;

  // Debug
  console.log(trumpScale)
  console.log(time)
  console.log(mainHover)

  requestAnimationFrame(gameLoop);
}