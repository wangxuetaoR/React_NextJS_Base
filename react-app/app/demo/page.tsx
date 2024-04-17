"use client"
import Button from '@/components/common/Button';
import { useRef } from 'react'
 
function Demo() {
    const inputRef = useRef<HTMLInputElement>(null);
 
    const handleFocus = () => {
        // document.getElementById('my-input').focus();
        if (inputRef.current) {
            inputRef.current.value = 'focus';
            inputRef.current.focus();
        }
    }
 
    const handleBlur = () => {
        // document.getElementById('my-input').blur();
        if (inputRef.current) {
            inputRef.current.value = 'blur';
            inputRef.current.blur();
        }
    }
 
    return (
        <div>
            <input ref={inputRef} id="my-input" />
            <Button onClick={handleFocus}>focus</Button>
            <Button onClick={handleBlur}>blur</Button>
        </div>
    )
}
 
export default Demo;