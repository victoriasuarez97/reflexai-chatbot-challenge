'use client'

import { useState } from "react";
import { Box, Flex, Icon, Text } from "gestalt"
import { Welcome } from "../Welcome/Welcome";
import { ChatBox } from "../ChatBox/ChatBox";

import 'gestalt/dist/gestalt.css';

export const Main = () => {
    const [form, setForm] = useState(false)
    const [user, setUser] = useState('')

    return (
        <Flex
            alignItems="center"
            height="100%"
            justifyContent="center"
            width="100%"
            direction="column"
            minHeight='95vh'
        >
            <Box id='main' alignContent="center">
                {form ? <ChatBox {... { user }}/> : <Welcome {... { user, setUser, form, setForm }} />}
            </Box>
            <footer>
                <Text size='200'>Made with <Icon icon='heart' accessibilityLabel="Heart icon" inline color='brandPrimary' /> by Vicky Suarez</Text>
            </footer>
        </Flex>
    )
}