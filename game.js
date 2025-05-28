window.addEventListener('DOMContentLoaded', () => {
  let lastTime=0;
  let trumpScale=1;
  let mainHover=false;
  let osc=0;
  let tSMultiplier=1;
  let Cash = 0;
  let song=false;
  let summonSprites = ["Images/dollar_bill_1.png", "Images/dollar_bill_2.png", "Images/dollar_bill_3.png", "Images/dollar_bill_4.png", "Images/dollar_bill_5.png"];
  let CPS=0;
  let cashUpdate = 0;

  // Format Number Function
  function formatNumber(num) {
    if (num >= 1e12) {
      return (num / 1e12).toFixed(2) + 'T';
    } else if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + 'B';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + 'M';
    } else {
        return num.toFixed(0);
    }
  }

  // Song Loop
  const sound = new Audio('Sounds/Song.mp3');
  sound.volume = 0.5;


  const BuildingB1 = document.getElementById("BuildingB1");
  const BuildingB2 = document.getElementById("BuildingB2");
  const BuildingB3 = document.getElementById("BuildingB3");
  const BuildingB4 = document.getElementById("BuildingB4");
  const BuildingB5 = document.getElementById("BuildingB5");
  const BuildingB6 = document.getElementById("BuildingB6");
  const trump = document.getElementById("mainButtonImage");
  const cash = document.getElementById('cash');
  const bButton = document.getElementsByClassName("bButton");
  const CPSElement = document.getElementById("CPS");

  // Building Elements
  let Voters = 0;
  let voterCost = 100;
  let memecoinCost= 2500;
  let Memecoins = 0;
  let golfCourseCost = 1562500;
  let DOGECuts = 0;
  let DOGECutCost = 62500;
  let GolfCourses = 0;
  let F16s = 0;
  let F16Cost= 39062500
  let QJs = 0;
  let QJCost = 976562500
  const voterCostElement = document.getElementById("voterCost");
  const memecoinCostElement = document.getElementById("memecoinCost");
  const DOGECutCostElement = document.getElementById("DOGECutCost");
  const golfCourseCostElement = document.getElementById("golfCourseCost");
  const F16CostElement = document.getElementById("F16Cost");
  const QJCostElement = document.getElementById("QJCost");
  const voterCountElement = document.getElementById("voterCount");
  const memecoinCountElement = document.getElementById("memecoinCount");
  const DOGECutCountElement = document.getElementById("DOGECutCount");
  const golfCourseCountElement = document.getElementById("golfCourseCount");
  const F16CountElement = document.getElementById("F16Count");
  const QJCountElement = document.getElementById("QJCount");

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

  // Buildings
  BuildingB1.addEventListener("click", () => {
    if (Cash >= voterCost) {  
      Cash -= voterCost;
      Voters++;
      console.log("Voters:", Voters);
      new Audio('Sounds/CashRegister.mp3').play();
      voterCost=Math.round(100*Math.pow(1.2, Voters));
      voterCostElement.textContent = `${formatNumber(voterCost)} Dollars`;
      voterCountElement.textContent = `${Voters}`;
    }
  });

  BuildingB2.addEventListener("click", () => {
    if (Cash >= memecoinCost) {  
      Cash -= memecoinCost;
      Memecoins++;
      console.log("Memecoins:", Memecoins);
      new Audio('Sounds/CashRegister.mp3').play();
      memecoinCost=Math.round(2500*Math.pow(1.2, Memecoins));
      memecoinCostElement.textContent = `${formatNumber(memecoinCost)} Dollars`;
      memecoinCountElement.textContent = `${Memecoins}`;
    }
  });

  BuildingB3.addEventListener("click", () => {
    if (Cash >= DOGECutCost) {  
      Cash -= DOGECutCost;
      DOGECuts++;
      console.log("DOGE Cuts:", DOGECuts);
      new Audio('Sounds/CashRegister.mp3').play();
      DOGECutCost=Math.round(62500*Math.pow(1.2, DOGECuts));
      DOGECutCostElement.textContent = `${formatNumber(DOGECutCost)} Dollars`;
      DOGECutCountElement.textContent = `${DOGECuts}`;
    }
  });

  BuildingB4.addEventListener("click", () => {
    if (Cash >= golfCourseCost) {  
      Cash -= golfCourseCost;
      GolfCourses++;
      console.log("Golf Courses:", GolfCourses);
      new Audio('Sounds/CashRegister.mp3').play();
      golfCourseCost=Math.round(1562500*Math.pow(1.2, GolfCourses));
      golfCourseCostElement.textContent = `${formatNumber(golfCourseCost)} Dollars`;
      golfCourseCountElement.textContent = `${GolfCourses}`;
    }
  });

  BuildingB5.addEventListener("click", () => {
    if (Cash >= F16Cost) {  
      Cash -= F16Cost;
      F16s++;
      console.log("F-16s:", F16s);
      new Audio('Sounds/CashRegister.mp3').play();
      F16Cost=Math.round(39062500*Math.pow(1.2, F16s));
      F16CostElement.textContent = `${formatNumber(F16Cost)} Dollars`;
      F16CountElement.textContent = `${F16s}`;
    }
  });

  BuildingB6.addEventListener("click", () => {
    if (Cash >= QJCost) {  
      Cash -= QJCost;
      QJs++;
      console.log("Qatari Jets:", QJs);
      new Audio('Sounds/CashRegister.mp3').play();
      QJCost=Math.round(976562500*Math.pow(1.2, QJs));
      QJCostElement.textContent = `${formatNumber(QJCost)} Dollars`;
      QJCountElement.textContent = `${QJs}`;
    }
  });

  // Done
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
    cashUpdate += 100*delta
    CPS = (Voters*1+Memecoins*20+DOGECuts*400+GolfCourses*8000+F16s*160000+3200000*QJs)
    if (cashUpdate >= 10) {
      Cash+=CPS/10;
      cashUpdate = 0;
    }
    trump.style.transform = `scale(${trumpScale*tSMultiplier}) rotate(${(fluct1-0.5)*4}deg) translateY(${(fluct2-0.5)*6}px)`;
    cash.textContent = `$${formatNumber(Cash)}`;
    CPSElement.textContent = `CPS: ${formatNumber(CPS)}`;
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