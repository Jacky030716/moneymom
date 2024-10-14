import Image from "next/image"
import { Loader2 } from 'lucide-react'
import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-16 lg:pt-0'>
      <div className='h-full lg:flex flex-col items-center justify-center'>
        <div className='text-center space-y-4'>
          <h3 className='font-bold text-3xl text-blue-950'>Welcome To MoneyMom!</h3>
          <p className='text-base text-neutral-500'>Sign in or create an account to get back to dashboard!</p>
        </div>
        <div className='flex items-center justify-center mt-8'>
          <ClerkLoading>
            <Loader2 
              className='animate-spin text-muted-foreground'
            />
          </ClerkLoading>
          <ClerkLoaded>
            <SignIn path='/sign-in' />  
          </ClerkLoaded>
        </div>
      </div>

      <div className='h-full bg-yellow-100 hidden lg:flex items-center justify-center'>
        <Image 
          src="/logo.svg"
          height={100}
          width={100}
          alt="Logo"
        />
      </div>
    </div>
  )
}