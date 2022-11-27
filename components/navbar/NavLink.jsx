import { useRouter } from 'next/router'
import { classNames } from '../../utils'

export const NavLink = ({ children, href }) => {
  const router = useRouter()
  const isCurrent = router.asPath === href

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }
  return (
    <a
      href={href}
      onClick={handleClick}
      className={classNames(
        isCurrent
          ? 'text-blue-600 font-semibold'
          : 'text-gray-600',
        'flex text-gray-600 px-3 py-2 hover:text-blue-500 cursor-pointer transition-colors duration-300'
      )}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {children}
    </a>
  )
}
