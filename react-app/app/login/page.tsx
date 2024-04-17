'use client'
import { useRouter } from 'next/navigation'
// import { useSearchParams } from 'next/navigation'
// import { useCookies } from "react-cookie"
import { useEffect} from 'react';
 
export default function Login(){
  const router = useRouter()
  // const searchParams = useSearchParams()
  // const token = searchParams.get('token')
  // const [cookies, setCookie] = useCookies(['token']);
  // setCookie('token', token);
  useEffect(() => {
      router.push("/");
  }, []); // 空数组作为第二个参数确保只在组件挂载时调用

  return null;
}