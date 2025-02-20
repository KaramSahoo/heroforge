from flask import Blueprint, request, jsonify, g
from workflows.workflow import Workflow
from utils.logger import logger

# Create a Blueprint named 'prompts'
generate_bp = Blueprint('generate', __name__)

# Route 1: GET request to test the connection
@generate_bp.route('/test', methods=['GET'])
def generate_response():
    return jsonify({"message": "Success"}), 200

# Route 2: POST request to handle mission input
@generate_bp.route('/', methods=['POST'])
def handle_mission():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        
        # Check if 'mission' key is in the JSON data
        if 'mission' not in data:
            return jsonify({"error": "Missing 'mission' key in request data"}), 400

        # Extract the 'mission' value from the request
        mission = data['mission']

        # Initialize LLM and workflow
        llm = g.llm_model
        workflow = Workflow(llm)

        # Build and compile the workflow
        workflow.build_workflow()
        workflow.compile_workflow()

        # Invoke the workflow
        state = workflow.invoke_workflow(mission=mission)
        print(state['team'])
        logger.success("[green]Workflow execution completed![/green]")

        return jsonify({"message": f"Team {state['team_name']} has been summoned!"}), 200

    except Exception as e:
        # Error handling for any other issues (e.g., invalid JSON format)
        return jsonify({"error": str(e)}), 500

# Route 2: POST request to handle mission input
@generate_bp.route('/test', methods=['POST'])
def handle_test():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        
        # Check if 'mission' key is in the JSON data
        if 'mission' not in data:
            return jsonify({"error": "Missing 'mission' key in request data"}), 400

        # Extract the 'mission' value from the request
        mission = data['mission']

        # Simulate processing the mission (dummy response for now)
        # For now, just return a dummy response with the mission value
        return jsonify({"message": f"Mission '{mission}' has been received and is being processed!"}), 200

    except Exception as e:
        # Error handling for any other issues (e.g., invalid JSON format)
        return jsonify({"error": str(e)}), 500