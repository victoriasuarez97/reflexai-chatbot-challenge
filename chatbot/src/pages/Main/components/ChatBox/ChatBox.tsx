'use client'

import { Avatar, Box, Flex, IconButton, Text } from "gestalt"
import { useChat } from 'ai/react';

import 'gestalt/dist/gestalt.css';
import './style.css'

export const ChatBox = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat();

    return (
        <Box borderStyle="sm" rounding={3} padding={6} margin={6}>
            {
                messages.map(({ id, role, content }) => (
                    <Box key={id} margin={8}>
                        <Flex alignItems="center" wrap={false} width='100%'>
                            <Box>
                                {role === 'user' ? <Avatar name='User' /> : <Avatar src='/robot.png' name='Catbot' />}
                            </Box>
                            <Box>
                                <Text weight='bold'>{role === 'user' ? 'User' : 'Catbot'}</Text>
                                <Text>{content}</Text>
                            </Box>
                        </Flex>
                    </Box>
                ))
            }
            <form onSubmit={handleSubmit}>
                <Flex alignItems="center" wrap={false} width='100%'>
                    <input
                        id='userMessage'
                        onChange={handleInputChange}
                        value={input}
                        placeholder="Ask me anything"
                    />
                    <IconButton icon="send" accessibilityLabel="Send message" type="submit" />
                </Flex>
            </form>
        </Box>
    )
}