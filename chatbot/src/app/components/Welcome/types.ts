import { ChangeEventHandler, Dispatch, SetStateAction } from "react"

type Props = {
    user: string
    setUser: Dispatch<SetStateAction<string>>
    setForm: Dispatch<SetStateAction<boolean>>
}

export type WelcomeType = (props: Props) => JSX.Element