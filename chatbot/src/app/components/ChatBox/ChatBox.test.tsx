import { act, fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChatBox } from './ChatBox'
import { useChat, Message } from 'ai/react'

const spyHook = { useChat }

const useChatSpy = jest.spyOn(spyHook, 'useChat')
const mockHandleSubmit = jest.fn()
const mockHandleInputChange = jest.fn()
Element.prototype.scrollTo = jest.fn();

describe('ChatBox test', () => {
    it('should initial message from bot', () => {
        const { getByText } = render(<ChatBox user='Username' />)

        expect(getByText("Hello Username =^.^= I'm your catssistant!")).toBeInTheDocument()
    })

    it('should find placeholder when there is no message typed in input', () => {
        const { getByPlaceholderText } = render(<ChatBox user='Username' />)

        expect(getByPlaceholderText('Ask me anything')).toBeInTheDocument()
    })

    it('should be able to type and submit text', () => {
        useChatSpy.mockReturnValue({            
            messages: [{ role: 'assistant' as Message['role'], content: "Hello Username =^.^= I'm your catssistant!", id: '90873489273984' }],
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
        })

        const { getByPlaceholderText } = render(<ChatBox user='Username'/>)

        const input = getByPlaceholderText('Ask me anything')

        userEvent.type(input, 'hello caatbot')

        fireEvent.submit(input)
    })

    it('should match snapshot when there is a start and completion', () => {
        useChatSpy.mockReturnValue({
            messages: [
                { role: 'assistant' as Message['role'], content: "Hello Username =^.^= I'm your catssistant!", id: '90873489273984' },
                { role: 'user' as Message['role'], content: 'hello caatbot', id: '90873489273985' },
                { role: 'assistant' as Message['role'], content: 'hello there!', id: '90873489273986' }
            ],
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
        })

        const { container, rerender } = render(<ChatBox user='Username'/>)

        rerender(<ChatBox user='Username'/>)

        expect(container).toMatchSnapshot()
    })
})
