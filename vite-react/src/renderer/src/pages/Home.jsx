import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const getUsers = async () => {
    const res = await window.api.getUsers()
    console.log(res)
  }

  const users = useSelector((state) => state.users)
  console.log(users)
  const dispatch = useDispatch()
  
  const logout = async () => {
    const res = await window.api.logout()
    if (res.success) {
      dispatch({ type: 'logout' })
      navigate('/login')
    }
    console.log(res)
  }
  useEffect(() => {
    getUsers()
  }, [users])
  return (
    <>
      <h1>Home</h1>
      {!users.email ? (
        <h2>{'Please login...'}</h2>
      ) : (
        <div>
          <h2>Welcome {users.email}</h2> <button onClick={logout}>Logout</button>
        </div>
      )}
    </>
  )
}
