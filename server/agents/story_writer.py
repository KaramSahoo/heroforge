from langchain.schema import SystemMessage, HumanMessage
from utils.logger import logger
from prompts.system_message import STORY_PROMPT


class StoryGenerator:
    def __init__(self, llm):
        """Initialize the story generator agent."""
        self.llm = llm

    def generate_story_prompt(self, mission: str, team_name: str, heroes):
        """Formats the story prompt with mission and hero details."""
        heroes_details = "\n".join([
            f"- {hero.name} ({hero.alias}): {hero.power}" 
            for hero in heroes
        ])

        return STORY_PROMPT.format(
            mission=mission,
            team_name=team_name,
            heroes_details=heroes_details or "No heroes assigned yet."
        )

    def generate_story(self, mission: str, team_name: str, heroes):
        """Generates a story for the mission and superheroes."""
        logger.info("Generating a mission story...")
        story_prompt = self.generate_story_prompt(mission, team_name, heroes)

        mission_story = self.llm.invoke([
            SystemMessage(content="You are an expert in writing stories."),
            HumanMessage(content=story_prompt)
        ])

        logger.success("[green]Story generated successfully![/green]")

        return {"story": mission_story.content}
