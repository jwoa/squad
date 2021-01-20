import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions';
import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'

const LoginPage = ({ history }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if(userInfo) {
        console.log(userInfo)
        history.push({
          pathname: 'app/dashboard'
        })
    }
  }, [userInfo, history])

  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password))
  }  

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              {error && <p>{error}</p>}
              {loading && <p>Loading . . .</p>}
              <form onSubmit={submitHandler}>
                <Label>
                  <span>Email</span>
                  <Input 
                    className="mt-1" 
                    type="email"
                    autoComplete="username" 
                    placeholder="keisha@seasonsix.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input 
                    className="mt-1" 
                    type="password"
                    autoComplete="current-password" 
                    placeholder="********" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Label>

                <Button className="mt-4" block type="submit" value="Submit">
                  Log in
                </Button>
              </form>
              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
