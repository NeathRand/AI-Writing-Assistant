from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY") # Use getenv after load_dotenv
if not openai.api_key or openai.api_key == "Your_openai_api_key_here":
    print("Warning: OPENAI_API_KEY is not set or is still the dummy key in .env. OpenAI features will not work.")

# Initialize spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("spaCy model 'en_core_web_sm' not found. Please download it by running: python -m spacy download en_core_web_sm")
    nlp = None

@app.route('/')
def home():
    return "AI Writing Assistant Backend"

@app.route('/api/restructure', methods=['POST'])
def restructure_sentence():
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({"error": "No text provided"}), 400
    if not openai.api_key:
        return jsonify({"error": "OpenAI API key not configured"}), 500

    try:
        prompt = f"Restructure the following sentence(s) to improve clarity and flow, while maintaining the original meaning:\n\n{text}\n\nRestructured:"
        response = openai.Completion.create(
            engine="text-davinci-003", 
            prompt=prompt,
            max_tokens=150,
            temperature=0.7
        )
        restructured_text = response.choices[0].text.strip()
        return jsonify({"restructured_text": restructured_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/adjust_tone', methods=['POST'])
def adjust_tone_text():
    data = request.get_json()
    text = data.get('text')
    tone = data.get('Tone', 'Neutral', 'Formal', 'Casual', 'Confident', 'Friendly')

    if not text:
        return jsonify({"error": "No text provided"}), 400
    if not openai.api_key:
        return jsonify({"error": "OpenAI API key not configured"}), 500

    try:
        prompt = f"Adjust the tone of the following text to be more {tone}:\n\n{text}\n\nAdjusted text:"
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=len(text.split()) + 50, 
            temperature=0.7
        )
        adjusted_text = response.choices[0].text.strip()
        return jsonify({"adjusted_text": adjusted_text, "tone": tone})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/check_plagiarism', methods=['POST'])
def check_plagiarism_text():
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Placeholder for plagiarism detection
    mock_sources = []
    if len(text) > 50: # Arbitrary condition for mock
        mock_sources.append({
            "url": "http://example.com/source1",
            "similarity": "0.85",
            "snippet": text[:100] + "..." # Show a snippet
        })

    if not mock_sources:
        return jsonify({
            "message": "No potential plagiarism detected (mock response).",
            "sources": []
        })
    else:
        return jsonify({
            "message": "Potential plagiarism matches found (mock response).",
            "sources": mock_sources
        })

if __name__ == '__main__':
    if nlp is None:
        print("Please install the spaCy model 'en_core_web_sm' to run the backend effectively.")
        print("Run: python -m spacy download en_core_web_sm")
    app.run(debug=True, port=5001) 
