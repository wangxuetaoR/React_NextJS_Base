import Button from "@/components/common/Button";
import { BiPrinter } from "react-icons/bi";
import { AiOutlineClose } from 'react-icons/ai';
import RadarChart from "@/components/common/RadarChart";
import VBarChart from "@/components/common/VBarChart";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Switch from "react-switch";

import 'react-tabs/style/react-tabs.css';

// スキル種別の型
interface SkillType {
    id: number;
    name: string;
}
// スキルの型
interface Skill {
    id: number;
    name: string;
    skillTypeId: number;
}
// ユーザーの型
interface User {
    id: number;
    name: string;
    userSkill: { skillId: number; years: number }[];
}

// 選択したスキル
interface Indicator {
    id: number;
    name: string;
    years: number;
}

// TABの選択数の型
interface SelectedCount {
    id: number;
    count: number;
}

// ユーザー一覧の型
interface FoundUser {
    id: number;
    name: string;
    years: number[];
}

// Radar2コンポーネントの引数型
interface RadarData {
    name: string;
    value: number[];
}
// Radar2コンポーネントの引数型
interface RadarIndicator {
    name: string;
}

// 選択したユーザーの型
interface SelectedUser {
    id: number;
    name: string;
    userSkill: { skillId: number; skillName: String; years: number }[];
}

