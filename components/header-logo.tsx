import Link from "next/link"
import Image from "next/image"

const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden md:flex">
        <Image 
          src="/logo.svg"
          alt="Logo"
          width={28}
          height={28}
        />
        <p className="text-blue-500 font-bold text-xl ml-2">MoneyMom</p>
      </div>
    </Link>
  )
}

export default HeaderLogo