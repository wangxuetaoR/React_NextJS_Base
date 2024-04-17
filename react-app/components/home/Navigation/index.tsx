"use client"

import { useAppContext } from "@/components/AppContext"
import Menubar from "./Menubar"
import Toolbar from "./Toolbar"
import MenuList from "./MenuList"

export default function Navigation() {
    const {
        state: { displayNavigation }
    } = useAppContext()
    return (
        <nav
            className={`${
                displayNavigation ? "" : "hidden"
            } flex flex-col dark relative h-full w-[260px] bg-gray-900 text-gray-300 p-2 print:hidden`}
        >
            <Menubar />
            <MenuList />
            <Toolbar />
        </nav>
    )
}
