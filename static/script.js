// ===============================
// RESQDRONE DASHBOARD
// ===============================

// -------------------------------
// Backend Status
// -------------------------------

async function updateSystemStatus() {
    try {
        const response = await fetch("/api/status");
        const data = await response.json();

        const droneStatus = document.getElementById("droneStatus");

        if (droneStatus) {
            droneStatus.textContent = data.drone;
        }

    } catch (error) {
        console.error("Backend connection error:", error);
    }
}


// -------------------------------
// Start Mission
// -------------------------------

const startMissionBtn = document.getElementById("startMissionBtn");

if (startMissionBtn) {

    startMissionBtn.addEventListener("click", function () {

        const missionStatus = document.getElementById("missionStatus");
        const droneStatus = document.getElementById("droneStatus");

        if (missionStatus) {
            missionStatus.textContent = "ACTIVE";
        }

        if (droneStatus) {
            droneStatus.textContent = "Mission Active";
        }

        addMissionLog("Drone mission started.");

        simulateTelemetry();
    });
}


// -------------------------------
// Simulated Drone Telemetry
// -------------------------------

let telemetryRunning = false;

function simulateTelemetry() {

    if (telemetryRunning) {
        return;
    }

    telemetryRunning = true;

    updateTelemetry();

    setInterval(updateTelemetry, 2000);
}


function updateTelemetry() {

    const altitude = (15 + Math.random() * 10).toFixed(1);
    const speed = (15 + Math.random() * 10).toFixed(1);
    const battery = Math.floor(80 + Math.random() * 10);

    const latitude = (22.57 + Math.random() * 0.01).toFixed(6);
    const longitude = (88.36 + Math.random() * 0.01).toFixed(6);

    const altitudeElement = document.getElementById("altitude");
    const speedElement = document.getElementById("speed");
    const batteryElement = document.getElementById("battery");
    const gpsElement = document.getElementById("gps");
    const locationElement = document.getElementById("location");

    if (altitudeElement) {
        altitudeElement.textContent = altitude + " m";
    }

    if (speedElement) {
        speedElement.textContent = speed + " km/h";
    }

    if (batteryElement) {
        batteryElement.textContent = battery + " %";
    }

    if (gpsElement) {
        gpsElement.textContent = "LOCKED";
    }

    if (locationElement) {
        locationElement.textContent =
            latitude + ", " + longitude;
    }
}


// -------------------------------
// Mission Actions
// -------------------------------

function scanArea() {

    addMissionLog("Area scanning initiated.");

    const aiStatus = document.getElementById("aiStatus");

    if (aiStatus) {
        aiStatus.textContent = "Scanning";
    }
}


function locateVictim() {

    addMissionLog("Victim location analysis initiated.");

    const aiStatus = document.getElementById("aiStatus");

    if (aiStatus) {
        aiStatus.textContent = "Searching";
    }
}


function returnDrone() {

    addMissionLog("Return-to-home command issued.");

    const missionStatus = document.getElementById("missionStatus");
    const droneStatus = document.getElementById("droneStatus");

    if (missionStatus) {
        missionStatus.textContent = "RETURNING";
    }

    if (droneStatus) {
        droneStatus.textContent = "Returning";
    }
}


// -------------------------------
// Mission Log
// -------------------------------

function addMissionLog(message) {

    const missionLog = document.getElementById("missionLog");

    if (!missionLog) {
        return;
    }

    const logItem = document.createElement("div");

    logItem.className = "log-item";

    logItem.innerHTML = `
        <span>NOW</span>
        ${message}
    `;

    missionLog.prepend(logItem);
}


// -------------------------------
// YOLOv8 AI IMAGE ANALYSIS
// -------------------------------

async function analyzeImage() {

    const imageInput = document.getElementById("imageInput");
    const aiStatus = document.getElementById("aiStatus");
    const analysisStatus =
        document.getElementById("aiAnalysisStatus");

    const peopleCount =
        document.getElementById("peopleCount");

    const riskScore =
        document.getElementById("riskScore");

    const riskZone =
        document.getElementById("riskZone");

    const emergencyLevel =
        document.getElementById("emergencyLevel");

    const analyzeBtn =
        document.getElementById("analyzeBtn");


    // Check image
    if (!imageInput || !imageInput.files.length) {

        alert("Please select a drone image first.");

        return;
    }


    // Get selected image
    const image = imageInput.files[0];


    // Prepare FormData
    const formData = new FormData();

    formData.append("image", image);


    // Update UI
    if (aiStatus) {
        aiStatus.textContent = "Analyzing";
    }

    if (analysisStatus) {
        analysisStatus.textContent = "Analyzing image...";
    }

    if (analyzeBtn) {
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = "⏳ Analyzing...";
    }

    addMissionLog("AI image analysis started.");


    try {

        // Send image to Flask backend
        const response = await fetch("/api/detect", {
            method: "POST",
            body: formData
        });


        const data = await response.json();


        // Handle backend error
        if (!response.ok || !data.success) {

            throw new Error(
                data.error || "AI analysis failed."
            );
        }


        // ---------------------------
        // Detection Result
        // ---------------------------

        const detection = data.detection;

        const risk = data.risk;


        // People count
        if (peopleCount) {

            peopleCount.textContent =
                detection.people_count;
        }


        // Risk score
        if (riskScore) {

            riskScore.textContent =
                risk.risk_score;
        }


        // Risk zone
        if (riskZone) {

            riskZone.textContent =
                risk.risk_zone;
        }


        // Update emergency level
        if (emergencyLevel) {

            emergencyLevel.textContent =
                risk.risk_zone;
        }


        // AI status
        if (aiStatus) {

            aiStatus.textContent =
                "Detection Complete";
        }


        if (analysisStatus) {

            analysisStatus.textContent =
                "Analysis complete";
        }


        addMissionLog(
            "AI detected " +
            detection.people_count +
            " person(s)."
        );


        addMissionLog(
            "Risk zone classified as " +
            risk.risk_zone +
            "."
        );


    } catch (error) {

        console.error("AI Detection Error:", error);


        if (aiStatus) {
            aiStatus.textContent = "Error";
        }

        if (analysisStatus) {
            analysisStatus.textContent =
                "Analysis failed";
        }

        alert(
            "AI analysis failed: " +
            error.message
        );


    } finally {

        if (analyzeBtn) {

            analyzeBtn.disabled = false;

            analyzeBtn.textContent =
                "🤖 Analyze Image";
        }
    }
}


// -------------------------------
// Initialize Dashboard
// -------------------------------

updateSystemStatus();

setInterval(updateSystemStatus, 5000);
