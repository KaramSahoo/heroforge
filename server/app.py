# app.py

from flask import Flask, g
from flask_cors import CORS
from blueprints.generate import generate_bp

from config import config

from langchain_openai import ChatOpenAI

from dotenv import load_dotenv
load_dotenv()


llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)

app = Flask(__name__)
app.config.from_object(config)

cors = CORS(app, origins="*")

@app.before_request
def before_request():
    print("Initializing LLM model...")
    g.llm_model = llm
    print("LLM model initialized!")


# Register all blueprints
app.register_blueprint(generate_bp, url_prefix='/generate')

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'], port=app.config['PORT'])