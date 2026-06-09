import json
import random
import joblib
import os
import sys
# import numpy as np
# from sentence_transformers import SentenceTransformer
from rapidfuzz import process
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

# embeddings = joblib.load(
#     os.path.join(
#         MODELS_DIR,
#         "embeddings.pkl"
#     )
# )

# metadata = joblib.load(
#     os.path.join(
#         MODELS_DIR,
#         "metadata.pkl"
#     )
# )

# semantic_model = SentenceTransformer(
#     "all-MiniLM-L6-v2"
# )

# def semantic_search(query):

#     query_embedding = semantic_model.encode(
#         query,
#         convert_to_numpy=True
#     )

#     similarities = np.dot(
#         embeddings,
#         query_embedding
#     )

#     best_idx = np.argmax(
#         similarities
#     )

#     best_score = similarities[
#         best_idx
#     ]

#     return (
#         metadata[best_idx],
#         best_score
#     )

def get_response(user_text):

    text = user_text.lower()
    all_skills = portfolio["skill_details"].keys()

    best_match = process.extractOne(
        text,
        all_skills
    )
    
    project_names = [
        p["name"] for p in portfolio["projects"]
    ]

    project_match = process.extractOne(
        text,
        project_names
    )

    if project_match and project_match[1] > 70:

        return get_project_details(
            project_match[0]
        )

    if best_match and best_match[1] > 80:
        return portfolio["skill_details"][
            best_match[0]
        ]
    
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

    for skill, description in portfolio["skill_details"].items():

        skill_key = skill.lower().replace(".", "").replace(" ", "")

        user_query = text.replace(".", "").replace(" ", "")

        if skill_key in user_query:

            return description

    # ========== PROJECT DETAILS (UPDATED - USING NEW FUNCTION) ==========
    for project in portfolio["projects"]:
        if project["name"].lower() in text:
            detailed = get_project_details(project["name"])
            if detailed:
                return detailed
    
    # ========== KEYWORD CHECKS (UPDATED - USING NEW FORMATTERS) ==========
    achievement_words = [
        "achievement",
        "achievements",
        "dsa",
        "problem solved",
        "problems solved",
        "hackathon"
    ]   

    if any(word in text for word in achievement_words):
        return format_achievements()
    
    education_words = [
        "education",
        "study",
        "studies",
        "college",
        "degree",
        "cgpa",
        "btech",
        "qualification"
    ]

    if any(word in text for word in education_words):
        return format_education()
    
    contact_words = [
        "contact",
        "email",
        "mail",
        "reach",
        "linkedin",
        "github",
        "leetcode"
    ]

    if any(word in text for word in contact_words):
        return format_contact()
    
    about_words = [
        "about",
        "who is",
        "introduce",
        "introduction",
        "profile"
    ]

    if any(word in text for word in about_words):
        return format_about_me()

    keywords = {
        "skills": format_skills,
        "projects": lambda: format_projects(False),
        "education": format_education,
        "contact": format_contact,
        "achievements": format_achievements
    }

    best_keyword = process.extractOne(
        text,
        keywords.keys()
    )

    if best_keyword and best_keyword[1] > 80:
        return keywords[
            best_keyword[0]
        ]()


    # match, score = semantic_search(
    #     user_text
    # )
    # print("MATCH =", match)
    # print("SCORE =", score)
    # if score < 0.3:
    #     return random.choice(
    #         responses["fallback"]
    #     )


    # if score > 0.3:

    #     if match["type"] == "skill":

    #         return match["response"]

    #     if match["type"] == "project":

    #         project = match["response"]

    #         return (
    #             f"🚀 {project['name']}\n\n"
    #             f"📂 Category: {project['category']}\n\n"
    #             f"📝 {project['description']}\n\n"
    #             f"🛠️ {', '.join(project['tools'])}\n\n"
    #             f"🔗 {project['github']}\n\n"
    #             f"🌐 {project['live']}"
    #         )
    
    # ========== ML INTENT CLASSIFICATION (SAME LOGIC, UPDATED FORMATTERS) ==========
    cleaned = preprocess(user_text)
    X = vectorizer.transform([cleaned])
    intent = model.predict(X)[0]
    probabilities = model.predict_proba(X)[0]

    confidence = max(probabilities)


    print("RAW =", user_text)
    print("INTENT =", intent)
    print("CONFIDENCE =", confidence)

    if intent == "greeting":
        return random.choice(responses["greeting"])

    if intent == "goodbye":
        return random.choice(responses["goodbye"])

    if intent == "casual":
        return random.choice(responses["casual"])

    if confidence < 0.20:
        return random.choice(responses["fallback"])

    
    # Using new formatters for better output
    if intent == "about_me":
        return format_about_me()
    
    if intent == "skills":
        return format_skills()
    


    print("INTENT =", intent)
    print("CONFIDENCE =", confidence)
    
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