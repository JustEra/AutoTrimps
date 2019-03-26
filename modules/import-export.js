MODULES["import-export"] = {};
var $settingsProfiles;
function settingsProfileMakeGUI(){var a=document.createElement("Label");a.id="settingsProfiles Label",a.innerHTML="Settings Profile: ",2==game.options.menu.darkTheme.enabled?a.setAttribute("style","margin-left: 1.2vw; margin-right: 0.8vw; font-size: 0.8vw;"):a.setAttribute("style","margin-left: 1.2vw; margin-right: 0.8vw; font-size: 0.8vw;"),$settingsProfiles=document.createElement("select"),$settingsProfiles.id="settingsProfiles",$settingsProfiles.setAttribute("class","noselect"),$settingsProfiles.setAttribute("onchange","settingsProfileDropdownHandler()");var b="text-align: center; width: 160px; font-size: 1.0vw;";2==game.options.menu.darkTheme.enabled?$settingsProfiles.setAttribute("style",b):$settingsProfiles.setAttribute("style",b+" color: black;");var c=document.createElement("Button");c.id="settingsProfiles Button",c.setAttribute("class","btn btn-info"),c.innerHTML="&lt;Delete Profile",c.setAttribute("style","margin-left: 0.5vw; margin-right: 0.5vw; font-size: 0.8vw;"),c.setAttribute("onclick","onDeleteProfileHandler()");var d="<option id='customProfileCurrent'>Current</option>";d+="<option id='customProfileDefault'>Reset to Default</option>",d+="<option id='customProfileNew'>Save New...</option>",$settingsProfiles.innerHTML=d;var e=document.getElementById("Import Export");null==e||(e.insertBefore(a,e.childNodes[1]),e.insertBefore($settingsProfiles,e.childNodes[2]),e.insertBefore(c,e.childNodes[3]))}
function initializeSettingsProfiles(){if(null!=$settingsProfiles){var a=localStorage.getItem('ATSelectedSettingsProfile'),b=a?JSON.parse(a):[];b.forEach(function(c){let d=new Option(c.name);d.id='customProfileRead',$settingsProfiles.add(d)}),$settingsProfiles.selectedIndex=0}}
function settingsProfileDropdownHandler(){if(null!=$settingsProfiles){var a=$settingsProfiles.selectedIndex,b=$settingsProfiles.options[a].id;if('customProfileCurrent'!=b)return cancelTooltip(),void('customProfileDefault'==b?ImportExportTooltip('ResetDefaultSettingsProfiles'):'customProfileNew'==b?ImportExportTooltip('NameSettingsProfiles'):'customProfileRead'==b&&ImportExportTooltip('ReadSettingsProfiles'))}}
function confirmedSwitchNow(){if(null!=$settingsProfiles){var a=$settingsProfiles.selectedIndex,b=$settingsProfiles.options[a].text,c=JSON.parse(localStorage.getItem("ATSelectedSettingsProfile"));if(null!=c){var d=c.filter(function(e){return e.name==b});0<d.length&&(resetAutoTrimps(d[0].data,b),debug("Successfully loaded existing profile: "+b,"profile"))}}}
function nameAndSaveNewProfile(){try{var a=document.getElementById("setSettingsNameTooltip").value.replace(/[\n\r]/gm,"");if(null==a)return void debug("Error in naming, the string is empty.","profile")}catch(g){return void debug("Error in naming, the string is bad."+g.message,"profile")}var b={name:a,data:JSON.parse(serializeSettings())},c=localStorage.getItem("ATSelectedSettingsProfile"),d=c?JSON.parse(c):[];safeSetItems("ATSelectedSettingsProfile",JSON.stringify(d.concat([b]))),debug("Successfully created new profile: "+b.name,"profile"),ImportExportTooltip("message","Successfully created new profile: "+b.name);let f=new Option(b.name);f.id="customProfileRead";null==$settingsProfiles||($settingsProfiles.add(f),$settingsProfiles.selectedIndex=$settingsProfiles.length-1)}
function onDeleteProfileHandler(){ImportExportTooltip('DeleteSettingsProfiles')}
function onDeleteProfile(){if(null!=$settingsProfiles){var a=$settingsProfiles.selectedIndex;$settingsProfiles.options.remove(a),$settingsProfiles.selectedIndex=a>$settingsProfiles.length-1?$settingsProfiles.length-1:a;var b=localStorage.getItem('ATSelectedSettingsProfile'),c=b?JSON.parse(b):[],d=a-3;c.splice(d,1),safeSetItems('ATSelectedSettingsProfile',JSON.stringify(c)),debug('Successfully deleted profile #: '+d,'profile')}}

