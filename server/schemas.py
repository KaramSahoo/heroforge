from pydantic import BaseModel, Field # type: ignore
from typing import Annotated, List

# Schema for structured output to use in planning
class Weapon(BaseModel):
    weapon_type: str = Field(
        description="Name of the weapon.",
    )
    weapon_name: str = Field(
        description="Special name given to the weapon.",
    )
    weapon_lore: str = Field(
        description="Lore behind the weaopon.",
    )

class SuperHero(BaseModel):
    name: str = Field(
        description="Formal name for the superhero.",
    )
    alias: str = Field(
        description="Hero name for the superhero.",
    )
    power: str = Field(
        description="Description of the power.",
    )
    origin: str = Field(
        description="City the superhero originiates from.",
    )
    weapon: Weapon = Field(
        description="This is the weapon of the superhero.",
    )


class Team(BaseModel):
    team_name: str = Field(
        description="Name of the superhero team.",
    )
    team: List[SuperHero] = Field(
        description="This is the team of superheroes.",
    )


# from langchain_openai import ChatOpenAI
# from langgraph.graph import StateGraph, MessagesState, START
# from pydantic import BaseModel, Field

# from langchain_core.messages import HumanMessage, SystemMessage

# from dotenv import load_dotenv

# load_dotenv()

# llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)

# mission = "save the earth from a meteorite"
# # Augment the LLM with schema for structured output
# planner = llm.with_structured_output(Team)

# selected_gifts = planner.invoke(
#         [
#             SystemMessage(content="You are a special agent who excels at recruiting and/or creating superheros based on given missions or quest. According to the user's mission, you need to create a team of superheroes that can solve the quest/mission. Each superhero has a name, alias, power, origin(city), and weapon(type, special name, lore)."),
#             HumanMessage(content=f"Here is the mission: {mission}"),
#         ]
#     )

# print(selected_gifts)