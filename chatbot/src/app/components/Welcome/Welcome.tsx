import { Box, Heading, Text, TextField } from "gestalt"
import { WelcomeType } from "./types"

import './style.css'
import { FormEvent, SyntheticEvent } from "react"

export const Welcome: WelcomeType = ({ user, setUser, setForm }) => {

    const handleUser = (e: { value: string } & { readonly event: SyntheticEvent<HTMLInputElement, Event> }) => {
        setUser(e.value)
    }

    const handleForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setForm(true)
    }

    return (
        <Box margin={12} id='container'>
            <Heading accessibilityLevel={1} size='600'>
                P.O.V. you've just created a cat robot powered with AI to understand better your cat's behaviour.
            </Heading>
            <Heading accessibilityLevel={2} size='400' id='subtitle'>
                👋 Hello there! Welcome to <Text weight="bold" inline size='400'>Catbot</Text>
            </Heading>
            <Heading accessibilityLevel={3} size='200' id='secondSubtitle'>
                Please, introduce yourself with a name to start.
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
