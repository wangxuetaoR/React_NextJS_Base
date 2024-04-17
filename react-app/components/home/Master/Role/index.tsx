import Menu from "../../Main/Menu";
import RoleDetail from "./RoleDetail";

export default function Role() {
    return (
        <main className='relative flex-1 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 overflow-y-auto'>
            <Menu />
            <RoleDetail />
        </main>
    )
}
