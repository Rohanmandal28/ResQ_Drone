def calculate_risk(people_count, hazard_detected=False, accessibility=1.0):
    """
    Calculate disaster risk based on:
    - Number of detected people
    - Hazard presence
    - Accessibility of the area
    """

    # More people = higher priority
    people_score = min(people_count * 5, 50)

    # Hazard increases risk
    hazard_score = 30 if hazard_detected else 0

    # Lower accessibility = higher risk
    accessibility_score = (1 - accessibility) * 20

    risk_score = people_score + hazard_score + accessibility_score

    # Keep score between 0 and 100
    risk_score = min(max(risk_score, 0), 100)

    # Determine risk zone
    if risk_score >= 80:
        zone = "CRITICAL"
    elif risk_score >= 60:
        zone = "HIGH"
    elif risk_score >= 40:
        zone = "MEDIUM"
    else:
        zone = "LOW"

    return {
        "risk_score": round(risk_score, 2),
        "risk_zone": zone
    }
