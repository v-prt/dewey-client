import React, { createContext, useState, useEffect } from 'react'
// import { useQueryClient } from 'react-query'
import axios from 'axios'
import { API_URL } from '../constants'

export const UserContext = createContext(null)
export const UserProvider = ({ children }) => {
  //   const queryClient = new useQueryClient()
  const [currentUser, setCurrentUser] = useState(undefined)
  const [checkedToken, setCheckedToken] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('deweyToken'))

  // SIGNUP
  const handleSignup = async values => {
    try {
      const res = await axios.post(`${API_URL}/users`, values)
      // TODO: log user in on success
      return res
    } catch (err) {
      console.log(err.response)
      return { error: err.response.data }
    }
  }

  // LOGIN
  const handleLogin = async values => {
    try {
      const res = await axios.post(`${API_URL}/login`, values)
      // TODO: use jwt
      setToken(res.data.user._id)
      setCurrentUser(res.data.user)
      return res.data.user
    } catch (err) {
      console.log(err.response)
      return { error: err.response.data }
    }
  }

  const verifyToken = async token => {
    try {
      const res = await axios.get(`${API_URL}/users/${token}`)
      if (res.status === 200) {
        setCurrentUser(res.data.user)
        setCheckedToken(true)
      } else {
        // something wrong with token
        localStorage.removeItem('deweyToken')
        window.location.replace('/')
        setCurrentUser(undefined)
      }
    } catch (err) {
      // something wrong with token
      localStorage.removeItem('deweyToken')
      window.location.replace('/')
      setCurrentUser(undefined)
    }
  }

  useEffect(() => {
    if (token) {
      verifyToken(token)
    } else setCheckedToken(true)
  }, [token])

  // LOGOUT
  const handleLogout = ev => {
    ev.preventDefault()
    localStorage.removeItem('deweyToken')
    window.location.replace('/login')
  }

  return (
    <UserContext.Provider
      value={{
        checkedToken,
        token,
        handleSignup,
        handleLogin,
        handleLogout,
        currentUser,
      }}>
      {children}
    </UserContext.Provider>
  )
}
