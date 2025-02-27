"use client"

import { Container } from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react"
import { AbsoluteCenter, Box, Center } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { IoMdCode } from "react-icons/io";
import { Breadcrumb } from "@chakra-ui/react"

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
          className="bg-black flex content-center justify-start border-gray-700 border-2 border-opacity-75"
          rowSpan={1} colSpan={4}
          >
          </GridItem>
          <GridItem className="bg-black flex content-center justify-center border-gray-700 border-2 border-opacity-75">
              <a className="m-auto" href="https://github.com/KaramSahoo/heroforge" target="_blank"><IoMdCode size={70}/></a>
              
          </GridItem>
          <GridItem 
          rowSpan={2} colSpan={3}
          className="bg-yellow-600 flex content-center justify-center border-gray-700 border-2 border-opacity-75">
            {/* <Image rounded="md"/> */}

          </GridItem>
          <GridItem 
          rowSpan={2} colSpan={2}
          className="bg-black border-gray-700 border-2 border-opacity-75"></GridItem>
          <GridItem 
          rowSpan={1} colSpan={2}
          className="bg-blue-800 border-gray-700 border-2 border-opacity-75"></GridItem>
          <GridItem 
          rowSpan={1} colSpan={3}
          className="bg-black border-gray-700 border-2 border-opacity-75"></GridItem>
          <GridItem className="bg-pink-900 border-gray-700 border-2 border-opacity-75"></GridItem>
          <GridItem 
          rowSpan={1} colSpan={2}
          className="bg-green-900 border-gray-700 border-2 border-opacity-75"></GridItem>
          <GridItem className="bg-black border-gray-700 border-2 border-opacity-75"></GridItem>
          <GridItem className="bg-orange-800 border-gray-700 border-2 border-opacity-75"></GridItem>
          
          
        </Grid>
      </Container>
    )
  }