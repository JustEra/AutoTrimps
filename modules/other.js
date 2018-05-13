MODULES["other"] = {};
MODULES["other"].enableRoboTrimpSpam = true;  //set this to false to stop Spam of "Activated Robotrimp MagnetoShriek Ability"
var prestraid = false;
var failpraid = false;
var BWrmn = getPageSetting('BWraidingmin');
var BWrmx = getPageSetting('BWraidingmax');
var bwraided = false;
//Activate Robo Trimp (will activate on the first zone after liquification)
function autoRoboTrimp() {
    //exit if the cooldown is active, or we havent unlocked robotrimp.
    if (game.global.roboTrimpCooldown > 0 || !game.global.roboTrimpLevel) return;
    var robotrimpzone = parseInt(getPageSetting('AutoRoboTrimp'));
    //exit if we have the setting set to 0
    if (robotrimpzone == 0) return;
    //activate the button when we are above the cutoff zone, and we are out of cooldown (and the button is inactive)
    if (game.global.world >= robotrimpzone && !game.global.useShriek){
        magnetoShriek();
        if (MODULES["other"].enableRoboTrimpSpam)
            debug("Activated Robotrimp MagnetoShriek Ability @ z" + game.global.world, "graphs", '*podcast');
    }
}

//Version 3.6 Golden Upgrades
    //setting param : get the numerical value of the selected index of the dropdown box
function autoGoldenUpgradesAT(setting) {
    var num = getAvailableGoldenUpgrades();
    if (num == 0) return;       //if we have nothing to buy, exit.
    //Challenge^2 cant Get/Buy Helium, so adapt - do Derskagg mod.
    var challSQ = game.global.runningChallengeSquared;
    //Default: True = Always get 60% void by skipping the 12% upgrade then buying 14%/16%
    var goldStrat = getPageSetting('goldStrat');
    //Try to achieve 60% Void    
    if (setting == "Void" && goldStrat == "Max then Helium") {
      var nextVoidAmt = game.goldenUpgrades.Void.nextAmt().toFixed(2);
      if (nextVoidAmt == 0.12)   //skip the 6th void upgrade
        setting = "Helium";
      if (challSQ)  //always buy battle during max then helium mode.
        setting = "Battle";
    }
    //buy one upgrade per loop.
    var success = buyGoldenUpgrade(setting);

    var doDerskaggChallSQ = false;
    if (setting == ("Helium" || "Void") && challSQ)
        {doDerskaggChallSQ = true; setting = (challSQ) ? "Battle" : "Helium"}
    // DZUGAVILI MOD - SMART VOID GUs
    // Assumption: buyGoldenUpgrades is not an asynchronous operation and resolves completely in function execution.
    // Assumption: "Locking" game option is not set or does not prevent buying Golden Void
    var noBat = getPageSetting('goldNoBattle');  //true = no battle = buy helium
  //In 'Alternating' mode : instead of alternating between buying Helium and Battle, with this on it will only buy Helium.
    if (!success && setting == "Void" || doDerskaggChallSQ) {
        num = getAvailableGoldenUpgrades(); //recheck availables.
        if (num == 0) return;
        // DerSkagg Mod - Instead of Voids, For every Helium upgrade buy X-1 battle upgrades to maintain speed runs
        if (goldStrat == "Alternating") {
            var goldAlternating = getPageSetting('goldAlternating');
            setting = (game.global.goldenUpgrades%goldAlternating == 0 || noBat) ? "Helium" : "Battle";
        } else if (goldStrat == "Zone") {
            var goldZone = getPageSetting('goldZone');
            setting = (game.global.world <= goldZone || noBat) ? "Helium" : "Battle";
        } else if (goldStrat == "Max then Helium") {
            setting = (challSQ) ? "Battle" : "Helium";
        } else
            setting = (challSQ) ? "Battle" : "Helium";
        buyGoldenUpgrade(setting);
    }
    // END OF DerSkagg & DZUGAVILI MOD
//} catch(err) { debug("Error in autoGoldenUpgrades: " + err.message, "general"); }
}

//auto spend nature tokens
function autoNatureTokens() {
    var changed = false;
    for (var nature in game.empowerments) {
        var empowerment = game.empowerments[nature];
        var setting = getPageSetting('Auto' + nature);
        if (!setting || setting == 'Off') continue;

        //buy/convert once per nature per loop
        if (setting == 'Empowerment') {
            var cost = getNextNatureCost(nature);
            if (empowerment.tokens < cost)
                continue;
            empowerment.tokens -= cost;
            empowerment.level++;
            changed = true;
            debug('Upgraded Empowerment of ' + nature, 'nature');
        }
        else if (setting == 'Transfer') {
            if (empowerment.retainLevel >= 80)
                continue;
            var cost = getNextNatureCost(nature, true);
            if (empowerment.tokens < cost) continue;
            empowerment.tokens -= cost;
            empowerment.retainLevel++;
            changed = true;
            debug('Upgraded ' + nature + ' transfer rate', 'nature');
        }
        else if (setting == 'Convert to Both') {
            if (empowerment.tokens < 20) continue;
            for (var targetNature in game.empowerments) {
                if (targetNature == nature) continue;
                empowerment.tokens -= 10;
                var convertRate = (game.talents.nature.purchased) ? ((game.talents.nature2.purchased) ? 8 : 6) : 5;
                game.empowerments[targetNature].tokens += convertRate;
                changed = true;
                debug('Converted ' + nature + ' tokens to ' + targetNature, 'nature');
            }
        }
        else {
            if (empowerment.tokens < 10)
                continue;
            var match = setting.match(/Convert to (\w+)/);
            var targetNature = match ? match[1] : null;
            //sanity check
            if (!targetNature || targetNature === nature || !game.empowerments[targetNature]) continue;
            empowerment.tokens -= 10;
            var convertRate = (game.talents.nature.purchased) ? ((game.talents.nature2.purchased) ? 8 : 6) : 5;
            game.empowerments[targetNature].tokens += convertRate;
            changed = true;
            debug('Converted ' + nature + ' tokens to ' + targetNature, 'nature');
        }
    }
    if (changed)
        updateNatureInfoSpans();
}

