'use client'

import { Avatar, Box, Flex, IconButton, Text, Toast } from "gestalt"
import { useChat } from 'ai/react';

import 'gestalt/dist/gestalt.css';
import './style.css'

export const ChatBox = () => {
    const { messages, input, handleInputChange, handleSubmit, error } = useChat();

    if (error) return (
        <Flex
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
        >
            <Toast
                type="error"
                text="Something went wrong. Please try again later."
                dismissButton={{ onDismiss: () => {}}}
            />
        </Flex>
    )

    return (
        <Box borderStyle="sm" rounding={3} padding={6} margin={6} id='chatContainer'>
            <Flex direction="column">
                {
                    messages.map(({ id, role, content }) => (
                        <Box key={id} marginTop={4} marginBottom={4}>
                            <Flex alignItems="center" wrap={false} width='100%'>
                                <Box>
                                    {role === 'user'
                                        ? <Avatar name='User' size='md' />
                                        : <Avatar src='/robot.png' name='Catbot' verified size='md' />
                                    }
                                </Box>
                                <Box marginStart={3}>
                                    <Text weight='bold'>{role === 'user' ? 'User' : 'Catbot'}</Text>
                                    <Text>{content}</Text>
                                </Box>
                            </Flex>
                        </Box>
                    ))
                }
            </Flex>
            <form onSubmit={handleSubmit}>
                <Flex alignItems="center" wrap={false} width='100%'>
                    <label htmlFor="userMessage" />
                    <input
                        id='userMessage'
                        onChange={handleInputChange}
                        value={input}
                        placeholder="Ask me anything"
                        autoComplete="off"
                    />
                    <IconButton icon="send" accessibilityLabel="Send message" type="submit" />
                </Flex>
                <Text size='100'>Please don&apos;t forget to be polite always</Text>
            </form>
        </Box>
    )
}