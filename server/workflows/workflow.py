from typing import TypedDict, Annotated, List
from langchain_core.messages import SystemMessage, HumanMessage
from langgraph.graph import StateGraph, START, END
from schemas import SuperHero, Team
from agents.story_writer import StoryGenerator
from agents.team_creator import TeamGenerator
import json
from utils.logger import logger

from prompts.system_message import TEAM_CREATOR_PROMPT

# Graph state
class State(TypedDict):
    mission: str  # Mission
    team_name: str  # Name of the superhero team
    team: list[SuperHero]  # List of superheroes
    story: str  # Story of the superhero team's mission


class Workflow:
    def __init__(self, llm):
        """
        Initializes the Workflow with the LLM model and instructions.

        Args:
            llm: The language model used for structured output.
            creator_instructions (str): Instructions for generating a team.
            mission (str): The mission description.
        """
        self.llm = llm
        self.team_creator_llm = llm.with_structured_output(Team)  # Augment LLM with schema
        self.team_generator_agent = TeamGenerator(self.team_creator_llm)
        self.story_generator_agent = StoryGenerator(llm)
        self.creator_instructions = TEAM_CREATOR_PROMPT

        # Initialize the workflow state
        self.state: State = {
            "mission": "",
            "team_name": "",
            "team": [],
            "feedback": "",
        }

        self.orchestrator_worker_builder = StateGraph(State)

    def team_generator(self, state: State):
        """Wrapper function to call the team generator agent."""
        result = self.team_generator_agent.generate_team(state["mission"])
        self.state.update(result)
        return result
    
    def story_generator(self, state: State):    
        """Wrapper function to call the story generator agent."""
        result = self.story_generator_agent.generate_story(state["mission"], state["team_name"], state["team"])
        self.state.update(result)
        return result

    def build_workflow(self):
        """
        Constructs the workflow by adding nodes and edges.
        """
        logger.info("Building workflow...")
        self.orchestrator_worker_builder.add_node("team_generator", self.team_generator)
        self.orchestrator_worker_builder.add_node("story_generator", self.story_generator)

        # Add edges to connect nodes
        self.orchestrator_worker_builder.add_edge(START, "team_generator")
        self.orchestrator_worker_builder.add_edge("team_generator", "story_generator")
        self.orchestrator_worker_builder.add_edge("story_generator", END)

    def compile_workflow(self):
        """
        Compiles the workflow for execution.
        """
        logger.info("Compiling workflow...")
        self.orchestrator_worker = self.orchestrator_worker_builder.compile()

    def invoke_workflow(self, mission: str):
        """
        Runs the workflow with the initialized mission.

        Returns:
            dict: The final state after execution.
        """
        logger.info(f"[yellow]Invoking workflow for mission:[/yellow] {mission}")
        self.state["mission"] = mission
        return self.orchestrator_worker.invoke({"mission": self.state["mission"]})
