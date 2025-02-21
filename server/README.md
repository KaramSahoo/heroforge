# 🚀 HeroForge

Welcome to **HeroForge** – an **Agentic AI Workflow** for generating and managing AI-powered content with structured automation. This project orchestrates AI agents to craft and validate dynamic narratives through modular workflows.

## 📂 Project Structure

```plaintext
heroforge/
│── server/
│   │── app.py          # Main Flask application
│   │── agents/         # AI agent implementations
│   │── blueprints/     # Flask blueprints for modular routes
│   │── config/         # Configuration files
│   │── database/       # Database models and queries
│   │── helpers/        # Utility functions
│   │── prompts/        # AI prompt templates
│   │── utils/          # Loggers and schema definitions
│   │── workflows/      # Agentic AI Workflow logic
│   │── .env            # Environment variables (OpenAI API key, etc.)
│   └── requirements.txt # Dependencies
```

## ⚡ Quick Setup

Follow these steps to set up and run the **HeroForge** server:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/KaramSahoo/heroforge.git
cd heroforge/server
```

### 2️⃣ Create a Virtual Environment & Install Dependencies

```bash
python3 -m venv venv
source venv/bin/activate   # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file inside `server/` and add your **OpenAI API Key**:

```ini
OPENAI_API_KEY=your_openai_api_key_here
```

### 4️⃣ Run the Application

```bash
python app.py
```

The server should now be running at: **`http://127.0.0.1:8000`** 🚀

## 🎯 Using the API
### 🔹 Generate a Mission Story
Send a `POST` request to `/generate` with a JSON payload containing the `mission` field.

#### Example Request:
```sh
curl -X POST "http://127.0.0.1:5000/generate" \
     -H "Content-Type: application/json" \
     -d '{"mission": "Save the city from an alien invasion"}'
```

## 🛠 Features

- **Agentic AI Workflows**: Automated pipelines to generate and manage AI-driven content.
- **Modular Flask Blueprints**: Organized API structure for scalability.
- **Integrated Logging & Schemas**: Improved debugging and structured data validation.
- **Dynamic AI Prompts**: Optimized for context-aware responses.
- **Database-Backed Storage**: Efficient query handling and data persistence.

## 🏗 Future Enhancements

- 📌 Expand multi-agent collaboration.
- 🚀 Optimize inference pipelines for real-time interactions.

---

💡 **Contributions Welcome!** Open a PR or issue to help improve **HeroForge**. Happy coding! 🤖✨
