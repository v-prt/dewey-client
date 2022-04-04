import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import styled from 'styled-components/macro'
import { backgrounds } from '../GlobalStyles'
import { UserContext } from '../contexts/UserContext'
import check from '../assets/check.svg'

export const Header = () => {
  const { currentUser, handleLogout } = useContext(UserContext)

  return (
    <Wrapper>
      <div className='inner'>
        <span className='app-info'>
          <Link to='/'>
            <h1>
              <img src={check} alt='' /> DEWEY
            </h1>
          </Link>
          <p>
            <span className='dot'>•</span>
            Your task and habit tracker
          </p>
        </span>
        <span className='links'>
          {currentUser ? (
            <>
              <Link to='/dashboard'>
                <Button type='primary'>My Dashboard</Button>
              </Link>
              <Button type='secondary' onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to='/login'>
                <Button type='primary'>Sign In</Button>
              </Link>
              <Link to='/register'>
                <Button type='secondary'>Register</Button>
              </Link>
            </>
          )}
        </span>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  background: ${backgrounds.pink};
  color: #fff;
  position: fixed;
  top: 0;
  padding: 5px 20px;
  width: 100%;
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .app-info {
      display: flex;
      align-items: center;
      h1 {
        margin: 0;
        color: #fff;
        font-size: 1.3rem;
        letter-spacing: 2px;
        display: flex;
        align-items: center;
        img {
          height: 20px;
          margin-right: 10px;
        }
      }
      p {
        display: none;
        font-size: 0.7rem;
        text-transform: uppercase;
        .dot {
          margin: 0 10px;
        }
      }
    }
    .links {
      display: flex;
      align-items: center;
      button {
        margin-left: 10px;
      }
    }
  }
  @media only screen and (min-width: 600px) {
    padding: 5px 40px;
    .inner {
      .app-info {
        p {
          display: block;
        }
      }
      .links {
        button {
          margin-left: 20px;
        }
      }
    }
  }
`
