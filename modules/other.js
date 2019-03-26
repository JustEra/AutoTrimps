MODULES["other"] = {};
MODULES["other"].enableRoboTrimpSpam = true;
var prestraid=!1,dprestraid=!1,failpraid=!1,dfailpraid=!1,bwraided=!1,dbwraided=!1,failbwraid=!1,dfailbwraid=!1,perked=!1,prestraidon=!1,dprestraidon=!1,mapbought=!1,dmapbought=!1,bwraidon=!1,dbwraidon=!1,presteps=null,minMaxMapCost,fMap,pMap,shouldFarmFrags=!1,praidDone=!1;
function armydeath(){if(game.global.mapsActive)return!1;var e=game.global.lastClearedCell+1,l=game.global.gridArray[e].attack*dailyModifiers.empower.getMult(game.global.dailyChallenge.empower.strength,game.global.dailyChallenge.empower.stacks),a=game.global.soldierHealth;"Ice"==getEmpowerment()&&(l*=game.empowerments.Ice.getCombatModifier());var g=game.global.soldierCurrentBlock;return 3==game.global.formation?g/=4:"0"!=game.global.formation&&(g*=2),g>game.global.gridArray[e].attack?l*=getPierceAmt():l-=g*(1-getPierceAmt()),"Daily"==game.global.challengeActive&&void 0!==game.global.dailyChallenge.crits&&(l*=dailyModifiers.crits.getMult(game.global.dailyChallenge.crits.strength)),void 0!==game.global.dailyChallenge.bogged&&(a-=game.global.soldierHealthMax*dailyModifiers.bogged.getMult(game.global.dailyChallenge.bogged.strength)),void 0!==game.global.dailyChallenge.plague&&(a-=game.global.soldierHealthMax*dailyModifiers.plague.getMult(game.global.dailyChallenge.plague.strength,game.global.dailyChallenge.plague.stacks)),"Electricity"==game.global.challengeActive&&(a-=game.global.soldierHealth-=game.global.soldierHealthMax*(.1*game.challenges.Electricity.stacks)),"corruptCrit"==game.global.gridArray[e].corrupted?l*=5:"healthyCrit"==game.global.gridArray[e].corrupted?l*=7:"corruptBleed"==game.global.gridArray[e].corrupted?a*=.8:"healthyBleed"==game.global.gridArray[e].corrupted&&(a*=.7),(a-=l)<=1e3}
function autoRoboTrimp(){if(!(0<game.global.roboTrimpCooldown)&&game.global.roboTrimpLevel){var a=parseInt(getPageSetting("AutoRoboTrimp"));0==a||game.global.world>=a&&!game.global.useShriek&&(magnetoShriek(),MODULES.other.enableRoboTrimpSpam&&debug("Activated Robotrimp MagnetoShriek Ability @ z"+game.global.world,"graphs","*podcast"))}}
function isBelowThreshold(a){return a!=game.global.world}
function buyWeps(){if(!((getPageSetting('BuyWeaponsNew')==1)||(getPageSetting('BuyWeaponsNew')==3)))return;preBuy(),game.global.buyAmt=getPageSetting('gearamounttobuy'),game.equipment.Dagger.level<getPageSetting('CapEquip2')&&canAffordBuilding('Dagger',null,null,!0)&&buyEquipment('Dagger',!0,!0),game.equipment.Mace.level<getPageSetting('CapEquip2')&&canAffordBuilding('Mace',null,null,!0)&&buyEquipment('Mace',!0,!0),game.equipment.Polearm.level<getPageSetting('CapEquip2')&&canAffordBuilding('Polearm',null,null,!0)&&buyEquipment('Polearm',!0,!0),game.equipment.Battleaxe.level<getPageSetting('CapEquip2')&&canAffordBuilding('Battleaxe',null,null,!0)&&buyEquipment('Battleaxe',!0,!0),game.equipment.Greatsword.level<getPageSetting('CapEquip2')&&canAffordBuilding('Greatsword',null,null,!0)&&buyEquipment('Greatsword',!0,!0),game.equipment.Arbalest.level<getPageSetting('CapEquip2')&&canAffordBuilding('Arbalest',null,null,!0)&&buyEquipment('Arbalest',!0,!0),postBuy()}
function buyArms(){if(!((getPageSetting('BuyArmorNew')==1)||(getPageSetting('BuyArmorNew')==3)))return;preBuy(),game.global.buyAmt=10,game.equipment.Shield.level<getPageSetting('CapEquiparm')&&canAffordBuilding('Shield',null,null,!0)&&buyEquipment('Shield',!0,!0),game.equipment.Boots.level<getPageSetting('CapEquiparm')&&canAffordBuilding('Boots',null,null,!0)&&buyEquipment('Boots',!0,!0),game.equipment.Helmet.level<getPageSetting('CapEquiparm')&&canAffordBuilding('Helmet',null,null,!0)&&buyEquipment('Helmet',!0,!0),game.equipment.Pants.level<getPageSetting('CapEquiparm')&&canAffordBuilding('Pants',null,null,!0)&&buyEquipment('Pants',!0,!0),game.equipment.Shoulderguards.level<getPageSetting('CapEquiparm')&&canAffordBuilding('Shoulderguards',null,null,!0)&&buyEquipment('Shoulderguards',!0,!0),game.equipment.Breastplate.level<getPageSetting('CapEquiparm')&&canAffordBuilding('Breastplate',null,null,!0)&&buyEquipment('Breastplate',!0,!0),game.equipment.Gambeson.level<getPageSetting('CapEquiparm')&&canAffordBuilding('Gambeson',null,null,!0)&&buyEquipment('Gambeson',!0,!0),postBuy()}
function isActiveSpireAT(){return game.global.challengeActive!='Daily'&&game.global.spireActive&&game.global.world>=getPageSetting('IgnoreSpiresUntil')}
function disActiveSpireAT(){return game.global.challengeActive=='Daily'&&game.global.spireActive&&game.global.world>=getPageSetting('dIgnoreSpiresUntil')}
function exitSpireCell(){isActiveSpireAT()&&game.global.lastClearedCell>=getPageSetting('ExitSpireCell')-1&&endSpire()}
function dailyexitSpireCell(){disActiveSpireAT()&&game.global.lastClearedCell>=getPageSetting('dExitSpireCell')-1&&endSpire()}
function plusPres(){document.getElementById("biomeAdvMapsSelect").value="Random",document.getElementById("advExtraLevelSelect").value=plusMapToRun(game.global.world),document.getElementById("advSpecialSelect").value="p",document.getElementById("lootAdvMapsRange").value=0,document.getElementById("difficultyAdvMapsRange").value=9,document.getElementById("sizeAdvMapsRange").value=9,document.getElementById("advPerfectCheckbox").checked=!1,document.getElementById("mapLevelInput").value=game.global.world,updateMapCost()}
function plusMapToRun(a){return 9==a%10?6:5>a%10?5-a%10:11-a%10}
function findLastBionic(){for(var a=game.global.mapsOwnedArray.length-1;0<=a;a--)if("Bionic"===game.global.mapsOwnedArray[a].location)return game.global.mapsOwnedArray[a]}
function helptrimpsnotdie(){if(!game.global.preMapsActive&&!game.global.fighting)buyArms();}
function usedaily3(){!0!=getPageSetting('use3daily')||'Daily'!=game.global.challengeActive||daily3||(daily3=!0),!1==getPageSetting('use3daily')&&'Daily'!=game.global.challengeActive&&daily3&&(daily3=!1),!0==getPageSetting('use3daily')&&'Daily'!=game.global.challengeActive&&daily3&&(daily3=!1)}
function buyshitspire(){!0==getPageSetting('spireshitbuy')&&game.global.spireActive&&game.global.world>=getPageSetting('IgnoreSpiresUntil')&&(buyWeps(),buyArms())}

