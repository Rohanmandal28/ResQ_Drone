from ultralytics import YOLO

# Load YOLOv8 nano model
model = YOLO("yolov8n.pt")


def detect_people(image_path):
    results = model(image_path, verbose=False)

    people = []

    for result in results:
        for box in result.boxes:

            class_id = int(box.cls[0])
            confidence = float(box.conf[0])

            # COCO class 0 = person
            if class_id == 0:

                x1, y1, x2, y2 = map(
                    int,
                    box.xyxy[0]
                )

                people.append({
                    "confidence": round(confidence, 2),
                    "box": [
                        x1,
                        y1,
                        x2,
                        y2
                    ]
                })

    return {
        "people_count": len(people),
        "people": people
    }