//Check if currently in a Spire past IgnoreSpiresUntil
function isActiveSpireAT() {
    return game.global.spireActive && game.global.world >= getPageSetting('IgnoreSpiresUntil');
}

//Exits the Spire after completing the specified cell.
function exitSpireCell() {
    if(isActiveSpireAT() && game.global.lastClearedCell >= getPageSetting('ExitSpireCell')-1)
        endSpire();
}

    function plusPres()
    {
        document.getElementById("biomeAdvMapsSelect").value = "Random";
        document.getElementById('advExtraLevelSelect').value = plusMapToRun(game.global.world);
        document.getElementById('advSpecialSelect').value = "p";
        document.getElementById("lootAdvMapsRange").value = 0;
        document.getElementById("difficultyAdvMapsRange").value = 9;
        document.getElementById("sizeAdvMapsRange").value = 9;
        document.getElementById('advPerfectCheckbox').checked = false;
        updateMapCost();
    }
    
   function plusMapToRun(zone)
{   
    if (zone % 10 == 9)
        return 6
    else if (zone % 10 <5)
        return 5 - zone % 10;
    else
        return 11 - zone % 10;
}

//Praiding

function Praiding() {
    if (game.global.world == getPageSetting('Praidingzone') && !prestraid && !failpraid) { 
            if (getPageSetting('AutoMaps') == 1 && game.global.world == getPageSetting('Praidingzone') && !prestraid && !failpraid) {
                autoTrimpSettings["AutoMaps"].value = 0;
                }
                debug("Beginning Prestige Raiding...");
                if (!game.global.preMapsActive && !game.global.mapsActive && game.global.world == getPageSetting('Praidingzone') && !prestraid && !failpraid) { 
                    mapsClicked();
                }
                if (game.options.menu.repeatUntil.enabled!=2 && game.global.world == getPageSetting('Praidingzone') && !prestraid && !failpraid) {
                    game.options.menu.repeatUntil.enabled = 2;
                }
                if (game.global.world == getPageSetting('Praidingzone') && game.global.preMapsActive && !prestraid && !failpraid) { 
                plusPres();
                if (buyMap() > 0) {
                    buyMap();
                    failpraid = false;
                }
                    else if (buyMap() < 0) {
                        if (getPageSetting('AutoMaps') == 0 && game.global.world == getPageSetting('Praidingzone') && !prestraid) {
                            autoTrimpSettings["AutoMaps"].value = 1;
                            failpraid = true;
                            debug("Failed to prestige raid. Looks like you can't afford to..");
                    }
                    return;

                }
                selectMap(game.global.mapsOwnedArray[game.global.mapsOwnedArray.length-1].id);
                }
                runMap();
                if (!game.global.repeatMap && game.global.world == getPageSetting('Praidingzone') && !prestraid && !failpraid) {
                    repeatClicked();
                }
                prestraid = true;
                failpraid = false;
                debug("...Successfully prestiged!");
                }
                if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && game.global.world == getPageSetting('Praidingzone') && prestraid && !failpraid) {
                    autoTrimpSettings["AutoMaps"].value = 1;
                }
    else if (prestraid == true && game.global.world !== getPageSetting('Praidingzone')) {
             prestraid = false;
        }
                       
        }
 


//BWraiding
//BWrmn
//BWrmx
function BWraid() {
    if (game.global.world == BWrmn && !bwraided && !failbwraid) {
        if (getPageSetting('AutoMaps') == 1 && game.global.world == BWrmn && !bwraided && !failbwraid) {
             autoTrimpSettings["AutoMaps"].value = 0;
        }
        debug("Beginning BW Raiding...");
        if (!game.global.preMapsActive && !game.global.mapsActive && game.global.world == BWrmn && !bwraided && !failbwraid) { 
             mapsClicked();
        }
        if (game.options.menu.repeatUntil.enabled!=2 && game.global.world == BWrmn && !bwraided && !failbwraid) {
                    game.options.menu.repeatUntil.enabled = 2;
        }
        if (game.global.world == BWrmn && game.global.preMapsActive && !bwraided && !failbwraid) {
        //get bw map
        }
        /*else if cant find bw map{
                        if (getPageSetting('AutoMaps') == 0 && game.global.world == BWrmn && !bwraided) {
                            autoTrimpSettings["AutoMaps"].value = 1;
                            failbwraid = true;
                            debug("Failed to BW raid. Looks like you don't have a BW to raid...");
                    }
                    return;
        */


}











