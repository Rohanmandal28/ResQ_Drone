const missionLog = document.getElementById("missionLog");

let missionActive = false;
let simulationRunning = false;

// Add message to mission log
function addLog(message) {
    const item = document.createElement("div");

    item.className = "log-item";

    item.innerHTML = `
        <span>NOW</span>
        ${message}
    `;

    missionLog.prepend(item);
}


// ------------------------------
// SIMULATED DRONE TELEMETRY
// ------------------------------

let telemetry = {
    altitude: 18.5,
    speed: 21.8,
    battery: 87,
    gps: "GPS LOCKED"
};


// Update telemetry on dashboard
function updateTelemetry() {

    document.getElementById("altitude").textContent =
        telemetry.altitude.toFixed(1) + " m";

    document.getElementById("speed").textContent =
        telemetry.speed.toFixed(1) + " km/h";

    document.getElementById("battery").textContent =
        telemetry.battery + " %";

    document.getElementById("gps").textContent =
        telemetry.gps;
}


// Simulate changing drone data
function simulateTelemetry() {

    if (!simulationRunning) {
        return;
    }

    // Small realistic changes
    telemetry.altitude += (Math.random() - 0.5) * 1.5;

    telemetry.speed += (Math.random() - 0.5) * 2;

    telemetry.battery -= 0.05;

    // Keep values within reasonable limits
    telemetry.altitude = Math.max(5, Math.min(50, telemetry.altitude));

    telemetry.speed = Math.max(5, Math.min(35, telemetry.speed));

    telemetry.battery = Math.max(0, telemetry.battery);

    updateTelemetry();
}


// ------------------------------
// START MISSION
// ------------------------------

document.getElementById("startMissionBtn").addEventListener("click", function () {

    missionActive = true;
    simulationRunning = true;

    document.getElementById("missionStatus").textContent = "ACTIVE";

    document.getElementById("droneStatus").textContent =
        "Mission Started";

    addLog("Rescue mission started.");

    addLog("Simulated drone telemetry activated.");

    this.textContent = "✓ Mission Active";

    updateTelemetry();
});


// ------------------------------
// SCAN AREA
// ------------------------------

function scanArea() {

    if (!missionActive) {
        addLog("Start the mission before scanning.");
        return;
    }

    addLog("Drone started scanning the area.");

    document.getElementById("missionStatus").textContent =
        "SCANNING";
}


// ------------------------------
// LOCATE VICTIM
// ------------------------------

function locateVictim() {

    if (!missionActive) {
        addLog("Start the mission before victim detection.");
        return;
    }

    addLog("AI system searching for possible victims.");

    document.getElementById("missionStatus").textContent =
        "SEARCHING";
}


// ------------------------------
// RETURN DRONE
// ------------------------------

function returnDrone() {

    addLog("Return-to-home command sent.");

    document.getElementById("missionStatus").textContent =
        "RETURNING";

    document.getElementById("droneStatus").textContent =
        "Returning Home";

    simulationRunning = false;
}


// ------------------------------
// INITIAL TELEMETRY
// ------------------------------

updateTelemetry();


// Update simulated telemetry every 2 seconds
setInterval(simulateTelemetry, 2000);
