'use client'

import { Box, Container, Heading, Icon } from "gestalt"
import { ChatBox } from "../ChatBox/ChatBox";

import 'gestalt/dist/gestalt.css';
import './style.css'

export const Main = () => {
    return (
        <Box padding={12} margin='auto'>
            <Container>
                <Heading align='center' accessibilityLevel={1} size='600'>
                   👋 Hi stranger!
                </Heading>
                <Heading align='center' accessibilityLevel={3} size='500'>
                    This is your new favourite chatbot.
                </Heading>
                <ChatBox/>
            </Container>
            <footer>
                <hr />
                Made with <Icon icon='heart' accessibilityLabel="Heart icon" inline color='brandPrimary' /> by Vicky Suarez
            </footer>
        </Box>
    )
}