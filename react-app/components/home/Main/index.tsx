import Menu from "./Menu"

export default function Main() {
    return (
        <main className='relative flex-1 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100'>
            <Menu />
            <div className="mt-10 ml-14">
                <span className="text-2xl">ログインしました。</span>
            </div>
        </main>
    )
}
