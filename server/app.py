# app.py

from flask import Flask, g
from flask_cors import CORS
from blueprints.generate import generate_bp
from utils.logger import logger
from config import config
from langchain_openai import ChatOpenAI

from database.connection import close_db, get_db, init_db


from dotenv import load_dotenv
load_dotenv()


llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)
db_initialized = False

app = Flask(__name__)
app.config.from_object(config)

cors = CORS(app, origins="*")

@app.before_request
def setup_llm():
    logger.info("Initializing LLM model...")
    # Initialize the LLM model here
    llm_initialized = True
    g.llm_model = llm
    logger.info("LLM model initialized.")

@app.before_request
def setup_db():
    """Ensures MongoDB is initialized only once."""
    global db_initialized
    if not db_initialized:
        init_db()
        db_initialized = True

@app.teardown_appcontext
def teardown_db(exception):
    """Close database connection after request."""
    close_db(exception)


# Register all blueprints
app.register_blueprint(generate_bp, url_prefix='/generate')

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'], port=app.config['PORT'])