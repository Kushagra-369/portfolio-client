import json
import random
import joblib
import sys

sys.path.append("../training")

from preprocess import preprocess


model = joblib.load("../models/model.pkl")
vectorizer = joblib.load("../models/vectorizer.pkl")

with open("../data/responses.json", "r") as file:
    responses = json.load(file)
with open("../data/portfolio.json", "r") as file:
    portfolio = json.load(file)

def get_response(user_text):

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
                f"({project['type']})\n"
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


while True:

    user = input("You: ")

    if user.lower() == "exit":
        break

    print("Bot:", get_response(user))