function autoGoldenUpgradesAT(setting) {
    var num = getAvailableGoldenUpgrades();
    if (num == 0) return;
    if (setting == "Void" || setting == "Void + Battle")
        setting = "Void";
    var success = buyGoldenUpgrade(setting);
    if (!success && setting == "Void") {
        num = getAvailableGoldenUpgrades();
        if (num == 0) return;
	if ((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void" && !game.global.dailyChallenge.seed && !game.global.runningChallengeSquared) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void" && game.global.dailyChallenge.seed))
	setting = "Helium";
	if (((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void" && getPageSetting('voidheliumbattle') > 0 && game.global.world >= getPageSetting('voidheliumbattle')) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void" && getPageSetting('dvoidheliumbattle') > 0 && game.global.world >= getPageSetting('dvoidheliumbattle'))) || ((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void + Battle" && !game.global.dailyChallenge.seed && !game.global.runningChallengeSquared) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void + Battle" && game.global.dailyChallenge.seed) || (autoTrimpSettings.cAutoGoldenUpgrades.selected == "Void + Battle" && game.global.runningChallengeSquared)))
        setting = "Battle";
	buyGoldenUpgrade(setting);
    }
}

//Praiding

function Praiding() {
  var pMap;
  if (getPageSetting('Praidingzone').length) {
    if (getPageSetting('Praidingzone').includes(game.global.world) && !prestraid && !failpraid) {
      debug('World Zone matches a Praiding Zone!');
	    prestraidon = true;

      if (getPageSetting('AutoMaps') == 1 && !prestraid && !failpraid) {
        autoTrimpSettings["AutoMaps"].value = 0;
      }
      if (!game.global.preMapsActive && !game.global.mapsActive && !prestraid && !failpraid) {
        mapsClicked();
		    if (!game.global.preMapsActive) {
          mapsClicked();
        }
		    debug("Beginning Prestige Raiding...");
      }
      if (game.options.menu.repeatUntil.enabled!=2 && !prestraid && !failpraid) {
        game.options.menu.repeatUntil.enabled = 2;
      }
      if (game.global.preMapsActive && !prestraid && !failpraid) {
        plusPres();
        if ((updateMapCost(true) <= game.resources.fragments.owned)) {
          buyMap();
          failpraid = false;
          mapbought = true;
        }
        else if ((updateMapCost(true) > game.resources.fragments.owned)) {
          if (getPageSetting('AutoMaps') == 0 && !prestraid) {
            autoTrimpSettings["AutoMaps"].value = 1;
            failpraid = true;
            prestraidon = false;
            mapbought = false;
            praidDone = true;
            debug("Failed to prestige raid. Looks like you can't afford to..");
          }
          return;
        }
	    }
	    if (mapbought == true) {
        pMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id;
        selectMap(pMap);
	      runMap();
      }
      if (!prestraid && !failpraid && !game.global.repeatMap) {
        repeatClicked();
      }
	    prestraid = true;
	    failpraid = false
	    mapbought = false;
    }
  }

  if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && prestraid && !failpraid && prestraidon) {
    praidDone = true;
    prestraidon = false;
    autoTrimpSettings["AutoMaps"].value = 1;
    debug("Prestige raiding successful! - recycling Praid map");
    recycleMap(getMapIndex(pMap));
    debug("Turning AutoMaps back on");
  }
  if (getPageSetting('Praidingzone').every(isBelowThreshold)) {
    prestraid = false;
    failpraid = false;
    prestraidon = false;
    mapbought = false;
    praidDone = false;
  }
}

