import json
import joblib

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

from preprocess import preprocess


# Load Dataset
with open("../data/dataset.json", "r") as file:
    data = json.load(file)


texts = []
labels = []

for item in data:
    texts.append(preprocess(item["text"]))
    labels.append(item["intent"])


# TF-IDF
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)


# Model
model = LogisticRegression()
model.fit(X, labels)


# Save
joblib.dump(model, "../models/model.pkl")
joblib.dump(vectorizer, "../models/vectorizer.pkl")

print("Training Complete")
print("Samples:", len(texts))