import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChatBox } from './ChatBox'
import { useChat, Message } from 'ai/react'

const spyHook = { useChat }

const useChatSpy = jest.spyOn(spyHook, 'useChat')
const mockHandleSubmit = jest.fn()
const mockHandleInputChange = jest.fn()
const baseResponse = {
    messages: [{ role: 'system' as Message['role'], content: "Hello Username =^.^= I'm your catssistant!", id: '90873489273984' }],
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

afterEach(() => {
  jest.clearAllMocks()
})

describe('ChatBox test', () => {
    it('should initial message from bot', () => {
        const { getByText } = render(<ChatBox user='Username' />)

        expect(getByText("Hello Username =^.^= I'm your catssistant!")).toBeInTheDocument()
    })

    it('should find placeholder when there is no message typed in input', () => {
        const { getByPlaceholderText } = render(<ChatBox user='Username' />)

        expect(getByPlaceholderText('Ask me anything')).toBeInTheDocument()
    })

    it('should be able to type and submit text', async () => {
        useChatSpy.mockReturnValue(baseResponse)

        const { getByPlaceholderText } = render(<ChatBox user='Username'/>)

        const input = getByPlaceholderText('Ask me anything')

        userEvent.type(input, 'hello caatbot')

        fireEvent.submit(input)
    })

    it('should match snapshot when there is a start and completion', () => {
        useChatSpy.mockReturnValue({
            ...baseResponse,
            messages: [
                { role: 'user' as Message['role'], content: 'hello caatbot', id: '90873489273984' },
                { role: 'system' as Message['role'], content: 'hello there!', id: '90873489273985' }
            ]
        })

        const { container } = render(<ChatBox user='Username'/>)

        expect(container).toMatchSnapshot()
    })

    it('should be able to find error text when service fails', async () => {
        useChatSpy.mockReturnValue({
            ...baseResponse,
            error: { name: 'New Error', message: 'Something failed!!' }
        })

        const { getByText, getByPlaceholderText, rerender } = render(<ChatBox user='Username'/>)

        const input = getByPlaceholderText('Ask me anything')

        userEvent.type(input, 'hey')

        fireEvent.submit(input)

        rerender(<ChatBox user='Username'/>)

        await waitFor(() => 
            expect(getByText('Something went wrong. Please try again later.')).toBeInTheDocument())
    })
})