"use client";

import { LegacyRef, useEffect, useRef } from "react";
import { Avatar, Box, Flex, IconButton, Text, Toast } from "gestalt";
import { useChat } from "ai/react";
import { ChatBoxType } from "./types";

import "gestalt/dist/gestalt.css";
import "./style.css";

export const ChatBox: ChatBoxType = ({ user }) => {
	const ref = useRef<HTMLDivElement | null | undefined>();

	const { messages, input, handleInputChange, handleSubmit, error } = useChat({
		initialMessages: [
			{
				id: "1",
				role: "assistant",
				content: `Hello ${user} =^.^= I'm your catssistant!`,
			},
		],
	});

	const scrollToBottom = () => {
		const { offsetHeight, scrollHeight, scrollTop } =
			ref.current as HTMLDivElement;
		if (scrollHeight <= scrollTop + offsetHeight + 200) {
			ref.current?.scrollTo(0, scrollHeight);
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	if (error)
		return (
			<Flex
				justifyContent="center"
				alignItems="center"
				width="100%"
				height="100%"
			>
				<Toast
					type="error"
					text="Something went wrong. Please try again later."
					dismissButton={{ onDismiss: () => window.location.reload() }}
				/>
			</Flex>
		);

	return (
		<Box
			borderStyle="sm"
			rounding={3}
			padding={6}
			margin={6}
			id="wrapper"
			minWidth="350px"
		>
			<Box ref={ref as LegacyRef<HTMLDivElement>} id="chatContainer">
				{messages.map(({ id, role, content }) => (
					<Box key={id} marginTop={4} marginBottom={4}>
						<Flex alignItems="center" wrap={false} width="100%">
							<Box>
								{role === "user" ? (
									<Avatar name={user} size="md" />
								) : (
									<Avatar src="/robot.png" name="Catbot" verified size="md" />
								)}
							</Box>
							<Box marginStart={3}>
								<Text weight="bold">{role === "user" ? user : "Catbot"}</Text>
								<Text>{content}</Text>
							</Box>
						</Flex>
					</Box>
				))}
			</Box>
			<form onSubmit={handleSubmit}>
				<Flex alignItems="center" wrap={false} width="100%">
					<label htmlFor="userMessage" />
					<input
						id="userMessage"
						onChange={handleInputChange}
						value={input}
						placeholder="Ask me anything"
						autoComplete="off"
					/>
					<IconButton
						icon="send"
						accessibilityLabel="Send message"
						type="submit"
					/>
				</Flex>
			</form>
		</Box>
	);
};
