"use client"

import { Container } from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { IoMdCode } from "react-icons/io";
import { IoLibraryOutline } from "react-icons/io5";
import { GiEnergyArrow } from "react-icons/gi";
import { Tooltip } from "@/components/ui/tooltip"
import { RatingGroup, Icon, Stack, Text, Highlight  } from "@chakra-ui/react"
import { IoHeart } from "react-icons/io5"
import { motion } from "framer-motion";

export function LandingPage(props) {
    return (
        <Container className="fluid min-h-screen">
        <Grid 
        className="min-h-screen"
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={0}
        >
          <GridItem 
          className="bg-black flex content-center justify-start pl-28 border-white border-2 border-opacity-55"
          rowSpan={1} colSpan={4}
          >
            <RatingGroup.Root count={5} defaultValue={4} colorPalette="red">
              <RatingGroup.HiddenInput />
              <RatingGroup.Control>
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingGroup.Item key={index} index={index + 1} className="p-1">
                    <Tooltip
                      content="Thanks for the feedback!"
                      positioning={{ placement: "top-end" }}
                      openDelay={200}
                      closeDelay={200}
                    >                      
                      <RatingGroup.ItemIndicator icon={<IoHeart />} />
                    </Tooltip>
                  </RatingGroup.Item>
                ))}
              </RatingGroup.Control>
            </RatingGroup.Root>
          </GridItem>
          <GridItem className="bg-black flex content-center justify-center border-white border-2 border-opacity-55">
              <Tooltip
                content="Check the GitHub"
                positioning={{ placement: "right-end" }}
                openDelay={500}
                closeDelay={100}
              >
                <a className="m-auto" href="https://github.com/KaramSahoo/heroforge" target="_blank">
                  <Icon color="green">
                    <IoMdCode size={50}/>
                  </Icon>
                </a>
              </Tooltip>
          </GridItem>
          <GridItem 
          rowSpan={2} colSpan={3}
          className="bg-black flex content-center justify-center border-white border-2 border-opacity-55">
            {/* <Image rounded="md"/> */}

          </GridItem>
          <GridItem 
          rowSpan={2} colSpan={2}
          className="bg-yellow-500 border-white border-2 border-opacity-55"></GridItem>
          <GridItem 
          rowSpan={1} colSpan={2}
          className="bg-blue-700 border-white border-2 border-opacity-55"></GridItem>
          <GridItem 
          rowSpan={1} colSpan={3}
          className="bg-black flex content-center justify-end border-white border-2 border-opacity-55">
            <Stack>
            <Tooltip
              content="I gave up on design, sorry."
              positioning={{ placement: "top" }}
              contentProps={{ css: { "--tooltip-bg": "orange" } }}
              openDelay={500}
              closeDelay={100}
            >
              <h1 className="text-6xl text-right mr-12 mt-auto font-bold font-mono">
                HeroForge
              </h1>
            </Tooltip>
              <Text className="text-1xl text-right text-wrap mr-12 mb-auto font-mono font-bold">
                Find your heroes, <Highlight query="with AI" styles={{ bg: "blue.muted" }}>with AI</Highlight>
              </Text>
              </Stack>
          </GridItem>
          <GridItem className="bg-black flex content-center justify-center border-white border-2 border-opacity-55">
            <Tooltip
                  content="Explore other Heroic Tales."
                  positioning={{ placement: "right-end" }}
                  openDelay={500}
                  closeDelay={100}
            >
              <a className="m-auto" href="/home">
                  <Icon color="blue.500">
                    <IoLibraryOutline size={50}/>
                  </Icon>
              </a>
            </Tooltip>
          </GridItem>
          <GridItem 
          rowSpan={1} colSpan={2}
          className="bg-black flex content-center justify-center border-white border-2 border-opacity-55">
            
          </GridItem>
          <GridItem className="bg-green-600 border-white border-2 border-opacity-55"></GridItem>
          <GridItem className="bg-black flex content-center justify-center border-white border-2 border-opacity-55">
            
          <Tooltip
            content="Let's forge your story!"
            positioning={{ placement: "right-end" }}
            openDelay={500}
            closeDelay={100}
          >
            <a className="m-auto" href="/gallery">
              <Icon color="yellow.500">                
                <GiEnergyArrow size={50}/>
              </Icon>
            </a>
          </Tooltip>
            
          </GridItem>
          
          
        </Grid>
      </Container>
    )
  }