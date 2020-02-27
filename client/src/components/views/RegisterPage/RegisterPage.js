import React, { Component } from 'react';
import {registerUser} from '../../_actions/user_actions'
import {connect} from 'react-redux';

class Registerpage extends Component {
    
    state = {
        lastname:"",
        name:"",
        email: "",
        password: "",
        passwordComfirmation:"",
        errors: []
    };
    handleChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    isFormVaild = () =>{
        let errors =[];
        let error;

        if(this.isFormEmpty(this.state)){
            error = {message: "양식을 전부 입력해주세요."};
            this.setState({errors : errors.concat(error)})
        }else if(!this.isPasswordVaild(this.state)){
            error = {message: "비밀먼호가 유효하지 않습니다."};
            this.setState({errors : errors.concat(error)})
        }else
        return true;
    }

    isPasswordVaild = ({password, passwordComfirmation})=> {
        if(password.length <6 || passwordComfirmation.length<6)
        return false;
        else if(password !== passwordComfirmation){
         return false;   
        }
        else
        return true;
    }


    displayErrors =errors =>
    errors.map((error, i) => <p key={i}>{error}</p>)

    isFormEmpty = ({name, lastname, email,password,passwordComfirmation})=> {
        return(
            !name.length||
            !lastname.length||
            !email.length||
            !password.length||
            !passwordComfirmation.length

        );

    } 
    submitFrom = event =>{
        event.preventDefault();
        let dataToSubmit = {
            email: this.state.email,
            name: this.state.name,
            lastname: this.state.lastname,
            password:this.state.password,
            passwordComfirmation:this.state.passwordComfirmation
        }
        
        
        if(this.isFormVaild()){
            this.setState({errors: []})
            this.props.dispatch(registerUser(dataToSubmit))
            .then(response =>{ 
                if(!response.payload.success){
                    this.props.history.push('/login')
                }
                else{
                    this.setState({
                        errors: this.state.errors.concat("데이터 DB 전송 실패!!!!!!!!")
                    })
                }

               
            })
            .catch(err => {
                this.setState({
                    errors: this.state.errors.concat(err)
                });
            })
        }else{
            console.error("유효한 폼이 아닙니다.")
        }
    }

    render(){
    
    return (
        <div className="container">
                <h2>회원 가입</h2>
                <div className='row'>
                <form className="col s12" >
              
                
                <div className='row'>
                <div className="input-field col s12">
                <input
                    name="lastname"
                    value={this.state.lastname}
                    onChange={e => this.handleChange(e)}
                    id="lastname"
                    type="text"
                    className="vaildate"
                    />
                    <label htmlFor="lastname">lastname</label>
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
                    name="name"
                    value={this.state.name}
                    onChange={e => this.handleChange(e)}
                    id="name"
                    type="text"
                    className="vaildate"
                    />
                    <label htmlFor="name">name</label>
                    <span
                        className="helper-text"
                        data-error = "Wrong"
                        data-success = "Right"
                       />

                    </div>

                </div>

                <div className="row">
                    <div className="input-field col s12">
                    <input
                    name="email"
                    value={this.state.email}
                    onChange={e => this.handleChange(e)}
                    id="email"
                    type="email"
                    className="vaildate"
                    />
                    <label htmlFor="email">email</label>
                    <span
                        className="helper-text"
                        data-error = "Wrong"
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
                    <label htmlFor="email">password</label>
                    <span
                        className="helper-text"
                        data-error = "Wrong"
                        data-success = "Right"
                       />

                    </div>

                </div>

                <div className="row">
                    <div className="input-field col s12">
                    <input
                    name="passwordComfirmation"
                    value={this.state.passwordComfirmation}
                    onChange={e => this.handleChange(e)}
                    id="passwordComfirmation"
                    type="password"
                    className="vaildate"
                    />
                    <label htmlFor="email">passwordComfirmation</label>
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
                   > 계정 만들기
                   
                   </button> 
               
                </div>       
                </div>


                </form>
                </div>
               
            </div>
    );
}

}

export default connect()(Registerpage);