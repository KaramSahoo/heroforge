"use client"

import { Container } from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react"
import { IoMdCode } from "react-icons/io";
import { Tooltip } from "@/components/ui/tooltip"
import { RatingGroup, Icon, Stack, Text, Highlight, Input, Button  } from "@chakra-ui/react"
import { IoHeart } from "react-icons/io5"
import { motion } from "framer-motion";
import { MdArrowBackIos } from "react-icons/md";
import { useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";

export function DiscoverPage(props) {
    const [input, setInput] = useState("");
    const [team, setTeam] = useState([]);
    const [story, setStory] = useState("");
    const [storyName, setStoryName] = useState("");
    const [loading, setLoading] = useState(false);
    const [summoned, setSummoned] = useState(false);
    const [error, setError] = useState(null);

    const fetchTeamData = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await fetch("http://127.0.0.1:8000/generate/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ mission: input })
        });
        
        if (!response.ok) {
            throw new Error("Failed to fetch team data");
        }
        
        const data = await response.json();
        setTeam(data.state.team || []);
        setStory(data.state.story || "");
        setStoryName(data.state.team_name || "");
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
        setSummoned(true)
    }
    };
    return (
        <Container className="fluid min-h-screen">
        <Grid 
            className="min-h-screen"
            templateRows="repeat(5, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={0}
        >          
          <GridItem 
            rowSpan={1} colSpan={2}
            className="bg-black flex content-center justify-start border-white border-2 border-opacity-55 p-2">
                {(!loading && summoned) && (
                    <Stack>
                        <h1 className="text-3xl text-left pl-6 mt-auto font-bold font-mono">
                            <Highlight query={team[0].alias} styles={{ bg: "blue.600" }}>{team[0].alias}</Highlight>
                        </h1>
                        <h1 className="text-lg text-left pl-6 font-bold font-mono">
                            {team[0].name} <Highlight query={team[0].origin} styles={{ bg: "blue.600" }}>{team[0].origin}</Highlight>
                        </h1>
                        <h1 className="text-sm text-left pl-6 mb-auto font-bold font-mono">
                            <Highlight query="Power:" styles={{ bg: "blue.600" }}>Power: </Highlight> {team[0].power} <Highlight query="Yields:" styles={{ bg: "blue.600" }}>Yields: </Highlight> {team[0].weapon.weapon_name}
                        </h1>
                    </Stack>
                )}
          </GridItem>
          <GridItem 
            rowSpan={1} colSpan={1}
            className="bg-black flex content-center justify-center border-white border-2 border-opacity-55">
                {(!loading && summoned) && (
                    <h1 className="text-sm text-right p-6 m-auto font-bold font-mono">
                        <Highlight query={team[0].weapon.weapon_name} styles={{ bg: "blue.600" }}>{team[0].weapon.weapon_lore}</Highlight>
                    </h1>
                )}
          </GridItem>
          <GridItem 
            rowSpan={1} colSpan={1}
            className="bg-yellow-500 flex content-center justify-center border-white border-2 border-opacity-55">
          </GridItem>
          <GridItem
            className="bg-black flex content-center justify-center border-white border-2 border-opacity-55">
                <Tooltip
                    content="Back to where it all began..."
                    positioning={{ placement: "right-end" }}
                    openDelay={500}
                    closeDelay={100}
                >
                    <a className="m-auto" href="/" target="">
                        <Icon color="yellow.500"><MdArrowBackIos size={50}/>
                        </Icon>
                    </a>
                </Tooltip>
          </GridItem>
          <GridItem
            className="bg-blue-700 flex content-center justify-center border-white border-2 border-opacity-55">
          </GridItem>   
          <GridItem 
            rowSpan={1} colSpan={2}
            className="bg-black flex content-center justify-start border-white border-2 border-opacity-55 p-2">
                {(!loading && summoned) && (
                    <Stack>
                        <h1 className="text-3xl text-left pl-6 mt-auto font-bold font-mono">
                            <Highlight query={team[1].alias} styles={{ bg: "orange.600" }}>{team[1].alias}</Highlight>
                        </h1>
                        <h1 className="text-lg text-left pl-6 font-bold font-mono">
                            {team[1].name} <Highlight query={team[1].origin} styles={{ bg: "orange.600" }}>{team[1].origin}</Highlight>
                        </h1>
                        <h1 className="text-sm text-left pl-6 mb-auto font-bold font-mono">
                            <Highlight query="Power:" styles={{ bg: "orange.600" }}>Power: </Highlight> {team[1].power} <Highlight query="Yields:" styles={{ bg: "orange.600" }}>Yields: </Highlight> {team[1].weapon.weapon_name}
                        </h1>
                    </Stack>
                )}
          </GridItem>
          <GridItem 
            rowSpan={1} colSpan={1}
            className="bg-black flex content-center justify-center border-white border-2 border-opacity-55">
                {(!loading && summoned) && (
                    <h1 className="text-sm text-right p-6 m-auto font-bold font-mono">
                        <Highlight query={team[1].weapon.weapon_name} styles={{ bg: "orange.600" }}>{team[1].weapon.weapon_lore}</Highlight>
                    </h1>
                )}
          </GridItem>
          <GridItem 
            rowSpan={1} colSpan={1}
            className="bg-yellow-500 flex content-center justify-center border-white border-2 border-opacity-55">
          </GridItem>  
          <GridItem 
            rowSpan={1} colSpan={2}
            className="bg-black flex content-center justify-center border-white border-2 border-opacity-55">
          </GridItem>
          <GridItem 
            rowSpan={1} colSpan={2}
            className="bg-black flex content-center justify-start border-white border-2 border-opacity-55 p-2">
                {(!loading && summoned) && (
                    <Stack>
                        <h1 className="text-3xl text-left pl-6 mt-auto font-bold font-mono">
                            <Highlight query={team[2].alias} styles={{ bg: "green.600" }}>{team[2].alias}</Highlight>
                        </h1>
                        <h1 className="text-lg text-left pl-6 font-bold font-mono">
                            {team[2].name} <Highlight query={team[2].origin} styles={{ bg: "green.600" }}>{team[2].origin}</Highlight>
                        </h1>
                        <h1 className="text-sm text-left pl-6 mb-auto font-bold font-mono">
                            <Highlight query="Power:" styles={{ bg: "green.600" }}>Power: </Highlight> {team[2].power} <Highlight query="Yields:" styles={{ bg: "green.600" }}>Yields: </Highlight> {team[2].weapon.weapon_name}
                        </h1>
                    </Stack>
                )}
          </GridItem>
          <GridItem
            className="bg-black flex content-center justify-center border-white border-2 border-opacity-55">
                {(!loading && summoned) && (
                    <h1 className="text-sm text-right p-6 m-auto font-bold font-mono">
                        <Highlight query={team[2].weapon.weapon_name} styles={{ bg: "orange.600" }}>{team[2].weapon.weapon_lore}</Highlight>
                    </h1>
                )}
          </GridItem>
          <GridItem 
            rowSpan={1} colSpan={5}
            className="bg-black flex content-center justify-center border-white border-2 border-opacity-55">
                {(!loading && summoned) && (
                    <h1 className="text-sm text-right m-auto font-bold font-mono">
                        <Highlight query={storyName} styles={{ bg: "orange.600" }}>{story}</Highlight>
                    </h1>
                )}
          </GridItem>
          <GridItem 
            rowSpan={1} colSpan={3}
            className="bg-black flex content-center justify-center border-white border-2 border-opacity-55">
                <Input 
                    placeholder="Type your mission..." 
                    variant="flushed" value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="mt-auto mb-auto ml-10 font-mono text-lg"
                />
                <Button
                    onClick={fetchTeamData}
                    className="mt-auto mb-auto mr-10 px-4 py-2 bg-red-500 text-lg rounded-lg hover:bg-red-700 disabled:opacity-50 font-mono"
                    disabled={loading}
                    loading={loading}
                >
                    {loading ? "Loading" : "Summon"}
                </Button>
                {error && <p className="mt-4 text-red-500">{error}</p>}
          </GridItem>
          <GridItem
            rowSpan={1} colSpan={2}
            className="bg-green-600 flex content-center justify-center border-white border-2 border-opacity-55">
          </GridItem>
          
        </Grid>
      </Container>
    )
  }