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


// Get status from Flask backend
async function updateSystemStatus() {
    try {
        const response = await fetch("/api/status");

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        // Update drone status
        document.getElementById("droneStatus").textContent = data.drone;

        // Update mission status
        document.getElementById("missionStatus").textContent = data.mission;

        // Update system status
        const systemStatus = document.querySelector(".system-status");

        if (data.system === "Online") {
            systemStatus.textContent = "● System Online";
        } else {
            systemStatus.textContent = "● System Offline";
        }

    } catch (error) {
        console.error("Backend connection error:", error);

        document.querySelector(".system-status").textContent =
            "● Backend Offline";
    }
}


document.getElementById("startMissionBtn").addEventListener("click", function () {

    document.getElementById("missionStatus").textContent = "ACTIVE";

    document.getElementById("droneStatus").textContent = "Mission Started";

    addLog("Rescue mission started.");

    this.textContent = "✓ Mission Active";

});


function scanArea() {

    addLog("Drone started scanning the area.");

    document.getElementById("missionStatus").textContent = "SCANNING";

}


function locateVictim() {

    addLog("AI system searching for possible victims.");

    document.getElementById("missionStatus").textContent = "SEARCHING";

}


function returnDrone() {

    addLog("Return-to-home command sent.");

    document.getElementById("missionStatus").textContent = "RETURNING";

    document.getElementById("droneStatus").textContent = "Returning Home";

}

updateSystemStatus();


setInterval(updateSystemStatus, 5000);
