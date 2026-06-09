from sentence_transformers import SentenceTransformer
import json
import os
import joblib

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

DATA_DIR = os.path.join(BASE_DIR, "data")
MODELS_DIR = os.path.join(BASE_DIR, "models")

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

with open(
    os.path.join(DATA_DIR, "portfolio.json"),
    "r"
) as file:
    portfolio = json.load(file)

documents = []
metadata = []

# Skills
for skill, description in portfolio["skill_details"].items():

    documents.append(
        f"{skill} {description}"
    )

    metadata.append({
        "type": "skill",
        "name": skill,
        "response": description
    })

# Projects
for project in portfolio["projects"]:

    documents.append(
        f"{project['name']} "
        f"{project['description']} "
        f"{' '.join(project['tools'])}"
    )

    metadata.append({
        "type": "project",
        "name": project["name"],
        "response": project
    })

embeddings = model.encode(
    documents,
    convert_to_numpy=True
)

joblib.dump(
    embeddings,
    os.path.join(
        MODELS_DIR,
        "embeddings.pkl"
    )
)

joblib.dump(
    metadata,
    os.path.join(
        MODELS_DIR,
        "metadata.pkl"
    )
)

print("Embeddings created successfully")
print("Total documents:", len(documents))