function PraidHarder() {
  var maxPlusZones;
  var mapModifiers = ["p","fa","0"];
  var farmFragments;
  var praidBeforeFarm;
  var pRaidIndex;
  var maxPraidZSetting;
  var isBWRaidZ;

  // Determine whether to use daily or normal run settings
  if (game.global.challengeActive == "Daily") {
    praidSetting = 'dPraidingzone';
    maxPraidZSetting = 'dMaxPraidZone';
    isBWRaidZ = getPageSetting('dBWraidingz').includes(game.global.world) && getPageSetting('Dailybwraid');
    farmFragments = getPageSetting('dPraidFarmFragsZ').includes(game.global.world);
    praidBeforeFarm = getPageSetting('dPraidBeforeFarmZ').includes(game.global.world);
  }
  else {
    praidSetting = 'Praidingzone';
    maxPraidZSetting = 'MaxPraidZone';
    isBWRaidZ = getPageSetting('BWraidingz').includes(game.global.world) && getPageSetting('BWraid');
    farmFragments = getPageSetting('PraidFarmFragsZ').includes(game.global.world);
    praidBeforeFarm = getPageSetting('PraidBeforeFarmZ').includes(game.global.world);
  }

  pRaidIndex = getPageSetting(praidSetting).indexOf(game.global.world);
  if (pRaidIndex == -1 || typeof(getPageSetting(maxPraidZSetting)[pRaidIndex]) === "undefined") maxPlusZones = plusMapToRun(game.global.world);
  else maxPlusZones = getPageSetting(maxPraidZSetting)[pRaidIndex] - game.global.world;

  // Check we have a valid number for maxPlusZones
  maxPlusZones = maxPlusZones > 10 ? 10 : (maxPlusZones < 0 ? 10 : maxPlusZones);

  // Work out the max number of +map zones it's worth farming for prestige.
  if ((game.global.world + maxPlusZones) % 10 > 5)
    maxPlusZones = Math.max(maxPlusZones + (5 - (game.global.world + maxPlusZones) % 10),0);
  else if ((game.global.world + maxPlusZones) % 10 == 0)
    maxPlusZones = Math.min(5,maxPlusZones);

  // If we have any Praiding zones defined...
  if (getPageSetting(praidSetting).length) {
    if (getPageSetting(praidSetting).includes(game.global.world) && !prestraid && !failpraid && !shouldFarmFrags) {
      debug('Beginning Praiding');
      // Initialise shouldFarmFrags to false
      shouldFarmFrags = false;
      // Mark that we are prestige raiding and turn off automaps to stop it interfering
      prestraidon = true;
      autoTrimpSettings["AutoMaps"].value = 0;
      // Get into the preMaps screen
      if (!game.global.preMapsActive && !game.global.mapsActive) {
        mapsClicked();
	if (!game.global.preMapsActive) {
          mapsClicked();
        }
      }
      // Set repeat for items
      game.options.menu.repeatUntil.enabled = 2;
      toggleSetting("repeatUntil", null, false, true);
      // if we can farm for fragments, work out the minimum number we need to get all available prestiges
      if (farmFragments) {
        plusPres();
        document.getElementById('advExtraLevelSelect').value = maxPlusZones;
        document.getElementById('sizeAdvMapsRange').value = 0;
        document.getElementById('difficultyAdvMapsRange').value = 0;
        document.getElementById('advSpecialSelect').value = "0";
        minMaxMapCost = updateMapCost(true);
        // If we are not Praiding before farming, and cannot afford a max plus map, set flags for farming
        if (!praidBeforeFarm && game.resources.fragments.owned < minMaxMapCost) {
          prestraid = true;
          failpraid = false;
          shouldFarmFrags = true;
        }
      }
      // Set map settings to the best map for Praiding (even if we can't afford it)
      plusPres();
      document.getElementById('advExtraLevelSelect').value = maxPlusZones;
      // Iterate down through plusMaps setting until we find one we can afford
      for (var curPlusZones = maxPlusZones; curPlusZones >= 0; curPlusZones--) {
        // If the current targeted zone has no prestiges, decrement the number of plusZones and continue
        if ((game.global.world + curPlusZones) % 10 == 0 || (game.global.world + curPlusZones) % 10 > 5) continue;
        // Otherwise check to see if we can afford a map at the current plusZones setting
        document.getElementById('advExtraLevelSelect').value = curPlusZones;
        // If we find a map we can afford, break out of the loop
        if (relaxMapReqs(mapModifiers)) break;
        // conserve fragments if going to farm after by selecting only maps with no special modifier
        else if (farmFragments) mapModifiers = ["0"];
      }
      // If the map is not at the highest level with prestiges possible, set shouldFarmFrags to true
      if (maxPlusZones > curPlusZones) shouldFarmFrags = true;

      // If we found a suitable map...
      if (curPlusZones >= 0 && (praidBeforeFarm || shouldFarmFrags == false)) {
        // ...buy it
        buyMap();
        pMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id;
        selectMap(pMap);
        // Set flags to avoid rerunning this step
        prestraid = true;
        // prestraidon = false;
        failpraid = false;
        // Set repeat on and run the map
        game.global.repeatMap = true;
        runMap();
        repeatClicked(true);
      }
      // If we can't afford a map, and can't farm fragments, fail and turn automaps back on
      else if (!farmFragments){
        failpraid = true;
        prestraidon = false;
        praidDone = true;
        debug("Failed to prestige raid. Looks like you can't afford to.");
        if (isBWRaidZ) {
          // resetting these out of an abundance of caution
          bwraided = false;
          failbwraid = false;
          dbwraided = false;
          dfailbwraid = false;
          // BWraiding();
        }
        else {
          debug("Turning AutoMaps back on");
          autoTrimpSettings['AutoMaps'].value = 1;
        }
        return;
      }
    }
  }
  if (farmFragments && shouldFarmFrags && game.global.preMapsActive && prestraid && !fMap) {
    if (pMap) recycleMap(getMapIndex(pMap));
    pMap = null;
    // Choose a fragment farming map
    document.getElementById("biomeAdvMapsSelect").value = "Depths";
    document.getElementById('advExtraLevelSelect').value = 0;
    document.getElementById('advSpecialSelect').value = "fa";
    document.getElementById("lootAdvMapsRange").value = 9;
    document.getElementById("difficultyAdvMapsRange").value = 9;
    document.getElementById("sizeAdvMapsRange").value = 9;
    document.getElementById('advPerfectCheckbox').checked = true;
    document.getElementById("mapLevelInput").value = game.global.world - 1;
    game.options.menu.repeatUntil.enabled = 0;
    toggleSetting("repeatUntil", null, false, true);
    if (updateMapCost(true) <= game.resources.fragments.owned) {
      debug("Buying perfect sliders fragment farming map");
      buyMap();
      fMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id;
      selectMap(fMap);
      game.global.repeatMap = true;
      runMap();
      repeatClicked(true);
    }
    else {
      document.getElementById('advPerfectCheckbox').checked = false;
      if (updateMapCost(true) <= game.resources.fragments.owned) {
        debug("Buying imperfect sliders fragment farming map");
        buyMap();
        fMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id;
        selectMap(fMap);
        game.global.repeatMap = true;
        runMap();
        repeatClicked(true);
      }
      // if we can't buy a map, wait until the next main loop iteration and try again
      else debug("Can't afford fragment farming map yet");
    }
  }

  if ((game.global.mapsActive || game.global.preMapsActive) && minMaxMapCost <= game.resources.fragments.owned && shouldFarmFrags) {
    game.global.repeatMap = false;
    repeatClicked(true);
    if (game.global.preMapsActive) {
      minMaxMapCost = null;
      shouldFarmFrags = false;
      prestraid = false;
      failpraid = false;
    }
  }
  if (game.global.preMapsActive && prestraid && !failpraid && !shouldFarmFrags && prestraidon) {
    prestraidon = false;
    praidDone = true;
    debug("Prestige raiding successful! - recycling Praid map");
    if (pMap) recycleMap(getMapIndex(pMap));
    if (fMap) recycleMap(getMapIndex(fMap));
    pMap = null;
    fMap = null;
    if (isBWRaidZ) {
      bwraided = false;
      failbwraid = false;
      dbwraided = false;
      dfailbwraid = false;
    }
    else {
      debug("Turning AutoMaps back on");
      autoTrimpSettings['AutoMaps'].value = 1;
    }
  }

  if (!getPageSetting(praidSetting).includes(game.global.world)) {
    prestraid = false;
    failpraid = false;
    prestraidon = false;
    shouldFarmFrags = false;
    praidDone = false;
  }
}

