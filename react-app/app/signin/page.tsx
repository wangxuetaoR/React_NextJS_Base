"use client"
import Button from '@/components/common/Button';
import Image from "next/image";
import { GOOGLE_AUTH_URL } from "../constants"
import { useRouter } from 'next/navigation'

const SignInPage = () => {
  const router = useRouter()
  const handleLogin = async () => {
    try {
      router.push(GOOGLE_AUTH_URL);
    } catch (error) {
      console.error('Error fetching Google Auth URL:', error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96">
        <div className="mb-4 flex justify-center">
          <Image src="/Jcbc.png" alt="Your Image" width={300} height={200} />
        </div>
        <h2 className="text-2xl font-bold mb-6"></h2>
        
        <div className="flex items-center justify-between">
          <Button variant='outline' className='flex-1 rounded-full text-center' onClick={handleLogin} >
              <img className='w-[18px] h-[18px]' src="../google.svg"></img>　<span>GooGleでログイン</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;