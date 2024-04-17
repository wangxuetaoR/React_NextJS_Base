import Menu from "../../Main/Menu";
import DepartmentDetail from "./DepartmentDetail";

export default function Department() {
    return (
        <main className='relative flex-1 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 overflow-y-auto'>
            <Menu />
            <DepartmentDetail />
        </main>
    )
}
