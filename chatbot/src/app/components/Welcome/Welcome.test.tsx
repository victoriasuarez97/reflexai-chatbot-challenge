import { fireEvent, render, waitFor } from "@testing-library/react"
import { Welcome } from "./Welcome"
import userEvent from "@testing-library/user-event"

const setUserMock = jest.fn()
const setFormMock = jest.fn()

const baseProps = {
    user: '',
    setUser: setUserMock,
    setForm: setFormMock
}

describe('Welcome test', () => {
    it('should find welcoming text and empty input field', () => {
        const { getByText, getByPlaceholderText } = render(<Welcome {...baseProps} />)

        expect(getByText("P.O.V. you've just created a cat robot powered with AI to understand better your cat's behaviour.")).toBeInTheDocument()
        expect(getByText("👋 Hello there! Welcome to")).toBeInTheDocument()
        expect(getByText("Catbot")).toBeInTheDocument()
        expect(getByText("Please, introduce yourself with a name to start.")).toBeInTheDocument()

        expect(getByPlaceholderText('Username')).toHaveAttribute('value', '')
    })

    it('should be able to type username and submit form', async () => {
        const { getByPlaceholderText } = render(<Welcome {...baseProps} />)

        const input = getByPlaceholderText('Username')

        userEvent.type(input, 'Vicky')

        await waitFor(() => expect(setUserMock).toHaveBeenCalled())

        fireEvent.submit(input)

        expect(setFormMock).toHaveBeenCalled()
    })
})