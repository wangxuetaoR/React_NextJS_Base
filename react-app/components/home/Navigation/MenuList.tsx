import { groupByDate } from "@/common/util"
import { Menu } from "@/types/Menu"
import { useMemo, useState } from "react"

export default function MenuList() {
    const [MenuList, setMenuList] = useState<Menu[]>([
        {
            id: "1",
            title: "部門マスター",
            type: "マスター管理",
            url: "/main/master/department"
        },
        {
            id: "2",
            title: "役割マスター",
            type: "マスター管理",
            url: "/main/master/role"
        },
        {
            id: "3",
            title: "スキルマスター",
            type: "マスター管理",
            url: "/main/master/skill"
        },
        {
            id: "4",
            title: "スキル種別マスター",
            type: "マスター管理",
            url: "/main/master/skillType"
        },
        {
            id: "5",
            title: "契約種別マスター",
            type: "マスター管理",
            url: "/main/master/ContractType"
        },
        {
            id: "6",
            title: "ユーザー一覧",
            type: "社員管理",
            url: "/main/syain/user_list"
        },
        {
            id: "7",
            title: "スキルレーダー",
            type: "スキル管理",
            url: "/main/syain/user_skill"
        }
    ])
    const groupList = useMemo(() => {
        return groupByDate(MenuList)
    }, [MenuList])
    return (
        <div className='flex-1 mb-[48px] mt-2 flex flex-col overflow-y-auto'>
            {groupList.map(([date, list]) => {
                return (
                    <div key={date}>
                        <div className='sticky top-0 z-10 p-3 text-sm bg-gray-900 text-gray-500'>
                            {date}
                        </div>
                        <ul>
                            {list.map((item) => {
                                return (
                                    <li
                                        key={item.id}
                                        className={`group flex items-center p-3 space-x-3 cursor-pointer rounded-md hover:bg-gray-800`}
                                    >
                                        <a href={item.url} className='flex-1'>
                                            <div className='relative flex-1 whitespace-nowrap overflow-hidden'>
                                                {item.title}
                                                <span
                                                    className={`group-hover:from-gray-800 absolute right-0 inset-y-0 w-8 bg-gradient-to-l`}
                                                ></span>
                                            </div>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}
