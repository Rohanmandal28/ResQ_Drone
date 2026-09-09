from flask import Flask, render_template, jsonify, request
from ai.yolo_detection import detect_people
from ai.risk_detection import calculate_risk
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/status")
def status():
    return jsonify({
        "drone": "Not Connected",
        "mission": "Ready",
        "system": "Online"
    })


@app.route("/api/detect", methods=["POST"])
def detect():
    if "image" not in request.files:
        return jsonify({
            "success": False,
            "error": "No image uploaded"
        }), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({
            "success": False,
            "error": "No image selected"
        }), 400

    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)

    try:
        # Step 1: YOLOv8 person detection
        detection = detect_people(image_path)

        people_count = detection["people_count"]

        # Step 2: Risk calculation
        # Currently hazard=False and accessibility=1.0
        # These values will be replaced with AI/map data later.
        risk = calculate_risk(
            people_count=people_count,
            hazard_detected=False,
            accessibility=1.0
        )

        return jsonify({
            "success": True,
            "detection": detection,
            "risk": risk
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
