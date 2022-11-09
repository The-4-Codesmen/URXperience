import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SideBar from '../components/SideBar'
import MessageForm from '../components/MessageForm'
const Community = () => {
  return (
    <div className="md:flex min-h-screen relative">
      <SideBar />
      <div className="w-full p-10">
        <MessageForm />
      </div>
    </div>
  )
}

export default Community