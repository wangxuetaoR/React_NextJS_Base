import { Menu } from "@/types/Menu"

export function groupByDate(MenuList: Menu[]) {
    const groupMap = new Map<string, Menu[]>()
    MenuList.forEach((item) => {
        const type = item.type
        if (groupMap.has(type)) {
            groupMap.get(type)?.push(item)
        } else {
            groupMap.set(type, [item])
        }
    })
    const groupList = Array.from(groupMap)
    return groupList
}