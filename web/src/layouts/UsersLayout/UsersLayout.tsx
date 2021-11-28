import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type UserLayoutProps = {
  children: React.ReactNode
}

const UsersLayout = ({ children }: UserLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.users()}
            className="rw-link"
          >
            Users
          </Link>
        </h1>
        <Link
          to={routes.newUser()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New User
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default UsersLayout
