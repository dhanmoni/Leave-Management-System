import React from 'react'
import PendingAdmins from './PendingAdmins'
import PendingStudents from './PendingStudents'

function SystemAdminDashboard() {
  return (
    <>
      <PendingStudents/>
      <PendingAdmins/>
    </>
  )
}

export default SystemAdminDashboard