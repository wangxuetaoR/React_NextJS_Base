import { useEffect, useState } from "react";

// 部門の型を定義
interface Department {
    id: number;
    code: string;
    name: string;
}

export default function DepartmentDetail() {
    const [list, setList] = useState<Department[]>([]); // 部門の型を指定

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://127.0.0.1:8080/api/departments', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const jsonData = await response.json();
                console.log('data:', jsonData.data);
                setList(jsonData.data || []);
            } catch (error) {
                console.error('There was an error fetching the data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="mt-10 ml-14">
            <div>
                <span className="text-2xl">部門マスター</span>
            </div>
            <hr className="divider"></hr>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                        <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                            <tr>
                                <th scope="col" className="px-6 py-4">id</th>
                                <th scope="col" className="px-6 py-4">code</th>
                                <th scope="col" className="px-6 py-4">name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list !== null && list.map((item) => (
                                <tr key={item.id} className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                                    <td className="whitespace-nowrap px-6 py-4">{item.id}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{item.code}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}