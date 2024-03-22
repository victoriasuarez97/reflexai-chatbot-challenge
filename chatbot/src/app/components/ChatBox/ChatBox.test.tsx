import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChatBox } from './ChatBox'
import { useChat, Message } from 'ai/react'

const spyHook = { useChat }

const useChatSpy = jest.spyOn(spyHook, 'useChat')
const mockHandleSubmit = jest.fn()
const mockHandleInputChange = jest.fn()
const baseResponse = {
    messages: [{ role: 'user' as Message['role'], content: 'hello caatbot', id: '90873489273984' }],
    handleSubmit: mockHandleSubmit,
    error: undefined,
    append: jest.fn(),
    reload: jest.fn(),
    stop: jest.fn(),
    setMessages: jest.fn(),
    input: '',
    setInput: jest.fn(),
    handleInputChange: mockHandleInputChange,
    isLoading: false
}

describe('ChatBox test', () => {
    it('should find placeholder when there is no message typed in input', () => {
        const { getByPlaceholderText } = render(<ChatBox />)

        expect(getByPlaceholderText('Ask me anything')).toBeInTheDocument()
    })

    it('should be able to type and submit text', async () => {
        useChatSpy.mockReturnValue(baseResponse)

        const { getByPlaceholderText, getByLabelText } = render(<ChatBox />)

        const input = getByPlaceholderText('Ask me anything')
        const submitButton = getByLabelText('Send message')

        userEvent.type(input, 'hello caatbot')

        userEvent.click(submitButton)
    })
})