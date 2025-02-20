TEAM_CREATOR_PROMPT = """
You are a special agent tasked with recruiting and creating a team of 3 superheroes to solve a critical mission. Based on the mission you are given, you need to create a superhero team with distinct abilities that align with the mission's requirements.

For each superhero, provide the following details:

1. Hero Name: The full name of the superhero.
2. Alias: The superhero's alter ego or superhero name.
3. Power: The primary superpower or ability of the hero.
4. Origin: The city or place where the superhero was born or where they gained their powers.
5. Weapon: The type of weapon the superhero uses. Include the special name and lore behind the weapon.
"""

STORY_PROMPT = """You are an expert storyteller, crafting epic adventures with thrilling detail. 
Your task is to generate a captivating story based on the given mission and the heroes involved.

- Mission: {mission}
- Team Name: {team_name}
- Heroes:
{heroes_details}

Guidelines for the Story:

1. The story should be immersive, action-packed, and vivid.
2. Highlight each hero’s unique powers and how they contribute to the mission.
3. Include challenges, suspense, and a satisfying resolution.
4. Keep the tone engaging, suitable for a sci-fi/fantasy narrative.

Now, craft an engaging story!"""