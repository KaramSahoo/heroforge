import { Container } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { RatingGroup, Icon, Stack, Text, Highlight  } from "@chakra-ui/react"


export function GalleryPage() {
    const [weapons, setWeapons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeapons = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("http://127.0.0.1:8000/data/weapons", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                
                if (!response.ok) {
                    throw new Error("Failed to fetch weapons data");
                }
                
                const data = await response.json();
                setWeapons(data.weapons || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeapons();
    }, []);

    return (
        <Container className="fluid min-h-screen">
            <Grid 
                className="min-h-screen"
                templateRows="repeat(5, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={0}
            >
                {weapons.map((weapon, index) => (
                    <GridItem 
                        key={index} 
                        className="bg-black flex content-center justify-center border-white border-2 border-opacity-55"
                    >
                        <Stack>
                            <h1 className="text-2xl text-left pl-6 mt-auto font-bold font-mono">
                                <Highlight query={weapon.weapon_name} styles={{ bg: "orange.600" }}>{weapon.weapon_name}</Highlight>
                            </h1>
                            <h1 className="text-sm text-left pl-6 font-bold font-mono">
                                {weapon.weapon_lore}
                            </h1>
                            <h1 className="text-sm text-left pl-6 mb-auto font-bold font-mono">
                                <Highlight query={weapon.weapon_type} styles={{ bg: "orange.600" }}>Type: </Highlight> {weapon.weapon_type}
                            </h1>
                        </Stack>
                    </GridItem>
                ))}
            </Grid>
        </Container>
    );
}
