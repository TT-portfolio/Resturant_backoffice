import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

const Nav = async () => {
    const session = await getServerSession(options)
  return (
    <header>
        <nav className='flex gap-10'>
            <Link href="/">Home</Link>
            <Link href="/Dashboard">Dashboard</Link>
            <Link href="/Statestic">Statestic</Link>
            {session ? <Link href="/api/auth/signout?callbackUrl=/">Signout</Link>:<Link href="/api/auth/signin">Signin</Link>}
        </nav>
    </header>
  )
}

export default Nav