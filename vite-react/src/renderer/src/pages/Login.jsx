import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function Login() {
  const dispatch = useDispatch()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleInput = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const loginUser = async (e) => {
    e.preventDefault()
    const res = await window.api.login(user)
    console.log(res)
    if (res.success) {
      dispatch({ type: 'login', payload: res.user })
      navigate('/')
    } else {
      setError(res.message)
    }
  }
  return (
    <>
      <title>Login</title>
      <meta name="description" content="Login content" />
      <meta name="keywords" content="react, meta tags, seo" />
      <meta name="author" content="Your Name" />

      <form className="container border rounded p-5">
        <h3 style={{ marginBottom: '30px' }}>Login</h3>
        <div className="mb-3 row">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <div>
            <input
              type="email"
              name="email"
              onChange={handleInput}
              className="form-control"
              id="email"
            />
            <div className="text text-danger mt-2"></div>
            <div className="text text-danger mt-2"></div>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <div>
            <input
              type="password"
              name="password"
              onChange={handleInput}
              className="form-control"
              id="inputPassword"
            />
            {error ? <div className="text text-danger mt-2">{error}</div> : ''}
          </div>
        </div>
        <div className="d-grid">
          <button onClick={loginUser}>Login</button>
        </div>
      </form>
    </>
  )
}
