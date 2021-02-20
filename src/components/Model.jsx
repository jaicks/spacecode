import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';



export default class Model extends Component {
  constructor(props){
    super(props);
    this.state={
      show: false,
      savetitle:"",
      savedesc:"",
      savepost: []
    }
  }
  create_post = () =>{
    this.setState({show: !this.state.show})
  }
  hideModal = () =>{
    this.setState({show:false})
    {this.props.getdata()}

  }

  savetitle = (e) =>{
      this.setState({savetitle:e.target.value})
      console.log(e.target.value)
  }

  savedesc = (e) =>{
      this.setState({savedesc:e.target.value})
      console.log(e.target.value)
  }
  savepost = () =>{
    console.log()
    axios({url:"https://jsonplaceholder.typicode.com/posts", method:"post",
        data:{
          "title": this.state.savetitle,
          "description":this.state.savedesc
        }})
    .then( res=>{
      this.props.getdata()
    
    })
  }

  render() {
    console.log(this.props)
    return (
      <div>
          <button onClick={this.create_post}>
          <AddIcon />
          </button>

          <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Title and description</Modal.Title>
          </Modal.Header>

          <Modal.Body>
                        Enter Title:
                        <input className="form-control mt-2 mb-2" placeholder="Enter the title" onChange={(e) => { this.savetitle(e) }}></input>
                        Enter Description:
                        <input className="form-control mt-2" placeholder="Enter the description" onChange={(e) => { this.savedesc(e) }}></input>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>Close</Button>
            <Button variant="primary" onClick = {this.savepost}>Save Post</Button>
          </Modal.Footer>
        </Modal>
       
      </div>
    )
  }
}