function relaxMapReqs(mapModifiers) {
  for (var j = 0; j < mapModifiers.length; j++) {
    document.getElementById('sizeAdvMapsRange').value = 9;
    document.getElementById('advSpecialSelect').value = mapModifiers[j];
    for (var i = 9; i >= 0; i--) {
      document.getElementById('difficultyAdvMapsRange').value = i;
      if (updateMapCost(true) <= game.resources.fragments.owned) return true;
    }
    for (i = 9; i >= 0; i--) {
      document.getElementById('sizeAdvMapsRange').value = i;
      if (updateMapCost(true) <= game.resources.fragments.owned) return true;
    }
  }
  return false;
}

function BWraiding() {
  var bwraidZ;
  var bwraidSetting;
  var bwraidMax;
  var isPraidZ;
  var ispraidon;
  var isBWRaidZ;
  var targetBW;
  var bwIndex;

  if (game.global.challengeActive == "Daily") {
    bwraidZ = 'dBWraidingz';
    bwraidSetting = 'Dailybwraid';
    bwraidMax = 'dBWraidingmax';
    isPraidZ = getPageSetting('dPraidingzone').includes(game.global.world);
    ispraidon = dprestraidon;
  }
  else {
    bwraidZ = 'BWraidingz';
    bwraidSetting = 'BWraid';
    bwraidMax = 'BWraidingmax';
    isPraidZ = getPageSetting('Praidingzone').includes(game.global.world);
    ispraidon = prestraidon;
  }

  // Convert old BWraid settings to multivalue
  if (typeof(autoTrimpSettings['BWraidingz'].value) == "number")
    setPageSetting('BWraidingz', Array.of(autoTrimpSettings['BWraidingz'].value));
  if (typeof(autoTrimpSettings['BWraidingmax'].value) == "number")
    setPageSetting('BWraidingmax', Array.of(autoTrimpSettings['BWraidingmax'].value));
  if (typeof(autoTrimpSettings['dBWraidingz'].value) == "number")
      setPageSetting('dBWraidingz', Array.of(autoTrimpSettings['dBWraidingz'].value));
  if (typeof(autoTrimpSettings['dBWraidingmax'].value) == "number")
      setPageSetting('dBWraidingmax', Array.of(autoTrimpSettings['dBWraidingmax'].value));


  isBWRaidZ = getPageSetting(bwraidZ).includes(game.global.world);
  bwIndex = getPageSetting(bwraidZ).indexOf(game.global.world);
  if (bwIndex == -1 || typeof(getPageSetting(bwraidMax)[bwIndex]) === "undefined") targetBW = -1;
  else targetBW = getPageSetting(bwraidMax)[bwIndex];

  if ((!isPraidZ || praidDone) && !ispraidon && isBWRaidZ && !bwraided && !failbwraid && getPageSetting(bwraidSetting)) {
    if (getPageSetting('AutoMaps') == 1 && !bwraided && !failbwraid) {
      autoTrimpSettings["AutoMaps"].value = 0;
    }

    while (!game.global.preMapsActive && !bwraidon) mapsClicked();

    if (game.options.menu.repeatUntil.enabled != 2 && !bwraided && !failbwraid) {
      game.options.menu.repeatUntil.enabled = 2;
    }

    if (game.global.preMapsActive && !bwraided && !failbwraid && findLastBionic()) {
      selectMap(findLastBionic().id);
      failbwraid = false;
      debug("Beginning BW Raiding...");
    }

    else if (game.global.preMapsActive && !bwraided && !failbwraid) {
      if (getPageSetting('AutoMaps') == 0 && isBWRaidZ && !bwraided) {
        autoTrimpSettings["AutoMaps"].value = 1;
        failbwraid = true;
        debug("Failed to BW raid. Looks like you don't have a BW to raid...");
      }
    }

    if (findLastBionic().level <= targetBW && !bwraided && !failbwraid && game.global.preMapsActive) {
      runMap();
      bwraidon = true;
    }

    if (!game.global.repeatMap && !bwraided && !failbwraid && game.global.mapsActive) {
      repeatClicked();
    }

    if (findLastBionic().level > targetBW && !bwraided && !failbwraid) {
      bwraided = true;
      failbwraid = false;
      bwraidon = false;
      debug("...Successfully BW raided!");
    }
  }

  if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && bwraided && !failbwraid) {
    autoTrimpSettings["AutoMaps"].value = 1;
    debug("Turning AutoMaps back on");
  }

  if (!isBWRaidZ) {
    bwraided = false;
    failbwraid = false;
    bwraidon = false;
  }
}

