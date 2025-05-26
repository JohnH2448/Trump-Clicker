window.addEventListener('DOMContentLoaded', () => {
  let lastTime=0;
  let trumpScale=1;
  let mainHover=false;
  let osc=0;
  let tSMultiplier=1;
  let Cash = 200;
  let song=false;
  let summonSprites = ["Images/dollar_bill_1.png", "Images/dollar_bill_2.png", "Images/dollar_bill_3.png", "Images/dollar_bill_4.png", "Images/dollar_bill_5.png"];
  let Voters = 0;
  let voterCost = 100;
  let CPS=0;

  // Song Loop
  const sound = new Audio('Sounds/Song.mp3');
  sound.volume = 0.5;

  const trump = document.getElementById("mainButtonImage");
  const cash = document.getElementById('cash');
  const bButton = document.getElementsByClassName("bButton");
  const BuildingB1 = document.getElementById("BuildingB1");
  const voterCostElement = document.getElementById("voterCost");

  // Event Listeners
  trump.addEventListener("mouseenter", () => {
    mainHover=true;
    new Audio('Sounds/Hover.mp3').play();
  });

  trump.addEventListener("mouseleave", () => {
    mainHover=false;
  });

  for (let btn of bButton) {
    btn.addEventListener("mouseenter", () => {
      new Audio('Sounds/Hover.mp3').play();
    });
  }

  BuildingB1.addEventListener("click", () => {
    if (Cash >= voterCost) {  
      Cash -= voterCost;
      Voters++;
      console.log("Voters:", Voters);
      new Audio('Sounds/CashRegister.mp3').play();
      voterCost=100*Math.pow(1.1, Voters);
      voterCostElement.textContent = `${voterCost.toFixed(2)} Dollars`;
    }
  });

  trump.addEventListener("click", () => {
    tSMultiplier=tSMultiplier+0.15;
    Cash+=1;
    summonFall();
    new Audio('Sounds/Click.mp3').play();
    if (song==false) {
      //sound.play();
      song=true;
      sound.loop = true;
    }
  });

  function summonFall() {
    let spriteIndex = Math.floor(Math.random() * (summonSprites.length));
    console.log("spriteIndex", spriteIndex);
    const summon = document.createElement('img');
    document.getElementById('leftArea').appendChild(summon);
    summon.src = summonSprites[spriteIndex];
    summon.className = 'summonClass';
    const container = document.getElementById('leftArea');
    const LAwidth = container.offsetWidth;
    summon.style.left = `${Math.random() * LAwidth-25}px`
    summon.style.top = `${-50}px`
    Math.floor(Math.random() * 360) + 1;
    summon.style.transform = `rotate(${Math.floor(Math.random() * 360) + 1}deg)`;
    summon.randomRot = Math.floor(Math.random() * 241) - 120;;
    setTimeout(() => {
      summon.remove();
    }, 5000);
  }

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
    Cash+=(Voters*1)*delta;
    trump.style.transform = `scale(${trumpScale*tSMultiplier}) rotate(${(fluct1-0.5)*4}deg) translateY(${(fluct2-0.5)*6}px)`;
    cash.textContent = `$${Cash.toFixed(0)}`;

    // Debug
    
    // Summon Falling
    const summonedSprites = document.getElementsByClassName('summonClass');
    for (let sumn of summonedSprites) {
      let currentTop = parseFloat(sumn.style.top || '0');
      currentTop += 900 * delta;
      sumn.style.top = `${currentTop}px`;
      const transform = sumn.style.transform;
      let match = transform.match(/rotate\((-?\d+(?:\.\d+)?)deg\)/);
      let currentRot = match ? parseFloat(match[1]) : 0;
      currentRot += sumn.randomRot * delta;
      sumn.style.transform = `rotate(${currentRot}deg)`;
    }

    //summonFall();
    requestAnimationFrame(gameLoop);
  }
});