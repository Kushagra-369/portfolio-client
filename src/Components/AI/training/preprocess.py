import re

def preprocess(text):

    text = text.lower()

    text = text.replace("ml", "machine learning")
    text = text.replace("ai", "artificial intelligence")

    text = re.sub(r"[^\w\s]", "", text)

    text = " ".join(text.split())

    return text