function dailyPraiding() {
    var dpMap;
    if (getPageSetting('dPraidingzone').length) {
   	if (getPageSetting('dPraidingzone').includes(game.global.world) && !dprestraid && !dfailpraid) {
            debug('World Zone matches a Daily Praiding Zone!');
	    dprestraidon = true;
             if (getPageSetting('AutoMaps') == 1 && !dprestraid && !dfailpraid) {
                autoTrimpSettings["AutoMaps"].value = 0;
            }
            if (!game.global.preMapsActive && !game.global.mapsActive && !dprestraid && !dfailpraid) {
                mapsClicked();
		if (!game.global.preMapsActive) {
                    mapsClicked();
                }
		debug("Beginning Daily Prestige Raiding...");
            }
            if (game.options.menu.repeatUntil.enabled!=2 && !dprestraid && !dfailpraid) {
                game.options.menu.repeatUntil.enabled = 2;
            }
            if (game.global.preMapsActive && !dprestraid && !dfailpraid) {
                plusPres();
                if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                    buyMap();
                    dfailpraid = false;
		    dmapbought = true;
                }
                else if ((updateMapCost(true) > game.resources.fragments.owned)) {
                    if (getPageSetting('AutoMaps') == 0 && !dprestraid) {
                        autoTrimpSettings["AutoMaps"].value = 1;
                        dfailpraid = true;
			                  dprestraidon = false;
			                  dmapbought = false;
                        praidDone = true;
                        debug("Failed to Daily Prestige Raid. Looks like you can't afford to..");
                    }
                    return;
                 }
	    }
	    if (dmapbought == true) {
		dpMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id;
                selectMap(dpMap);
		runMap();
            }
            if (!dprestraid && !dfailpraid && !game.global.repeatMap) {
                repeatClicked();
             }
	    dprestraid = true;
	    dfailpraid = false;
	    dmapbought = false;
	}
    }
     if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && dprestraid && !dfailpraid && dprestraidon) {
        praidDone = true;
        dprestraidon = false;
        autoTrimpSettings["AutoMaps"].value = 1;
	      debug("Daily Prestige Raiding successful! - recycling Praid map");
	      recycleMap(getMapIndex(dpMap));
	      debug("Turning AutoMaps back on");
    }
    if (getPageSetting('dPraidingzone').every(isBelowThreshold)) {
        dprestraid = false;
        dfailpraid = false
        dprestraidon = false;
        dmapbought = false;
        praidDone = false;
    }
}