export default function UserSkillDetail() {
    // 初期化データ取得
    const [SkillTypeList, setSkillTypeList] = useState<SkillType[]>([]); // スキル種別の型を指定
    const [SkillList, setSkillList] = useState<Skill[]>([]); // スキルの型を指定
    const [UserList, setUserList] = useState<User[]>([]);  // ユーザーの型を指定

    // TABの選択数
    const [SelectedCounts, setSelectedCounts] = useState<SelectedCount[]>([])
    const [Indicators, setIndicators] = useState<Indicator[]>([])
    // ユーザー一覧
    const [FoundUsersList, setFoundUsersList] = useState<FoundUser[]>([]); 

    // Radar2コンポーネントの引数
    const [radarData, setRadarData] = useState<RadarData[]>([]); 
    const [radarIndicators, setRadarIndicators] = useState<RadarIndicator[]>([]); 

    // AND条件スイッチ
    const [state, setState] = useState<boolean>(true);  

    // 初期スキル種別取得
    useEffect(() => {
        const skillTypesData = async () => {
            try {
                const response = await fetch('https://127.0.0.1:8080/api/skilltypes', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const jsonData = await response.json();
                console.log('data:', jsonData.data);
                setSkillTypeList(jsonData.data || []);
            } catch (error) {
                console.error('There was an error fetching the data:', error);
            }
        };
        skillTypesData();
    }, []);
    // 初期スキル取得
    useEffect(() => {
        const skillsData = async () => {
            try {
                const response = await fetch('https://127.0.0.1:8080/api/skills', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const jsonData = await response.json();
                console.log('data:', jsonData.data);
                setSkillList(jsonData.data || []);
            } catch (error) {
                console.error('There was an error fetching the data:', error);
            }
        };
        skillsData();
    }, []);
    
    // 初期ユーザースキル取得
    useEffect(() => {
        const userskillsData = async () => {
            try {
                const response = await fetch('https://127.0.0.1:8080/api/users', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const jsonData = await response.json();
                console.log('data:', jsonData.data);
                setUserList(jsonData.data || []);
            } catch (error) {
                console.error('There was an error fetching the data:', error);
            }
        };
        userskillsData();
        
    }, []);

    // TABの選択数初期化
    useEffect(() => {
        const initialSelectedCounts = SkillTypeList.map(type => ({
            id: type.id,
            count: 0
        }));
        setSelectedCounts(initialSelectedCounts);
    }, [SkillTypeList]);

    // スキルチェック変更イベント
    const onIndicatorsChange = (event:any, skill:Skill) => {
        const isChecked = event.target.checked;
        const updatedIndicators = [...Indicators]; //選択したスキル取得
        const updatedCounts = [...SelectedCounts]; // TAB選択数取得

        if (isChecked) {
            // 如果复选框被选中，则将指示器添加到数组中
            updatedIndicators.push({ id:skill.id, name: skill.name, years: 1 });
            // 更新对应选项卡的选中计数
            const index = updatedCounts.findIndex(count => count.id === Number(skill.skillTypeId));
            updatedCounts[index].count += 1;
        } else {
            // 如果复选框未选中，则从数组中删除指示器
            const index = updatedIndicators.findIndex(indicator => indicator.name === skill.name);
            if (index !== -1) {
                updatedIndicators.splice(index, 1);
            }
            // 更新对应选项卡的选中计数
            const index2 = updatedCounts.findIndex(count => count.id ===  Number(skill.skillTypeId));
            if (updatedCounts[index2].count > 0) {
                updatedCounts[index2].count -= 1;
            }
        }
        // 更新状态中的指示器数组
        setIndicators(updatedIndicators);
        setSelectedCounts(updatedCounts);
    
        setFoundUsersList([]);
    }

    // 検索年数変更イベント
    const onYearChange = (event:any, indicator: RadarIndicator ) => {
        const updatedIndicators = [...Indicators];

        const index = updatedIndicators.findIndex(item => item.name === indicator.name);
        if (index !== -1) {
            updatedIndicators[index].years = parseInt(event.target.value);
        }
        // 更新状态中的指示器数组
        setIndicators(updatedIndicators);
    }
    // Indicatorsの変更イベント
    useEffect(() => {
        const result:FoundUser[] = [];
        if(Indicators.length === 0){
            setRadarIndicators([]);
            setFoundUsersList([]);
            return;
        }
        if(state){
            UserList.map(user => {
                const yearsData : number[] = []
                let flg : Boolean = true
                Indicators.forEach(indicator => {
                    const index = user.userSkill.findIndex(item => item.skillId === indicator.id && item.years >= indicator.years)
                    if (index !== -1) {
                        yearsData.push(user.userSkill[index].years)
                    } else {
                        if(indicator.years<=0){
                            yearsData.push(0)
                        }else{
                            flg = false;
                            return;
                        }
                    }
                });
                if (flg){
                    result.push({
                        id: user.id, // 或者使用 userData.id，根据需要更改
                        name: user.name, // 或者从其他地方获取名称，根据需要更改
                        years: yearsData // 年份数据数组
                    });
                }
            });
        } else{
            UserList.map(user => {
                const yearsData : number[] = []
                let flg : Boolean = false
                Indicators.forEach(indicator => {
                    const index = user.userSkill.findIndex(item => item.skillId === indicator.id && item.years >= indicator.years)
                    if (index !== -1) {
                        yearsData.push(user.userSkill[index].years)
                        flg = true;
                    } else {
                        yearsData.push(0)
                        if(indicator.years<=0){
                            flg = true;
                        }
                    }
                });
                if (flg){
                    result.push({
                        id: user.id, // 或者使用 userData.id，根据需要更改
                        name: user.name, // 或者从其他地方获取名称，根据需要更改
                        years: yearsData // 年份数据数组
                    });
                }
            });
        }

        const a:RadarIndicator[]=[];
        Indicators.map(indicator => {
            a.push({ name: indicator.name });
        });
        setRadarIndicators(a);
        // 更新用户技能数据列表
        setFoundUsersList(result);
    }, [UserList, Indicators, state]);

    // FoundUsersListの変更イベント
    useEffect(() => {
        setRadarData(prevRadarData => {
            return prevRadarData.filter(radar => {
                return FoundUsersList.some(FoundUser => FoundUser.name === radar.name);
            });
        });
    }, [FoundUsersList]);

    
    // スキルチェック変更イベント
    const onSelectedUserChange = (event:any, foundUser:FoundUser) => {
        const isChecked = event.target.checked;
        const updatedRadarData = [...radarData];
        if (isChecked) {
            // 如果复选框被选中，则将指示器添加到数组中
            updatedRadarData.push({name: foundUser.name, value: foundUser.years});
        } else {
            // 如果复选框未选中，则从数组中删除指示器
            const index = updatedRadarData.findIndex(radar => radar.name === foundUser.name);
            if (index !== -1) {
                updatedRadarData.splice(index, 1);
            }
        }
        // 更新状态中的指示器数组
        setRadarData(updatedRadarData);
    }
    const handlePrint = () => {
        window.print();
    };

    // 创建状态来控制模态框的显示与隐藏以及当前选中的用户信息
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<SelectedUser>();

    // 遍历UserList找出foundUser相同ID的数据
    const handleUserClick = (foundUser: FoundUser) => {
        // 在UserList中查找与foundUser具有相同ID的用户数据
        const selectedUser = UserList.find(user => user.id === foundUser.id);

        // 如果找到了匹配的用户，则更新selectedUser状态，并显示模态框
        if (selectedUser) {
            // 将userSkill中的技能ID映射为对应的技能名称
            const selectedUserSkills = selectedUser.userSkill.map(skill => {
                // 在SkillList中查找与skillId相同的技能，并获取其名称
                const skillName = SkillList.find(skillItem => skillItem.id === skill.skillId)?.name || '';
                // 返回新的对象
                return {
                    skillId: skill.skillId,
                    skillName: skillName,
                    years: skill.years
                };
            });

            // 更新selectedUser状态，并显示模态框
            setSelectedUser({
                id: selectedUser.id,
                name: selectedUser.name,
                userSkill: selectedUserSkills
            });
            setIsModalOpen(true);
        }
    };
    const handleChange= (isChecked: boolean) => {
        setState(isChecked);
    }

    return (
        <div className="mt-10 ml-14">
            <div>
                <span className="text-2xl">社員スキル図</span>
            </div>
            <hr className="divider"></hr>

            <h5 className="mt-5 font-bold print:hidden">スキル選択</h5>
            <div className="ml-5 mr-5 print:hidden">
                <Tabs>
                    <TabList>
                        {SkillTypeList !== null && SkillTypeList.map((SkillType) => {
                            // 查找匹配的选中计数器对象
                            const selectedCountObj = SelectedCounts.find(count => count.id === SkillType.id);
                            // 获取计数值
                            const count = selectedCountObj ? selectedCountObj.count : 0;
                            return (
                                <Tab key={SkillType.id}>
                                    {SkillType.name}
                                    {count > 0 && (
                                        <span className="tab-badge">{count}</span>
                                    )}
                                </Tab>
                            );
                        })}
                    </TabList>
                    {SkillTypeList !== null && SkillTypeList.map((SkillType) => (
                        <TabPanel key={SkillType.id}>
                            <div className="grid grid-cols-7 gap-4">
                                {SkillList !== null && SkillList.map((skill) => (
                                    Number(skill.skillTypeId) === SkillType.id && (
                                        <label key={skill.id} className="flex items-center">
                                            <input
                                                name = "skill"
                                                className="mr-2"
                                                type = "checkbox" 
                                                onChange = {(event) => onIndicatorsChange(event, skill)} 
                                                checked = {Indicators.some(indicator => indicator.name === skill.name)} 
                                            />
                                            {skill.name}
                                        </label>
                                    )
                                ))}
                            </div>
                        </TabPanel>
                    ))}
                </Tabs> 
            </div>
            {Indicators.length > 0 &&(
                <div className="print:hidden">
                    <h5 className="mt-5 font-bold">スキルラベル</h5>
                    <div className="ml-5">
                        <label>
                            <Switch 
                                onChange = {(event) => handleChange(event)} 
                                checked={state} 
                            />
                            <span>AND条件</span>
                        </label>
                    </div>
                    <div className="grid grid-cols-5 gap-4 ml-5 mr-5">
                        {Indicators !== null && Indicators.map((indicator) => (
                            <div key={indicator.name}>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">{indicator.name}</span>
                                    </div>
                                    <input
                                        id={indicator.name} 
                                        name={indicator.name} 
                                        type="number"
                                        value={indicator.years}
                                        className="block w-full rounded-md border-0 py-1.5 pl-36 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange = {(event) => onYearChange(event, indicator)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {
                FoundUsersList.length > 0 && (
                    <div className="flex flex-col mt-5 mr-5 print:hidden">
                        <h5 className="font-bold">ユーザー一覧</h5>
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 border-solid">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                        <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                                            <tr>
                                                <th scope="col" className="px-6 py-4 font-bold">No</th>
                                                <th scope="col" className="px-6 py-4 font-bold">id</th>
                                                <th scope="col" className="px-6 py-4 font-bold">name</th>
                                                {Indicators !== null && Indicators.map((indicator) => (
                                                    <th key = {indicator.id} scope="col" className="px-6 py-4 font-bold">{indicator.name}</th>
                                                ))}    
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {FoundUsersList.map((foundUser,index) => (
                                                <tr key={foundUser.id} className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <input 
                                                            type="checkbox" 
                                                            onChange = {(event) => onSelectedUserChange(event, foundUser)} 
                                                        />
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">{foundUser.id}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 link" onClick={() => handleUserClick(foundUser)}>{foundUser.name}</td>
                                                    {foundUser.years.map((year, index) => (
                                                        <td key={index} className="whitespace-nowrap px-6 py-4">{year}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            
            
            {
                radarData.length > 0 &&  radarIndicators.length> 2 &&(
                    <div>
                        <Button style={{ width: "200px" }} className="print:hidden" icon={BiPrinter} variant="outline" onClick={handlePrint}>印刷</Button>
                        <RadarChart datas={radarData} indicators={radarIndicators} />
                    </div>
                )
            }
            {
                radarData.length > 0 &&  radarIndicators.length <= 2 &&(
                    <div>
                        <Button style={{ width: "200px" }} className="print:hidden" icon={BiPrinter} variant="outline" onClick={handlePrint}>印刷</Button>
                        <VBarChart datas={radarData} indicators={radarIndicators}/>
                    </div>
                )
            }
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    <div className="relative bg-white p-4 rounded-lg">
                        <button className="absolute top-2 right-2 p-2" onClick={() => setIsModalOpen(false)}>
                            <AiOutlineClose />
                        </button>
                        <h2 className="text-xl font-bold mb-4">{selectedUser.name}</h2>
                        <div style={{ maxHeight: '600px', overflowY: 'auto', overflowX: 'hidden' }}>
                            <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-bold">No</th>
                                        <th scope="col" className="px-6 py-4 font-bold">skill</th>
                                        <th scope="col" className="px-6 py-4 font-bold">years</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedUser.userSkill.map((skill,index) => (
                                        <tr key={skill.skillId} className="h-25 border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                                            <td className="whitespace-nowrap px-6 py-4">{index+1}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{skill.skillName}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{skill.years}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}