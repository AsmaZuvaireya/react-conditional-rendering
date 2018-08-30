import React, { Component } from 'react';
import Checkbox from './Checkbox';

const items = [
  'One',
  'Two'
];

class Application extends Component {
  constructor(props) {
         super(props);
         this.state = {
          result:[],
          imageList:[],
          videoList:[],
          chk:''
         }
       }
   componentDidMount = () => {
    this.userList()
  }
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }
  userList = () => {
     fetch('https://api.myjson.com/bins/13twjs')
  .then(response => response.json())
  .then(data => {
  this.setState({result:data}) 
  this.state.result.map( x=> {
          if(x.type==="image"){
              this.state.imageList.push(x.src)
          }
          else{
              this.state.videoList.push(x.src)
          }
      })
  return
})
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) { 
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
        console.log(checkbox)
        this.setState({chk:checkbox}) 
    }

  }

  createCheckbox = label => (
    <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
  )

  createCheckboxes = () => (
    items.map(this.createCheckbox)
  )

  render() {
 let filterResult;

          if(this.state.chk==="One"){
            
         filterResult = this.state.imageList.map( x=> {
       return <li><img src={x} alt="image" width="200" height="200" /></li>
  })

  }

          else{
 
            filterResult = this.state.videoList.map( x=> {

       return <li><iframe src= {x}
   width="200" height="200" frameborder="0" allowfullscreen></iframe></li>
          })

        }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">

            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <button className="btn btn-default" type="submit">Save</button>
            </form>
            
            <ul>{filterResult}</ul>          
            
          </div>
        </div>
      </div>
    );
  }
}

export default Application;