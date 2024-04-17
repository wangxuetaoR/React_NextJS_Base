"use client"

import Navigation from "@/components/home/Navigation"
import { useAppContext } from "@/components/AppContext"
import Role from "@/components/home/Master/Role"

export default function Home() {
    const {
        state: { themeMode }
    } = useAppContext()
    return (
        <div className={`${themeMode} h-full flex`}>
            <Navigation />
            <Role />
        </div>
    )
}
