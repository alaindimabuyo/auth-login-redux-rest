import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import {loginUser} from '../redux/actions/actions'

const Auth = (props) => {
    const userState = useSelector(state => state.loginReducer)
    const dispatch = useDispatch()
    const [user, setUser] = React.useState({
        email: "",
        password: ""
      });
      const { email, password } = user

      const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
      React.useEffect(() => {
        if (userState.isAuthenticated) {
          //is statement is true redirect into homepage
          props.history.push('/')
        }
    
        //eslint-disable-next-line
      }, [userState.isAuthenticated, props.history])

    const onSubmit = e => {

        e.preventDefault();
        //call method to login
        if (email === '' || password === '') {
          console.log('Please fill all fields', 'danger')
        } else {
          dispatch(loginUser({
                email,
                password
            }));
        }
      };
    return (
      <div className='login-container'>
        <div>
          <h1>
            Account <span>Login</span>
          </h1>
          <form className="formWrapper" onSubmit={onSubmit}>
            <div className='container'>
              <label htmlFor='email'>Email Address</label>
              <input type='text' name='email' value={email} onChange={onChange} />
            </div>
            <div className='container'>
              <label htmlFor='password'>Password</label>
              <input type='text' name='password' value={password} onChange={onChange} />
            </div>
            <input className="save-button" type='submit' value='Login' />
          </form>
        </div>
      </div>
    )
}

export default Auth
