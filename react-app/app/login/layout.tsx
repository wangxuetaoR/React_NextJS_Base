import { Suspense } from "react"
import Login from "./page"

export default function loginLayout() {
    return (
        <Suspense fallback={null}>
          <Login />
        </Suspense>
    )
}
