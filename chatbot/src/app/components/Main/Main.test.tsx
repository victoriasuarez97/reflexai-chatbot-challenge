import { render } from '@testing-library/react'
import { Main } from './Main'

describe('Main test', () => {
    it('should find welcome text', () => {
        const { getByText } = render(<Main />)

        expect(getByText('👋 Hi stranger!')).toBeInTheDocument()
        expect(getByText('This is your new favourite chatbot.')).toBeInTheDocument()
    })
})