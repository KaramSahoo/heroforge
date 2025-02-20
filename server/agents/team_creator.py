from langchain.schema import SystemMessage, HumanMessage
from prompts.system_message import TEAM_CREATOR_PROMPT_SYSTEM
from utils.logger import logger

class TeamGenerator:
    def __init__(self, llm):
        """Initialize the team generator agent."""
        self.llm = llm

    def generate_team(self, mission: str):
        """Generates a team of superheroes based on the mission."""
        logger.info(f"Generating team for mission: [yellow]{mission}[/yellow]")

        selected_team = self.llm.invoke([
            SystemMessage(content=TEAM_CREATOR_PROMPT_SYSTEM),
            HumanMessage(content=f"Here is the mission: {mission}")
        ])

        logger.success(f"Team Created: \"{selected_team.team_name}\" of {len(selected_team.team_name)} superheroes!")

        return {"team": selected_team.team, "team_name": selected_team.team_name}
