"use client"

import { useUser } from "@clerk/nextjs"

const Greeting = () => {
  const { user, isLoaded } = useUser()

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl md:text-4xl text-neutral-700 font-bold">
        Welcome Back{isLoaded ? ", " : " "}
        <span className="uppercase">
          {user?.firstName}🫡
        </span>
      </h2>
      <p className="text-base text-neutral-500">
        This is your Financial Overview Report
      </p>
    </div>
  )
}

export default Greeting