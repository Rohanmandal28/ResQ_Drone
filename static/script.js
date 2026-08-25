const missionLog = document.getElementById("missionLog");

function addLog(message) {
    const item = document.createElement("div");

    item.className = "log-item";

    item.innerHTML = `
        <span>NOW</span>
        ${message}
    `;

    missionLog.prepend(item);
}


// START MISSION
document.getElementById("startMissionBtn").addEventListener("click", function () {

    document.getElementById("missionStatus").textContent = "ACTIVE";

    document.getElementById("droneStatus").textContent = "Mission Started";

    addLog("Rescue mission started.");

    this.textContent = "✓ Mission Active";

});


// SCAN AREA
function scanArea() {

    addLog("Drone started scanning the area.");

    document.getElementById("missionStatus").textContent = "SCANNING";

}


// LOCATE VICTIM
function locateVictim() {

    addLog("AI system searching for possible victims.");

    document.getElementById("missionStatus").textContent = "SEARCHING";

}


// RETURN DRONE
function returnDrone() {

    addLog("Return-to-home command sent.");

    document.getElementById("missionStatus").textContent = "RETURNING";

    document.getElementById("droneStatus").textContent = "Returning Home";

}
