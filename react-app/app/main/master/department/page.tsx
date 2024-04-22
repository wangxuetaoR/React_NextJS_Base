"use client"

import Navigation from "@/components/home/Navigation"
import { useAppContext } from "@/components/AppContext"
import Department from "@/components/home/Master/Department"

export default function Home() {
    const {
        state: { themeMode }
    } = useAppContext()
    return (
        <div className={`${themeMode} h-full flex`}>
            <Navigation />
            <Department />
        </div>
    )
}
