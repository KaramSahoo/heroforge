from flask import Blueprint, request, jsonify, g
from workflows.workflow import Workflow
from utils.logger import logger
from database.services import TeamService, WeaponService  # Import the service layer

# Create a Blueprint named 'prompts'
data_bp = Blueprint('data', __name__)

@data_bp.route('/teams', methods=['GET'])
def get_teams():
    try:
        teams = TeamService.get_all_teams()  # Fetch all teams

        print(teams)

        # Convert MongoDB ObjectId to string
        teams = [{**team, "_id": str(team["_id"])} for team in teams]

        return jsonify({
            "message": "Success",
            "teams": teams  # Return the list of teams
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@data_bp.route('/weapons', methods=['GET'])
def get_weapons():
    try:
        weapons = WeaponService.get_all_weapons()  # Fetch all teams

        # Convert MongoDB ObjectId to string
        weapons = [{**weapon, "_id": str(weapon["_id"])} for weapon in weapons]

        return jsonify({
            "weapons": weapons  # Return the list of teams
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500