function dailyBWraiding() {
 	 if (!dprestraidon && game.global.world == getPageSetting('dBWraidingz') && !dbwraided && !dfailbwraid && getPageSetting('Dailybwraid')) {
 	     if (getPageSetting('AutoMaps') == 1 && !dbwraided && !dfailbwraid) {
                 autoTrimpSettings["AutoMaps"].value = 0;
                 }
              if (!game.global.preMapsActive && !game.global.mapsActive && !dbwraided && !dfailbwraid) {
                 mapsClicked();
 		 if (!game.global.preMapsActive) {
                     mapsClicked();
                     }
                 }
 	     if (game.options.menu.repeatUntil.enabled != 2 && !dbwraided && !dfailbwraid) {
            	 game.options.menu.repeatUntil.enabled = 2;
                 }
 	     if (game.global.preMapsActive && !dbwraided && !dfailbwraid) {
		 selectMap(findLastBionic().id);
		 dfailbwraid = false;
		 debug("Beginning Daily BW Raiding...");
                 }
 	     else if (game.global.preMapsActive && !dbwraided && !dfailbwraid) {
                      if (getPageSetting('AutoMaps') == 0 && game.global.world == getPageSetting('dBWraidingz') && !dbwraided) {
                          autoTrimpSettings["AutoMaps"].value = 1;
                          dfailbwraid = true;
                          debug("Failed to Daily BW raid. Looks like you don't have a BW to raid...");
                          }
                       }
 	     if (findLastBionic().level <= getPageSetting('dBWraidingmax') && !dbwraided && !dfailbwraid && game.global.preMapsActive) {
		 runMap();
		 dbwraidon = true;
		 }
 	     if (!game.global.repeatMap && !dbwraided && !dfailbwraid && game.global.mapsActive) {
		 repeatClicked();
		 }
 	     if (findLastBionic().level > getPageSetting('dBWraidingmax') && !dbwraided && !dfailbwraid) {
                 dbwraided = true;
            	 dfailbwraid = false;
		 dbwraidon = false;
           	 debug("...Successfully Daily BW raided!");
		 }
 	     if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && game.global.world == getPageSetting('dBWraidingz') && dbwraided && !dfailbwraid) {
                 autoTrimpSettings["AutoMaps"].value = 1;
		 debug("Turning AutoMaps back on");
                 }
 	    }
 	if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && dbwraided && !dfailbwraid) {
            autoTrimpSettings["AutoMaps"].value = 1;
	    debug("Turning AutoMaps back on");
	    }
 	if (dbwraided && !dfailbwraid && game.global.world !== getPageSetting('dBWraidingz')) {
            dbwraided = false;
	    dfailbwraid = false;
	    dbwraidon = false;
            }
 }

function lootdump() {
if (game.global.world==getPageSetting('lootdumpz') && !perked && getPageSetting('AutoAllocatePerks')==2 && getPageSetting('lootdumpz') > 0) {
	    viewPortalUpgrades();
	if (game.global.viewingUpgrades && getPortalUpgradePrice("Looting_II") <= game.resources.helium.respecMax) {
	    	numTab(6, true)
		buyPortalUpgrade('Looting_II');
		activateClicked();
		cancelPortal();
		debug('Bought Max Looting II');
	     }
	else {
	     perked = true;
	     cancelPortal();
	     debug("Done buying Looting II");
	     }
	}
else if (perked == true && game.global.world !== getPageSetting('lootdumpz')) {
         perked = false;
             }
}

