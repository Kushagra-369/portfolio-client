import joblib
import sys
import os

sys.path.append("../training")

from preprocess import preprocess


model = joblib.load("../models/model.pkl")
vectorizer = joblib.load("../models/vectorizer.pkl")


def predict(text):
    cleaned = preprocess(text)

    X = vectorizer.transform([cleaned])

    prediction = model.predict(X)[0]

    return prediction


if __name__ == "__main__":
    user_input = input("You: ")

    print("Intent:", predict(user_input))