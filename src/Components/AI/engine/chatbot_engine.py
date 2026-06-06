import json
import random
import joblib
import os
import sys

# ========== ADD THIS - UTILS IMPORT ==========
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "utils"))
from response_builder import (
    format_skills,
    format_projects,
    format_achievements,
    format_education,
    format_contact,
    format_about_me,
    get_project_details
)

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

TRAINING_DIR = os.path.join(
    BASE_DIR,
    "training"
)

MODELS_DIR = os.path.join(
    BASE_DIR,
    "models"
)

DATA_DIR = os.path.join(
    BASE_DIR,
    "data"
)

sys.path.append(TRAINING_DIR)

from preprocess import preprocess

model = joblib.load(
    os.path.join(
        MODELS_DIR,
        "model.pkl"
    )
)

vectorizer = joblib.load(
    os.path.join(
        MODELS_DIR,
        "vectorizer.pkl"
    )
)

with open(
    os.path.join(
        DATA_DIR,
        "responses.json"
    ),
    "r"
) as file:
    responses = json.load(file)

with open(
    os.path.join(
        DATA_DIR,
        "portfolio.json"
    ),
    "r"
) as file:
    portfolio = json.load(file)


def get_response(user_text):
    text = user_text.lower()
    
    # ========== PRIVACY BLOCKING (SAME) ==========
    for topic in portfolio["privacy"]["blocked_topics"]:
        if topic in text:
            # Using new personalized blocked responses if available
            if "personal_blocked" in responses:
                return random.choice(responses["personal_blocked"])
            return (
                "Sorry, I cannot reveal personal information "
                "about Kushagra. I can only discuss his "
                "professional profile, skills, projects, "
                "education and achievements."
            )
    
    # ========== PROJECT DETAILS (UPDATED - USING NEW FUNCTION) ==========
    for project in portfolio["projects"]:
        if project["name"].lower() in text:
            detailed = get_project_details(project["name"])
            if detailed:
                return detailed
    
    # ========== KEYWORD CHECKS (UPDATED - USING NEW FORMATTERS) ==========
    if "achievement" in text:
        return format_achievements()
    
    if "education" in text or "cgpa" in text:
        return format_education()
    
    if "contact" in text or "email" in text:
        return format_contact()
    
    if "skill" in text:
        return format_skills()
    
    # ========== ML INTENT CLASSIFICATION (SAME LOGIC, UPDATED FORMATTERS) ==========
    cleaned = preprocess(user_text)
    X = vectorizer.transform([cleaned])
    intent = model.predict(X)[0]
    
    # Using new formatters for better output
    if intent == "about_me":
        return format_about_me()
    
    if intent == "skills":
        return format_skills()
    
    if intent == "projects":
        return format_projects(is_detailed=False)
    
    if intent == "education":
        return format_education()
    
    if intent == "contact":
        return format_contact()
    
    if intent == "achievements":
        return format_achievements()
    
    if intent == "personal_question":
        if "personal_blocked" in responses:
            return random.choice(responses["personal_blocked"])
        return (
            "Sorry, I can only discuss "
            "Kushagra's professional profile, "
            "skills, projects and achievements."
        )
    
    # ========== GREETING, CASUAL, GOODBYE, FALLBACK (SAME) ==========
    if intent in responses:
        return random.choice(responses[intent])
    
    return random.choice(responses["fallback"])


if __name__ == "__main__":
    print("\n" + "="*50)
    print("🤖 KUBOC - Kushagra's AI Assistant")
    print("="*50)
    print("Type 'exit' to quit\n")
    
    while True:
        user = input("You: ")
        
        if user.lower() == "exit":
            print("Bot: Goodbye! 👋")
            break
        
        response = get_response(user)
        print(f"Bot: {response}\n")