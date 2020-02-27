// import React from 'react';

// function LoginPage(props) {
//     return (
//         <div>
//             LoginPage
//         </div>
//     );
// }

// export default LoginPage;

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {loginUser} from '../../_actions/user_actions'
class Loginpage extends Component {
   
    state = {
        email: "",
        password: "",
        errors: []
    };
    
    displayErrors =errors =>
    errors.map((error, i) => <p key={i}>{error}</p>)
    

    handleChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitFrom =event =>{
        event.preventDefault();

        let datatosubmit = {
            email: this.state.email,
            password: this.state.password
        };


        if (this.isFormvaild(this.state)){
            this.setState({errors: []})
                this.props.dispatch(loginUser(datatosubmit))
                .then(response => {
                    if(response.payload.loginSuccess){
                        this.props.history.push('/')
                    }else{
                        this.setState({ 
                            errors: this.state.errors.concat(
                                "로그인에 실패 하였습니다. 이메일과 비밀번호를 확인하여 주십시오."
                            )
                        })
                    }
                }
                    )

        }else{
            this.setState({
                errors: this.state.errors.concat(
                    "올바르지 않은 형식입니다."
                )
            })
        }

    }

    isFormvaild= ({email, password}) => email && password;
 
   
    render() {
        return (
            <div className="container">
                <h2>로그인 페이지</h2>
                <div className='row'>
                    <form className="col s12" >
              
                
                        <div className='row'>
                            <div className="input-field col s12">
                <input
                    name="email"
                    value={this.state.email}
                    onChange={e => this.handleChange(e)}
                    id="email"
                    type="email"
                    className="vaildate"
                    />
                    <label htmlFor="email">Email</label>
                    <span
                        className="helper-text"
                        data-error = "Tpye a right type email"
                        data-success = "Right"
                       />
                </div>
                    
                </div>
                <div className="row">
                    <div className="input-field col s12">
                    <input
                    name="password"
                    value={this.state.password}
                    onChange={e => this.handleChange(e)}
                    id="password"
                    type="password"
                    className="vaildate"
                    />
                    <label htmlFor="email">Password</label>
                    <span
                        className="helper-text"
                        data-error = "Wrong"
                        data-success = "Right"
                       />

                    </div>

                </div>

                {this.state.errors.length > 0 && (
                    <div>
                        {this.displayErrors(this.state.errors)}
                    </div>
                )}
                <div className="row">
                <div className="input-field col s12">
                   <button className="btn waves-effect red ligthen-2"
                    type="submit"
                    name="action"
                    onClick={this.submitFrom}
                   > 로그인
                   
                   </button> 
                   &nbsp;&nbsp; &nbsp;&nbsp;
                   <Link to="/register">
                   <button className="btn waves-effect red ligthen-2"
                    type="submit"
                    name="action"
                   
                   >회원 가입
                   
                   </button> 
                   </Link>
                </div>       
                </div>


                </form>
                </div>
               
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        user: state.user
    }

}



export default connect(mapStateToProps)(Loginpage);