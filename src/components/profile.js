import React from "react";

const Profile = ({first_name,last_name,email,country,logout}) =>{

return (
<div className="card text-center">
  <div className="card-header">
   Dashboard
  </div>
  <div className="card-body">
<h5 className="card-title">{first_name} {last_name}</h5>
<div className="card-footer text-muted">
    Email
    </div>
<p className="card-text">{email}</p>
    <div className="card-footer text-muted">
    Country
    </div>
<p className="card-text">{country}</p>
    <a onClick={()=>logout()} className="btn btn-primary">Log out</a>
  </div>
  <div className="card-footer text-muted">
    
  </div>
</div>
)
}
export default Profile;