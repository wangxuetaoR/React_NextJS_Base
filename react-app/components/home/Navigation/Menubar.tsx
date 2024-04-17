import { useAppContext } from "@/components/AppContext"
import Button from "@/components/common/Button"
import { ActionType } from "@/reducers/AppReducer"
import { SlPeople } from "react-icons/sl";
import { LuPanelLeft } from "react-icons/lu"

export default function Menubar() {
    const { dispatch } = useAppContext()
    return (
        <div className='flex space-x-3'>
            <div className='flex-1'>
                <Button
                    icon={SlPeople}
                    variant='outline'
                    className="rounded-full"
                />
                <span> 名前 花子</span>
            </div>
            <Button
                icon={LuPanelLeft}
                variant='outline'
                onClick={() => {
                    dispatch({
                        type: ActionType.UPDATE,
                        field: "displayNavigation",
                        value: false
                    })
                }}
            />
        </div>
    )
}