function ImportExportTooltip(what, event) {
    if (game.global.lockTooltip)
        return;
    var $elem = document.getElementById("tooltipDiv");
    swapClass("tooltipExtra", "tooltipExtraNone", $elem);
    var ondisplay = null;
    var tooltipText;
    var costText = "";
    var titleText = what;
    if (what == "ExportAutoTrimps") {
        tooltipText = "This is your AUTOTRIMPS save string. There are many like it but this one is yours. Save this save somewhere safe so you can save time next time. <br/><br/><textarea id='exportArea' style='width: 100%' rows='5'>" + serializeSettings() + "</textarea>";
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip()'>Got it</div>";
        if (document.queryCommandSupported('copy')) {
            costText += "<div id='clipBoardBtn' class='btn btn-success'>Copy to Clipboard</div>";
            ondisplay = function() {
                document.getElementById('exportArea').select();
                document.getElementById('clipBoardBtn').addEventListener('click', function(event) {
                    document.getElementById('exportArea').select();
                    try {
                        document.execCommand('copy');
                    } catch (err) {
                        document.getElementById('clipBoardBtn').innerHTML = "Error, not copied";
                    }
                });
            };
        } else {
            ondisplay = function() {
                document.getElementById('exportArea').select();
            };
        }
        costText += "</div>";
    } else if (what == "Export550") {
        tooltipText = "This is your AUTOTRIMPS z550+ save string. Use this string to import the settings. <br/><br/><textarea id='exportArea' style='width: 100%' rows='5'>" + serializeSettings550() + "</textarea>";
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip()'>Got it</div>";
        if (document.queryCommandSupported('copy')) {
            costText += "<div id='clipBoardBtn' class='btn btn-success'>Copy to Clipboard</div>";
            ondisplay = function() {
                document.getElementById('exportArea').select();
                document.getElementById('clipBoardBtn').addEventListener('click', function(event) {
                    document.getElementById('exportArea').select();
                    try {
                        document.execCommand('copy');
                    } catch (err) {
                        document.getElementById('clipBoardBtn').innerHTML = "Error, not copied";
                    }
                });
            };
        }
    } else if (what == "Export60") {
        tooltipText = "This is your AUTOTRIMPS z60 save string. Use this string to import the settings. <br/><br/><textarea id='exportArea' style='width: 100%' rows='5'>" + serializeSettings60() + "</textarea>";
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip()'>Got it</div>";
        if (document.queryCommandSupported('copy')) {
            costText += "<div id='clipBoardBtn' class='btn btn-success'>Copy to Clipboard</div>";
            ondisplay = function() {
                document.getElementById('exportArea').select();
                document.getElementById('clipBoardBtn').addEventListener('click', function(event) {
                    document.getElementById('exportArea').select();
                    try {
                        document.execCommand('copy');
                    } catch (err) {
                        document.getElementById('clipBoardBtn').innerHTML = "Error, not copied";
                    }
                });
            };
    } else {
            ondisplay = function() {
                document.getElementById('exportArea').select();
            };
        }
        costText += "</div>";
    } else if (what == "ImportAutoTrimps") {
        tooltipText = "Import your AUTOTRIMPS save string! It'll be fine, I promise.<br/><br/><textarea id='importBox' style='width: 100%' rows='5'></textarea>";
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip(); loadAutoTrimps();'>Import</div><div class='btn btn-info' onclick='cancelTooltip()'>Cancel</div></div>";
        ondisplay = function() {
            document.getElementById('importBox').focus();
        };
    } else if (what == "spireImport") {
        tooltipText = "Import your SPIRE string! <br/><br/><textarea id='importBox' style='width: 100%' rows='5'></textarea>";
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip(); tdStringCode2();'>Import</div><div class='btn btn-info' onclick='cancelTooltip()'>Cancel</div></div>";
        ondisplay = function() {
            document.getElementById('importBox').focus();
        };
    } else if (what == "CleanupAutoTrimps") {
        cleanupAutoTrimps();
        tooltipText = "Autotrimps saved-settings have been attempted to be cleaned up. If anything broke, refreshing will fix it, but check that your settings are correct! (prestige in particular)";
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip();'>OK</div></div>";
    } else if (what == "ExportModuleVars") {
        tooltipText = "These are your custom Variables. The defaults have not been included, only what you have set... <br/><br/><textarea id='exportArea' style='width: 100%' rows='5'>" + exportModuleVars() + "</textarea>";
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip()'>Got it</div>";
        if (document.queryCommandSupported('copy')) {
            costText += "<div id='clipBoardBtn' class='btn btn-success'>Copy to Clipboard</div>";
            ondisplay = function() {
                document.getElementById('exportArea').select();
                document.getElementById('clipBoardBtn').addEventListener('click', function(event) {
                    document.getElementById('exportArea').select();
                    try {
                        document.execCommand('copy');
                    } catch (err) {
                        document.getElementById('clipBoardBtn').innerHTML = "Error, not copied";
                    }
                });
            };
        } else {
            ondisplay = function() {
                document.getElementById('exportArea').select();
            };
        }
        costText += "</div>";
    } else if (what == "ImportModuleVars") {
        tooltipText = "Enter your Autotrimps MODULE variable settings to load, and save locally for future use between refreshes:<br/><br/><textarea id='importBox' style='width: 100%' rows='5'></textarea>";
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip(); importModuleVars();'>Import</div><div class='btn btn-info' onclick='cancelTooltip()'>Cancel</div></div>";
        ondisplay = function() {
            document.getElementById('importBox').focus();
        };
    } else if (what == "ATModuleLoad") {
        var mods = document.getElementById('ATModuleListDropdown');
        var modnames = "";
        for (script in mods.selectedOptions) {
            var $item = mods.selectedOptions[script];
            if ($item.value != null) {
                ATscriptLoad(modulepath, $item.value);
                modnames += $item.value + " ";
            }
        }
        tooltipText = "Autotrimps - Loaded the MODULE .JS File(s): " + modnames;
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip();'>OK</div></div>";
    } else if (what == "ATModuleUnload") {
        var mods = document.getElementById('ATModuleListDropdown');
        var modnames = "";
        for (script in mods.selectedOptions) {
            var $item = mods.selectedOptions[script];
            if ($item.value != null) {
                ATscriptUnload($item.value);
                modnames += $item.value + " ";
            }            
        }
        tooltipText = "Autotrimps - UnLoaded the MODULE .JS File(s): " + modnames;
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip();'>OK</div></div>";
    } else if (what == "ResetModuleVars") {
        resetModuleVars();
        tooltipText = "Autotrimps MODULE variable settings have been successfully reset to its defaults!";
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip();'>OK</div></div>";
    } else if (what == 'MagmiteExplain') {
        tooltipText = "<img src='" + basepath + "mi.png'>";
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip();'>Thats all the help you get.</div></div>";
    } else if (what == 'c2table') {
        var c2list={Size:{number:1,percent:getIndividualSquaredReward('Size')+'%',zone:game.c2.Size,percentzone:(100*(game.c2.Size/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Slow:{number:2,percent:getIndividualSquaredReward('Slow')+'%',zone:game.c2.Slow,percentzone:(100*(game.c2.Slow/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Watch:{number:3,percent:getIndividualSquaredReward('Watch')+'%',zone:game.c2.Watch,percentzone:(100*(game.c2.Watch/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Discipline:{number:4,percent:getIndividualSquaredReward('Discipline')+'%',zone:game.c2.Discipline,percentzone:(100*(game.c2.Discipline/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Balance:{number:5,percent:getIndividualSquaredReward('Balance')+'%',zone:game.c2.Balance,percentzone:(100*(game.c2.Balance/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Meditate:{number:6,percent:getIndividualSquaredReward('Meditate')+'%',zone:game.c2.Meditate,percentzone:(100*(game.c2.Meditate/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Metal:{number:7,percent:getIndividualSquaredReward('Metal')+'%',zone:game.c2.Metal,percentzone:(100*(game.c2.Metal/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Lead:{number:8,percent:getIndividualSquaredReward('Lead')+'%',zone:game.c2.Lead,percentzone:(100*(game.c2.Lead/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Nom:{number:9,percent:getIndividualSquaredReward('Nom')+'%',zone:game.c2.Nom,percentzone:(100*(game.c2.Nom/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Electricity:{number:10,percent:getIndividualSquaredReward('Electricity')+'%',zone:game.c2.Electricity,percentzone:(100*(game.c2.Electricity/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Toxicity:{number:11,percent:getIndividualSquaredReward('Toxicity')+'%',zone:game.c2.Toxicity,percentzone:(100*(game.c2.Toxicity/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Coordinate:{number:12,percent:getIndividualSquaredReward('Coordinate')+'%',zone:game.c2.Coordinate,percentzone:(100*(game.c2.Coordinate/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Trimp:{number:13,percent:getIndividualSquaredReward('Trimp')+'%',zone:game.c2.Trimp,percentzone:(100*(game.c2.Trimp/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Obliterated:{number:14,percent:getIndividualSquaredReward('Obliterated')+'%',zone:game.c2.Obliterated,percentzone:(100*(game.c2.Obliterated/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Eradicated:{number:15,percent:getIndividualSquaredReward('Eradicated')+'%',zone:game.c2.Eradicated,percentzone:(100*(game.c2.Eradicated/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Mapology:{number:16,percent:getIndividualSquaredReward('Mapology')+'%',zone:game.c2.Mapology,percentzone:(100*(game.c2.Mapology/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0},Trapper:{number:17,percent:getIndividualSquaredReward('Trapper')+'%',zone:game.c2.Trapper,percentzone:(100*(game.c2.Trapper/(game.global.highestLevelCleared+1))).toFixed(2)+'%',color:0}};
        function c2listcolor(){function a(b,c,d){var e=100*(game.c2[b]/(game.global.highestLevelCleared+1));c2list[b].color=e>=c?"LIMEGREEN":e<c&&e>=d?"GOLD":e<d&&1<=e?"#de0000":"DEEPSKYBLUE"}Object.keys(c2list).forEach(function(b){null!=game.c2[b]&&("Coordinate"===b?a(b,45,38):"Trimp"===b?a(b,45,35):"Obliterated"===b?a(b,25,20):"Eradicated"===b?a(b,14,10):"Mapology"===b?a(b,90,80):"Trapper"===b?a(b,85,75):a(b,95,85))})}
        c2listcolor();
        tooltipText = "<table class='bdTableSm table table-striped'><tbody><tr><td>Name</td><td>Difficulty</td><td>%C2</td><td>Zone</td><td>%HZE</td></tr><tr><td>Size</td><td>" + c2list.Size.number + "</td><td>" + c2list.Size.percent + "</td><td>" + c2list.Size.zone + "</td><td bgcolor='black'><font color=" + c2list.Size.color + ">" + c2list.Size.percentzone + "</td></tr><tr><td>Slow</td><td>" + c2list.Slow.number + "</td><td>" + c2list.Slow.percent + "</td><td>" + c2list.Slow.zone + "</td><td bgcolor='black'><font color=" + c2list.Slow.color + ">" + c2list.Slow.percentzone + "</td></tr><tr><td>Watch</td><td>" + c2list.Watch.number + "</td><td>" + c2list.Watch.percent + "</td><td>" + c2list.Watch.zone + "</td><td bgcolor='black'><font color=" + c2list.Watch.color + ">" + c2list.Watch.percentzone + "</td></tr><tr><td>Discipline</td><td>" + c2list.Discipline.number + "</td><td>" + c2list.Discipline.percent + "</td><td>" + c2list.Discipline.zone + "</td><td bgcolor='black'><font color=" + c2list.Discipline.color + ">" + c2list.Discipline.percentzone + "</td></tr><tr><td>Balance</td><td>" + c2list.Balance.number + "</td><td>" + c2list.Balance.percent + "</td><td>" + c2list.Balance.zone + "</td><td bgcolor='black'><font color=" + c2list.Balance.color + ">" + c2list.Balance.percentzone + "</td></tr><tr><td>Meditate</td><td>" + c2list.Meditate.number + "</td><td>" + c2list.Meditate.percent + "</td><td>" + c2list.Meditate.zone + "</td><td bgcolor='black'><font color=" + c2list.Meditate.color + ">" + c2list.Meditate.percentzone + "</td></tr><tr><td>Metal</td><td>" + c2list.Metal.number + "</td><td>" + c2list.Metal.percent + "</td><td>" + c2list.Metal.zone + "</td><td bgcolor='black'><font color=" + c2list.Metal.color + ">" + c2list.Metal.percentzone + "</td></tr><tr><td>Lead</td><td>" + c2list.Lead.number + "</td><td>" + c2list.Lead.percent + "</td><td>" + c2list.Lead.zone + "</td><td bgcolor='black'><font color=" + c2list.Lead.color + ">" + c2list.Lead.percentzone + "</td></tr><tr><td>Nom</td><td>" + c2list.Nom.number + "</td><td>" + c2list.Nom.percent + "</td><td>" + c2list.Nom.zone + "</td><td bgcolor='black'><font color=" + c2list.Nom.color + ">" + c2list.Nom.percentzone + "</td></tr><tr><td>Electricity</td><td>" + c2list.Electricity.number + "</td><td>" + c2list.Electricity.percent + "</td><td>" + c2list.Electricity.zone + "</td><td bgcolor='black'><font color=" + c2list.Electricity.color + ">" + c2list.Electricity.percentzone + "</td></tr><tr><td>Toxicity</td><td>" + c2list.Toxicity.number + "</td><td>" + c2list.Toxicity.percent + "</td><td>" + c2list.Toxicity.zone + "</td><td bgcolor='black'><font color=" + c2list.Toxicity.color + ">" + c2list.Toxicity.percentzone + "</td></tr><tr><td>Coordinate</td><td>" + c2list.Coordinate.number + "</td><td>" + c2list.Coordinate.percent + "</td><td>" + c2list.Coordinate.zone + "</td><td bgcolor='black'><font color=" + c2list.Coordinate.color + ">" + c2list.Coordinate.percentzone + "</td></tr><tr><td>Trimp</td><td>" + c2list.Trimp.number + "</td><td>" + c2list.Trimp.percent + "</td><td>" + c2list.Trimp.zone + "</td><td bgcolor='black'><font color=" + c2list.Trimp.color + ">" + c2list.Trimp.percentzone + "</td></tr><tr><td>Obliterated</td><td>" + c2list.Obliterated.number + "</td><td>" + c2list.Obliterated.percent + "</td><td>" + c2list.Obliterated.zone + "</td><td bgcolor='black'><font color=" + c2list.Obliterated.color + ">" + c2list.Obliterated.percentzone + "</td></tr><tr><td>Eradicated</td><td>" + c2list.Eradicated.number + "</td><td>" + c2list.Eradicated.percent + "</td><td>" + c2list.Eradicated.zone + "</td><td bgcolor='black'><font color=" + c2list.Eradicated.color + ">" + c2list.Eradicated.percentzone + "</td></tr><tr><td>Mapology</td><td>" + c2list.Mapology.number + "</td><td>" + c2list.Mapology.percent + "</td><td>" + c2list.Mapology.zone + "</td><td bgcolor='black'><font color=" + c2list.Mapology.color + ">" + c2list.Mapology.percentzone + "</td></tr><tr><td>Trapper</td><td>" + c2list.Trapper.number + "</td><td>" + c2list.Trapper.percent + "</td><td>" + c2list.Trapper.zone + "</td><td bgcolor='black'><font color=" + c2list.Trapper.color + ">" + c2list.Trapper.percentzone + "</td></tr><tr><td>Total</td><td> </td><td>" + game.global.totalSquaredReward + "%</td><td> </td><td> </td></tr>    </tbody></table>";
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip();'>Close</div></div>";
    } else if (what == 'ReadSettingsProfiles') {
        titleText = '<b>Loading New AutoTrimps Profile...</b><p>Current Settings will be lost';
        tooltipText = '<b>NOTICE:</b> Switching to new AutoTrimps settings profile!!!! <br>All current settings <b>WILL</b> be lost after this point. <br>You might want to cancel, to go back and save your existing settings first....';
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' style='width: 10vw' onclick='cancelTooltip(); confirmedSwitchNow();'>Confirm and Switch Profiles</div><div style='margin-left: 15%' class='btn btn-info' style='margin-left: 5vw' onclick='cancelTooltip();'>Cancel</div></div>";
    } else if (what == 'ResetDefaultSettingsProfiles') {
        titleText = '<b>Loading AutoTrimps Default Profile...</b><p>Current Settings will be lost!';
        tooltipText = '<b>NOTICE:</b> Switching to Default AutoTrimps settings profile!!!! <br>All current settings <b>WILL</b> be lost after this point. <br>You might want to cancel, to go back and save your existing settings first.... <br>This will <b><u>Reset</u></b> the script to factory settings.';
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' style='width: 10vw' onclick='cancelTooltip(); resetAutoTrimps(); settingsProfiles.selectedIndex = 1;'>Reset to Default Profile</div><div style='margin-left: 15%' class='btn btn-info' style='margin-left: 5vw' onclick='cancelTooltip();'>Cancel</div></div>";
    } else if (what == 'NameSettingsProfiles') {
        titleText = "Enter New Settings Profile Name";
        tooltipText = "What would you like the name of the Settings Profile to be?<br/><br/><textarea id='setSettingsNameTooltip' style='width: 100%' rows='1'></textarea>";
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' style='width: 10vw' onclick='cancelTooltip(); nameAndSaveNewProfile();'>Import</div><div class='btn btn-info' style='margin-left: 5vw' onclick='cancelTooltip();document.getElementById(\"settingsProfiles\").selectedIndex=0;'>Cancel</div></div>";
        ondisplay = function() {
            document.getElementById('setSettingsNameTooltip').focus();
        };
    } else if (what == 'DeleteSettingsProfiles') {
        titleText = "<b>WARNING:</b> Delete Profile???"
        tooltipText = "You are about to delete the <B><U>"+`${settingsProfiles.value}`+"</B></U> settings profile.<br>This will not switch your current settings though. Continue ?<br/>";
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip(); onDeleteProfile();'>Delete Profile</div><div style='margin-left: 15%' class='btn btn-info' onclick='cancelTooltip();'>Cancel</div></div>";
    } else if (what == 'message') {
        titleText = "Generic message";
        tooltipText = event;
        costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' style='width: 50%' onclick='cancelTooltip();'>OK</div></div>";
    }
    game.global.lockTooltip = true;
    $elem.style.left = "33.75%";
    $elem.style.top = "25%";
    document.getElementById("tipTitle").innerHTML = titleText;
    document.getElementById("tipText").innerHTML = tooltipText;
    document.getElementById("tipCost").innerHTML = costText;
    $elem.style.display = "block";
    if (ondisplay !== null)
        ondisplay();
}

function resetAutoTrimps(a,b){ATrunning=!1,setTimeout(function(d){localStorage.removeItem("autoTrimpSettings"),autoTrimpSettings=d?d:{};var e=document.getElementById("settingsRow");e.removeChild(document.getElementById("autoSettings")),e.removeChild(document.getElementById("autoTrimpsTabBarMenu")),automationMenuSettingsInit(),initializeAllTabs(),initializeAllSettings(),initializeSettingsProfiles(),updateCustomButtons(),saveSettings(),checkPortalSettings(),ATrunning=!0}(a),101),a?(debug("Successfully imported new AT settings...","profile"),b?ImportExportTooltip("message","Successfully Imported Autotrimps Settings File!: "+b):ImportExportTooltip("NameSettingsProfiles")):(debug("Successfully reset AT settings to Defaults...","profile"),ImportExportTooltip("message","Autotrimps has been successfully reset to its defaults!"))}
function loadAutoTrimps(){try{var a=document.getElementById("importBox").value.replace(/[\n\r]/gm,""),b=JSON.parse(a);if(null==b)return void debug("Error importing AT settings, the string is empty.","profile")}catch(c){return void debug("Error importing AT settings, the string is bad."+c.message,"profile")}debug("Importing new AT settings file...","profile"),resetAutoTrimps(b)}
function cleanupAutoTrimps(){for(var a in autoTrimpSettings){var b=document.getElementById(autoTrimpSettings[a].id);null==b&&delete autoTrimpSettings[a]}}
function exportModuleVars(){return JSON.stringify(compareModuleVars())}

function compareModuleVars() {
    var diffs = {};
    var mods = Object.keys(MODULES);
    for (var i in mods) {
        var mod = mods[i];
        var vars = Object.keys(MODULES[mods[i]]);
        for (var j in vars) {
            var vj = vars[j];
            var a = MODULES[mod][vj];
            var b = MODULESdefault[mod][vj];
            if (JSON.stringify(a)!=JSON.stringify(b)) {
                if (typeof diffs[mod] === 'undefined')
                    diffs[mod] = {};
                diffs[mod][vj] = a;
            }
        }
    }
    return diffs;
}

function importModuleVars(){try{var thestring=document.getElementById('importBox').value,strarr=thestring.split(/\n/);for(var line in strarr){var s=strarr[line];s=s.substring(0,s.indexOf(';')+1),s=s.replace(/\s/g,''),eval(s),strarr[line]=s}var tmpset=compareModuleVars()}catch(a){return void debug('Error importing MODULE vars, the string is bad.'+a.message,'profile')}localStorage.removeItem('storedMODULES'),safeSetItems('storedMODULES',JSON.stringify(tmpset))}
function resetModuleVars(a){ATrunning=!1,setTimeout(function(){localStorage.removeItem('storedMODULES'),MODULES=JSON.parse(JSON.stringify(MODULESdefault)),safeSetItems('storedMODULES',JSON.stringify(storedMODULES)),ATrunning=!0}(a),101)}
settingsProfileMakeGUI();
initializeSettingsProfiles();
