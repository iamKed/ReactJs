import React, { Component } from 'react'

class Profile extends Component {
    constructor (){
        super();
        this.state={
            message:"This is Profile Page"
        }
    }
  render() {
    return (
      <div>Profile
        <p>{this.state.message}</p>
      </div>
    )
  }
}

export default Profile