import { Box, Heading, Text, TextField } from "gestalt"
import { WelcomeType } from "./types"

import './style.css'

export const Welcome: WelcomeType = ({ user, setUser, setForm }) => {

    const handleUser = (e) => {
        setUser(e.value)
    }

    const handleForm = (e) => {
        e.preventDefault()
        setForm(true)
    }

    return (
        <Box margin={12} id='container'>
            <Heading accessibilityLevel={1} size='600'>
                👋 Hello there!
            </Heading>
            <Heading accessibilityLevel={2} size='500' id='subtitle'>
                P.O.V. you've just created a cat assistant to communicate with your cat.
            </Heading>
            <Heading accessibilityLevel={3} size='300' id='secondSubtitle'>
                Please, introduce yourself so you can live the experience.
            </Heading>
            <form onSubmit={(e) => handleForm(e)}>
                <TextField
                    id='userId'
                    value={user}
                    onChange={(e) => handleUser(e)}
                    placeholder="Username"
                    autoComplete="off"
                />
            </form>
        </Box>
    )
}
