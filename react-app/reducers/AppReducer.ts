export type State = {
    displayNavigation: boolean
    themeMode: "dark" | "light"
    token: String | null
    isAdmin: boolean
    user: String | null 
}


export enum ActionType {
    UPDATE = "UPDATE"
}

type UpdateAction = {
    type: ActionType.UPDATE
    field: string
    value: any
}

export type Action = UpdateAction

export const initState: State = {
    displayNavigation: true,
    themeMode: "light",
    token: null,
    isAdmin: false,
    user: null
}

export function reducer(state: State, action: Action) {
    switch (action.type) {
        case ActionType.UPDATE:
            return { ...state, [action.field]: action.value }
        default: throw new Error()
    }
}