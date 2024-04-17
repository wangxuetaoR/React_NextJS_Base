"use client"
import Button from '@/components/common/Button';
import { useState, useRef } from 'react'
 
function Demo() {
    const countRef = useRef(0);
    const [num, setNum] = useState(0);
 
    const addCount = () => {
        // 使用 useRef 去更新值并不会出发组件渲染
        countRef.current = countRef.current + 1;
    }
 
    const addNum = () => {
        // 使用 useState 去更新会触发组件渲染
        setNum(num + 1);
    }
 
    return (
        <div>
            <Button onClick={addCount}>addCount</Button>
            <Button onClick={addNum}>addNum</Button>
            <p>{`count: ${countRef.current}`}</p>
            <p>{`num: ${num}`}</p>
        </div>
    )
}
 
export default Demo;