function trimpcide() {
if (game.portal.Anticipation.level > 0) {
	var antistacklimit = (game.talents.patience.purchased) ? 45 : 30;
	if (game.global.fighting && ((game.jobs.Amalgamator.owned > 0) ? Math.floor((new Date().getTime() - game.global.lastSoldierSentAt) / 1000) : Math.floor(game.global.lastBreedTime / 1000)) >= antistacklimit && (game.global.antiStacks < antistacklimit || antistacklimit == 0 && game.global.antiStacks >= 1) && !game.global.spireActive)
              forceAbandonTrimps();
	if (game.global.fighting && ((game.jobs.Amalgamator.owned > 0) ? Math.floor((new Date().getTime() - game.global.lastSoldierSentAt) / 1000) : Math.floor(game.global.lastBreedTime / 1000)) >= antistacklimit && game.global.antiStacks < antistacklimit && game.global.mapsActive) {
	      if (getCurrentMapObject().location == "Void") {
		  abandonVoidMap();
	          }
	      }
	}
}

function avoidempower() {
	if(armydeath()) {
            if (typeof game.global.dailyChallenge.bogged === 'undefined' && typeof game.global.dailyChallenge.plague === 'undefined'){
                mapsClicked(true);
                return;
            }
        }
}

var spirebreeding = false;
function ATspirebreed() {
	if(!spirebreeding && getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && game.global.spireActive)
		var prespiretimer = game.global.GeneticistassistSetting;
	if (getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && game.global.spireActive && game.global.GeneticistassistSetting != getPageSetting('SpireBreedTimer')) {
		spirebreeding = true;
	if (game.global.GeneticistassistSetting != getPageSetting('SpireBreedTimer'))
		game.global.GeneticistassistSetting = getPageSetting('SpireBreedTimer');
	}
	if (getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && !game.global.spireActive && game.global.GeneticistassistSetting == getPageSetting('SpireBreedTimer')) {
		spirebreeding = false;
		if (game.global.GeneticistassistSetting == getPageSetting('SpireBreedTimer')) {
			game.global.GeneticistassistSetting = prespiretimer;
			toggleGeneticistassist();
			toggleGeneticistassist();
			toggleGeneticistassist();
			toggleGeneticistassist();
		}
	}
}

function fightalways() {
	if (game.global.gridArray.length === 0 || game.global.preMapsActive || !game.upgrades.Battle.done || game.global.fighting || (game.global.spireActive && game.global.world >= getPageSetting('IgnoreSpiresUntil')))
	    return;
	if (!game.global.fighting)
	    fightManual();
}

function armormagic() {
	var armormagicworld =  Math.floor((game.global.highestLevelCleared + 1) * 0.8);
	if (((getPageSetting('carmormagic') == 1 || getPageSetting('darmormagic') == 1) && game.global.world >= armormagicworld && (game.global.soldierHealth <= game.global.soldierHealthMax*0.4)) || ((getPageSetting('carmormagic') == 2 || getPageSetting('darmormagic') == 2) && calcHDratio() >= MODULES["maps"].enoughDamageCutoff && (game.global.soldierHealth <= game.global.soldierHealthMax*0.4)) || ((getPageSetting('carmormagic') == 3 || getPageSetting('darmormagic') == 3) && (game.global.soldierHealth <= game.global.soldierHealthMax*0.4)))
	 buyArms();
}

trapIndexs = ["","Fire","Frost","Poison","Lightning","Strength","Condenser","Knowledge"];

function tdStringCode2(){
	var thestring=document.getElementById('importBox').value.replace(/\s/g, '');
	var s = new String(thestring);
	var index = s.indexOf("+",0);
	s = s.slice(0,index);
	var length = s.length;

    var saveLayout = [];
	for (var i = 0; i < length; i++) {
		saveLayout.push(trapIndexs[s.charAt(i)]);
	}
    playerSpire['savedLayout' + -1] = saveLayout;

    if ((playerSpire.runestones + playerSpire.getCurrentLayoutPrice()) < playerSpire.getSavedLayoutPrice(-1)) return false;
    playerSpire.resetTraps();
    for (var x = 0; x < saveLayout.length; x++){
        if (!saveLayout[x]) continue;
        playerSpire.buildTrap(x, saveLayout[x]);
    }
}

