import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

import styled from 'styled-components/macro'
import { DashboardSidebar } from './DashboardSidebar'
import { DashboardContent } from './DashboardContent'

export const Dashboard = () => {
  const { currentUser } = useContext(UserContext)

  return currentUser ? (
    <Wrapper>
      <DashboardSidebar currentUser={currentUser} />
      <DashboardContent />
    </Wrapper>
  ) : (
    <Navigate to='/login' />
  )
}

const Wrapper = styled.div`
  display: flex;
`
