import React, { useState,useEffect } from 'react'
import "../signup/signup.component.scss";
import { Link } from "react-router-dom"
import {connect} from "react-redux";
import {setActivateNull,signInStart} from "../../redux/user/user.action"

const Signin = ({setActivateNull,signInStart}) => {
  
            useEffect(()=>{
                        setActivateNull()
            },[setActivateNull])
            const [formData, setFormData] = useState({
                        email: "",
                        password: ""
            })
            const { email, password } = formData;

            const onHandleChange = e => {
                        setFormData({
                                    ...formData,
                                    [e.target.name]: e.target.value
                        })

            }

            const onSubmit = e => {
                        e.preventDefault();
                        signInStart(email, password)
            }
            return(
          <div className="signup">
                                
                                    <div className="signup_wrapper">
                                                <div className="brand">
                                                            <h1>Instagram</h1>
                                                </div>
                                                
                                                <form onSubmit={onSubmit}>
                                                            <div className="input">
                                                                        <input
                                                                                    type="email"
                                                                                    name="email"
                                                                                    placeholder="Email"
                                                                                    value={email}
                                                                                    onChange={e => onHandleChange(e)}
                                                                                    required
                                                                        />
                                                            </div>

                                                            <div className="input">
                                                                        <input
                                                                                    type="password"
                                                                                    name="password"
                                                                                    placeholder="Password"
                                                                                    value={password}
                                                                                    onChange={e => onHandleChange(e)}
                                                                                    required

                                                                        />
                                                            </div>

                                                            <div className="input">
                                                                        <button type="submit">Signup</button>
                                                            </div>

                                                </form>

                                                <div className="signin">
                                                            <p>Don't have an account? <Link to="/accounts/register" className="option">Register</Link></p>
                                                </div>
                                    </div>

                        </div>
            )
}
const mapDispatchToProps=dispatch=>({
            setActivateNull:()=>dispatch(setActivateNull()),
            signInStart:(email,password)=>dispatch(signInStart({email,password}))
})
export default connect(null,mapDispatchToProps)(Signin);
