import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { setAuth } from '../../store/authSlice.jsx'
// import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'

export default function Login() {
  // const dispatch = useDispatch()

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
      navigate('/')
    } else {
      setError(res.message)
    }
    // axios
    //   .post('http://localhost:3000/api/login', user)
    //   .then((res) => {
    //     dispatch(setAuth(res.data.auth))
    //     res.status === 200 ? navigate('/admin') : setError(res.data)
    //   })
    //   .catch((err) => console.log(err))
  }
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login content" />
        <meta name="keywords" content="react, meta tags, seo" />
        <meta name="author" content="Your Name" />
      </Helmet>
      <form onSubmit={loginUser} className="container border rounded p-5">
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
          <button type="submit" className="btn btn-dark btn-lg">
            Login
          </button>
        </div>
      </form>
    </>
  )
}