playerSpire.drawInfo = function() {
        if (!this.popupOpen) return;
        if (this.smallMode){
            this.drawSmallInfo();
            return;
        }
        var elem = document.getElementById('playerSpireInfoPanel');
        var infoHtml = "";
        infoHtml += "<div id='playerSpireInfoTop'>";
        infoHtml += "<span onmouseover='playerSpire.infoTooltip(\"Runestones\", event)' onmouseout='tooltip(\"hide\")'>Runestones: <span id='playerSpireRunestones'>" + prettify(this.runestones) + "</span><br/>Runestones per Second: <span id='RsPs'>" + prettify(this.getRsPs()) + "</span></span>";
        infoHtml += "<br/><span onmouseover='playerSpire.infoTooltip(\"Enemies\", event)' onmouseout='tooltip(\"hide\")'>Enemies: <span id='playerSpireCurrentEnemies'>" + this.currentEnemies + "</span> / <span id='playerSpireMaxEnemies'>" + this.maxEnemies + "</span></span>";
        infoHtml += "<br/><span onmouseover='playerSpire.infoTooltip(\"Spirestones\", event)' onmouseout='tooltip(\"hide\")' id='spirestoneBox'>" + this.getSpirestoneHtml() + "</span><br/><span onmouseover='playerSpire.infoTooltip(\"Threat\", event)' onmouseout='tooltip(\"hide\")' id='playerSpireDifficulty'>" + this.getDifficultyHtml() + "</span></div>";
        infoHtml += "<div id='spireTrapsWindow'>";
        infoHtml += "<div onclick='playerSpire.shrink()' id='shrinkSpireBox' class='spireControlBox'>Shrink Window</div>";
        infoHtml += "<div onclick='playerSpire.settingsTooltip()' id='spireSettingsBox' class='spireControlBox'>Settings</div>"
        infoHtml += "<div onclick='tooltip(\"confirm\", null, \"update\", \"Are you sure you want to sell all Traps and Towers? You will get back 100% of Runestones spent on them.<br/><br/>" + ((this.paused) ? "" : "<b>Protip:</b> Pause your Spire before selling your defenses if you want to avoid leaking!") + "\", \"playerSpire.resetTraps()\", \"Sell All?\")' class='spireControlBox'>Sell All</div>";
        infoHtml += "<div onclick='playerSpire.togglePause()' id='pauseSpireBtn' class='spireControlBox spirePaused" + ((this.paused) ? "Yes'>Unpause" : "'>Pause Spire") + "</div>";      
        infoHtml += "<div class='spireControlBoxDbl'><div onclick='playerSpire.presetTooltip(1)'>Layout 1</div><div onclick='playerSpire.presetTooltip(2)'>Layout 2</div></div>"
        infoHtml += "<div onclick='playerSpire.selectTrap(\"shiftUp\")' onmouseout='tooltip(\"hide\")' onmouseover='playerSpire.trapTooltip(\"shiftUp\", event)' id='sellTrapBox' class='spireControlBox" + ((this.selectedTrap == "shiftUp") ? " selected" : "") + "'>Shift Up</div>";
        infoHtml += "<div onclick='playerSpire.selectTrap(\"shiftDown\")' onmouseout='tooltip(\"hide\")' onmouseover='playerSpire.trapTooltip(\"shiftDown\", event)' id='sellTrapBox' class='spireControlBox" + ((this.selectedTrap == "shiftDown") ? " selected" : "") + "'>Shift Down</div>";
      	infoHtml += "<div onclick='ImportExportTooltip(\"spireImport\")' class='spireControlBox'>Import</div>";


        infoHtml += "<br/><hr/>"
        infoHtml += "<div onclick='playerSpire.selectTrap(\"sell\")' onmouseout='tooltip(\"hide\")' onmouseover='playerSpire.trapTooltip(\"sell\", event)' style='padding-top: 1.35vw' id='sellTrapBox' class='spireTrapBox" + ((this.selectedTrap == "sell") ? " selected" : "") + "'>Sell a Trap/Tower</div>";
        var cheapestTrap = -1;
        for (var item in playerSpireTraps){
            var trap = playerSpireTraps[item];
            if (trap.locked) continue;
            var trapText = trap.isTower ? "Tower" : "Trap";
            trapText += " " + romanNumeral(trap.level);
            var trapIcon = "";
            if (this.settings.trapIcons) trapIcon = "<span class='icomoon icon-" + trap.icon + "'></span> ";
            var cost = this.getTrapCost(item);
            var color = (this.runestones >= cost) ? trap.color : "grey";
            infoHtml += "<div style='background-color: " + color + "' onmouseout='tooltip(\"hide\")' onmouseover='playerSpire.trapTooltip(\"" + item + "\", event)' onclick='playerSpire.selectTrap(\"" + item + "\")' id='" + item + "TrapBox' class='spireTrapBox" + ((item == this.selectedTrap) ? " selected" : "") + "'>" + trapIcon + item + " " + trapText + "<br/>" + prettify(this.getTrapCost(item)) + " Rs</div>"
            if (this.runestones < cost && (cheapestTrap == -1 || cost < cheapestTrap)) cheapestTrap = cost;
        }
        this.nextTrap = cheapestTrap;
        infoHtml += "</div><hr/>"; //spireTrapsWindow
        infoHtml += "<span id='playerSpireCloseBtn' class='icomoon icon-close' onclick='playerSpire.closePopup()'></span>";
        infoHtml += "<div id='playerSpireUpgradesArea'>";
        infoHtml += this.getUpgradesHtml();
        infoHtml += "</div>"; //playerSpireUpgradesArea
        elem.innerHTML = infoHtml;
    }
