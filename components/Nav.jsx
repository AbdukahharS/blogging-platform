'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)

  useEffect(() => {
    ;(async () => {
      const res = await getProviders()
      setProviders(res)
    })()
  }, [])

  return (
    <nav>
      {session?.user ? (
        <div>
          <button type='button' onClick={signOut}>
            Sign Out
          </button>

          <Link href='/profile'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
            />
          </Link>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => {
                  signIn(provider.id)
                }}
              >
                Sign in
              </button>
            ))}
        </>
      )}
    </nav>
  )
}

export default Nav
