import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

export default function Default() {
  return (
    <>
      <Navbar />
      <main className="router">
        <Outlet />
      </main>
    </>
  )
}
