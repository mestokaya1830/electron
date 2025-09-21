import React, { useEffect } from 'react'

const getUsers = async () => {
  const res = window.api.getUsers()
  console.log(res)
}
export default function Home() {
  useEffect(() => {
    getUsers()
  })
  return (
    <>
      <h1>Home</h1>
    </>
  )
}
