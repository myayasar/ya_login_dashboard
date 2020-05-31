import React, { Component } from "react";
import { Link } from "react-router-dom";
import factory from '../lib';
const country = require('../data/country.json') 

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.country = country;
        this.formInput = React.createRef();
        this.state={formError:false,errorMessage:"Please enter all correct details."}
    }
    onSubmitForm = event => {
        event.preventDefault();
		if(event.type === 'keydown') {
			if(event.key !== 'Enter') {
				return;
			}
        }
        let formError = false;
        let postData = {};
        for (var elename in this.formInput.current.elements){
            let element = this.formInput.current.elements[elename];
            if(element.type == "text" || element.type == "password" || element.type=="select-one" || element.type=="radio" || element.type == "email"){
                if(element.value == ""){
                formError = true;
                factory.addClass(element,"is-invalid")
                } else {
                    postData[element.name] = element.value;
                }
            }
        }
        if(formError){
            this.setState({formError})
            return false;
        } else {
            this.setState({formError});
            console.log(postData,"postData");
            fetch(`/api/signup`,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body : JSON.stringify(postData)
            })
            .then(res => res.json())
            .then(({status,message,data}) => {
                if(status == "SUCCESS"){
                    this.setState({formError:false});
                }else {
                    this.setState({formError:true});
                }
            });
        }
    }
    render() {
        return (
            <form ref={this.formInput} onSubmit={this.onSubmitForm}>
                <h3>Sign Up</h3>
                {this.state.formError && (<div className="alert alert-danger" role="alert">
            {this.state.errorMessage}
            </div>)}
                <div className="form-group">
                    <label>User name</label>
                    <input type="text" name="username" className="form-control" placeholder="User name" required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" required/>
                </div>

                <div className="form-group">
                    <label>Conform Password</label>
                    <input type="password" name="password1" className="form-control" placeholder="Re-enter password" required/>
                </div>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" name="first_name" className="form-control" placeholder="First name" required/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text"  name="last_name" className="form-control" placeholder="Last name" required/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" required/>
                </div>

                <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="Male" required/>
  <label className="form-check-label" for="inlineRadio1">Male</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="Female" required/>
  <label className="form-check-label" for="inlineRadio2">Female</label>
</div>
<div className="form-group">
<label>Country</label>
    <select class="custom-select" name="country" required>
      <option value="">Select country</option>
      {this.country.map(({name,code})=>(
        <option value={name}>{name}</option>
      ))}
      
      
    </select>
  </div>
                

                <button type="submit" className="btn btn-primary btn-block" onClick={this.onSubmitForm}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                </p>
            </form>
        );
    }
}