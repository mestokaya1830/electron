import { NavLink } from 'react-router-dom'

export default function navbar() {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="links">
          Home
        </NavLink>
        <NavLink to="/login" className="links">
          Login
        </NavLink>
        <NavLink to="/register" className="links">
          Register
        </NavLink>
      </nav>
    </>
  )
}
