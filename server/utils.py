from urllib.parse import urlparse
import keras
import torch
import json
from keras.preprocessing.sequence import pad_sequences
from transformers import BertForSequenceClassification, BertTokenizer
import nltk
import string
import re
from nltk.corpus import stopwords


def initialize_model(model_dir):
    model = BertForSequenceClassification.from_pretrained(model_dir)
    tokenizer = BertTokenizer.from_pretrained(model_dir)
    return model, tokenizer


def is_trusted_url(url, trusted_sources):
    domain = urlparse(url).netloc
    return domain in trusted_sources

def clean(text):
    nltk_stopwords = stopwords.words('english')

    # Making all characters lowercase
    text = text.lower()

    clean = []
    for word in text.split():
        for char in '!"$%&\'()*+,-./:;<=>?@[\\]“”^_`{|}~’': # optional: !
            word = word.replace(char, '')
        clean.append(word)

    # Removing all stop words
    clean = [word for word in clean if word not in nltk_stopwords]

    # Removing all numerical digits
    for i in range(len(clean)):
        word = clean[i]
        for d in string.digits:
            word = word.replace(d, '')
        clean[i] = word

    # Removing all single-character words
    clean = [word for word in clean if len(word) != 1]
    clean_text = " ".join(clean)

    # take out emojis
    clean_text = clean_text.encode('ascii', 'ignore').decode('ascii')
    clean_text = clean_text.strip()

    return clean_text

def predict_label(text, model, tokenizer):
    input_ids = []
    attention_masks = []
    encoded_text = tokenizer.encode(
                        text,
                        add_special_tokens = True,
                        max_length = 512
                   )
    input_ids.append(encoded_text)
    input_ids = pad_sequences(input_ids, maxlen=256, dtype="long",
                            value=0, truncating="post", padding="post")


    attention_masks = []
    att_mask = [int(token_id > 0) for token_id in input_ids[0]]
    attention_masks.append(att_mask)

    inputs = torch.tensor(input_ids)
    attention_masks = torch.tensor(attention_masks)

    pred = model(inputs, token_type_ids=None,
                      attention_mask=attention_masks)[0].argmax().item()

    return pred == 1.0
