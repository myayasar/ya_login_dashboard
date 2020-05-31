import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Login extends Component {
    constructor(props){
        super(props);
        this.formInput = React.createRef();
        this.state={formError:false,errorMessage:"Please enter correct details."}
    }
    onSubmitForm = event => {
		event.preventDefault();
		if(event.type === 'keydown') {
			if(event.key !== 'Enter') {
				return;
			}
		}
        let {username,password} = this.formInput.current.elements;
        username = username.value;
        password = password.value;
        if(username != "" && password != ""){
            fetch(`/api/login`,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body : JSON.stringify({username,password})
            })
            .then(res => res.json())
            .then(({status,message,data}) => {
                if(status == "SUCCESS"){
                    this.setState({formError:false});
                    this.props.login(data);
                }else {
                    this.setState({formError:true});
                }
            });
        } else {
            this.setState({formError:true});
        }
	}
    render() {
        return (
            <form ref={this.formInput} onSubmit={this.onSubmitForm}>
                <h3>Sign In</h3>
                {this.state.formError && (<div className="alert alert-danger" role="alert">
            {this.state.errorMessage}
            </div>)}
                <div className="form-group">
                    <label>User Name</label>
                    <input type="text" name="username" className={this.state.formError ? "form-control is-invalid wrong-entry":"form-control"} placeholder="Enter Username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className={this.state.formError ? "form-control is-invalid wrong-entry":"form-control"} placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={event => this.onSubmitForm(event)}>Submit</button>
                <p className="forgot-password text-right">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </p>
            </form>
        );
    }
}