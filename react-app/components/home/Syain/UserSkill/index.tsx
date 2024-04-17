import Menu from "../../Main/Menu";
import UserSkillDetail from "./UserSkillDetail";

export default function UserSkill() {
    return (
        <main className='relative flex-1 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 overflow-y-auto'>
            <Menu />
            <UserSkillDetail />
        </main>
    )
}
