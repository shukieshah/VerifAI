from flask import Flask, jsonify, request
import utils
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/verifai')
@cross_origin()
def verifai():
    url = request.args.get('url', '')
    text = request.args.get('text', '')
    clean_text = utils.clean(text)

    return jsonify({
                    'url': url,
                    'text': text,
                    'is_trusted_url': utils.is_trusted_url(url, trusted_sources),
                    'is_trusted_text': utils.predict_label(clean_text, model, tokenizer)
                    })

if __name__ == '__main__':
    # Load a trained, fine-tuned model and vocabulary
    model, tokenizer = utils.initialize_model('saved_model_grover_b')
    with open('trusted_sources.json') as f:
        trusted_sources = json.load(f)

    app.run()
