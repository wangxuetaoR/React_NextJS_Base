'use client'
import { useAppContext } from '@/components/AppContext';
import { ActionType } from '@/reducers/AppReducer';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect} from 'react';
 
export default function Login(){
  const router = useRouter();
  const searchParams = useSearchParams()
  const { dispatch } = useAppContext()
  useEffect(() => {
      const token = searchParams.get('token')
      dispatch({
        type: ActionType.UPDATE,
        field: "token",
        value: token
    })
      router.push("/main");
  }, [searchParams, router, dispatch]); // 空数组作为第二个参数确保只在组件挂载时调用

  return null;
}