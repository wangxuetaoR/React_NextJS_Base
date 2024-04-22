"use client"

import Navigation from "@/components/home/Navigation"
import { useAppContext } from "@/components/AppContext"
import UserSkill from "@/components/home/Syain/UserSkill"

export default function Home() {
    const {
        state: { themeMode }
    } = useAppContext()
    return (
        <div className={`${themeMode} h-full flex`}>
            <Navigation />
            <UserSkill />
        </div>
    )
}
