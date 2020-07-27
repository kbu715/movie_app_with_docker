import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { registerUser } from '../../_actions/user_action'
import './SignUp.css';
import { withRouter } from 'react-router-dom';

function SignUp(props){

  const dispatch = useDispatch();


    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value);
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value);
    }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }


    const onSubmitHandler = (event) => {
        event.preventDefault(); //페이지 refresh 방지

      if(Password !== ConfirmPassword) {
        return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
      }


        let body = {
            email : Email,
            password : Password,
            name : Name
        }
        
        //redux action => loginUser는 action이름
        dispatch(registerUser(body))
          .then(response => {
            if(response.payload.success) {
              props.history.push('/sign-in')
              alert('회원가입 성공!');
            } else {
              alert('회원가입 실패');
            }
          })
        
    }
  
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={onSubmitHandler}>
            <h3>Sign Up</h3>
            
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={Email}
                onChange={onEmailHandler}
              />
            </div>


            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={Name}
                onChange={onNameHandler}
              />
            </div>           
            

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={Password}
                onChange={onPasswordHandler}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={ConfirmPassword}
                onChange={onConfirmPasswordHandler}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  
}

export default withRouter(SignUp);