from flask import Blueprint, request, jsonify, g
from schemas import Team
from langgraph.graph import StateGraph, MessagesState, START
from pydantic import BaseModel, Field
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from typing import Annotated, List
import operator

from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END

from typing_extensions import Literal
from langchain_core.messages import HumanMessage, SystemMessage

from schemas import SuperHero, Team, Weapon

# from app import llm
from prompts.system_message import CreatorInstructions

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

        # Simulate processing the mission (dummy response for now)
        
        # Augment the LLM with schema for structured output
        llm = g.llm_model
        team_creator = llm.with_structured_output(Team)

        # Graph state
        class State(TypedDict):
            mission: str  # Report mission
            team: list[SuperHero]  # List of report sections
            completed_stanzas: Annotated[
                list, operator.add
            ]  # All workers write to this key in parallel
            final_poem: str  # Final report

        # Nodes
        def team_generator(state: State):
            """Generator that creates a team of heroes.""" 

            # Generate queries
            selected_team = team_creator.invoke(
                [
                    SystemMessage(content=CreatorInstructions),
                    HumanMessage(content=f"Here is the mission: {state['mission']}"),
                ]
            )

            print(f"Team: {selected_team.team_name} \n")
            for hero in selected_team.team:
                print(f"Hero: {hero.name} ({hero.alias}), from {hero.origin}")
                print(f"Power: {hero.power}")
                print(f"Weapon: {hero.weapon.weapon_name}")
                print(f"Weapon Lore: {hero.weapon.weapon_lore}")
                print("\n")

            return {"team": selected_team.team}
        
        # Build workflow
        orchestrator_worker_builder = StateGraph(State)

        # Add the nodes
        orchestrator_worker_builder.add_node("team_generator", team_generator)

        # Add edges to connect nodes
        orchestrator_worker_builder.add_edge(START, "team_generator")
        orchestrator_worker_builder.add_edge("team_generator", END)

        # Compile the workflow
        orchestrator_worker = orchestrator_worker_builder.compile()

        # Invoke
        state = orchestrator_worker.invoke({"mission": mission})

        print("\nDISPLAYING FINAL STATE:")
        print(f"Mission: {state["mission"]}")
        print(f"Team: {state["team"]}")

        # For now, just return a dummy response with the mission value
        return jsonify({"message": f"Mission '{mission}' has been received and is being processed!"}), 200

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