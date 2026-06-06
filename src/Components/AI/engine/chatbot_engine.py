import json
import random
import joblib
import os
import sys

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
    

    for topic in portfolio["privacy"]["blocked_topics"]:

        if topic in text:

            return (
                "Sorry, I cannot reveal personal information "
                "about Kushagra. I can only discuss his "
                "professional profile, skills, projects, "
                "education and achievements."
            )

    for project in portfolio["projects"]:

        if project["name"].lower() in text:

            return (
                f"Project: {project['name']}\n\n"
                f"Category: {project['category']}\n\n"
                f"Description: {project['description']}\n\n"
                f"Technologies: {', '.join(project['tools'])}\n\n"
                f"GitHub: {project['github']}\n"
                f"Live Demo: {project['live']}"
            )

    if "achievement" in text:

        return "\n".join(
        portfolio["achievements"]
        )


    if "education" in text or "cgpa" in text:

        return (
            f"Degree: {portfolio['education']['degree']}\n"
            f"CGPA: {portfolio['education']['cgpa']}"
        )


    if "contact" in text or "email" in text:

        return (
            f"Email: {portfolio['contact']['email']}\n"
            f"GitHub: {portfolio['profiles']['github']}\n"
            f"LinkedIn: {portfolio['profiles']['linkedin']}"
        )


    if "skill" in text:

        skills = []

        skills.extend(portfolio["skills"]["frontend"])
        skills.extend(portfolio["skills"]["backend"])
        skills.extend(portfolio["skills"]["database"])
        skills.extend(portfolio["skills"]["devops"])
        skills.extend(portfolio["skills"]["languages"])

        return (
            "Kushagra's Skills:\n\n" +
            ", ".join(skills)
        )




    cleaned = preprocess(user_text)


    X = vectorizer.transform([cleaned])

    intent = model.predict(X)[0]
 

    if intent == "about_me":
        return portfolio["about"]["summary"]

    if intent == "skills":

        skills = []

        skills.extend(
            portfolio["skills"]["frontend"]
        )

        skills.extend(
            portfolio["skills"]["backend"]
        )

        skills.extend(
            portfolio["skills"]["database"]
        )

        skills.extend(
            portfolio["skills"]["devops"]
        )

        skills.extend(
            portfolio["skills"]["languages"]
        )

        return (
            "Kushagra's Skills:\n\n" +
            ", ".join(skills)
        )

    if intent == "projects":

        result = "Projects:\n\n"

        for project in portfolio["projects"]:

            result += (
                f"{project['name']} "
                f"({project['category']})\n"
            )

        return result

    if intent == "education":

        return (
            f"Degree: {portfolio['education']['degree']}\n"
            f"CGPA: {portfolio['education']['cgpa']}"
        )

    if intent == "contact":

        return (
            f"Email: {portfolio['contact']['email']}\n"
            f"GitHub: {portfolio['profiles']['github']}\n"
            f"LinkedIn: {portfolio['profiles']['linkedin']}"
        )

    if intent == "achievements":

        return "\n".join(
            portfolio["achievements"]
        )

    if intent == "personal_question":

        return (
            "Sorry, I can only discuss "
            "Kushagra's professional profile, "
            "skills, projects and achievements."
        )

    return random.choice(
        responses[intent]
    )


if __name__ == "__main__":

    while True:

        user = input("You: ")

        if user.lower() == "exit":
            break

        print("Bot:", get_response(user))