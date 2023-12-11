import React from 'react'
import { Outlet } from 'react-router-dom'
import DahsHeader from './DahsHeader'
import DashFooter from './DashFooter'

function DashLayout() {
  return (
    <>
        <DahsHeader />
        <div className='dash-container'>
            <Outlet/>
        </div>
        <DashFooter/>
    </>
  )
}

export default DashLayout