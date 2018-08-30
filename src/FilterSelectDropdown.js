import React from 'react';
// import CheckType from './CheckType.jsx'
import './App.css';

  class App extends React.Component {
         constructor(props) {
         super(props);
         this.state = 
         {
          value: 'image',
          result:[],
          val1:[],
          val2:[]
        };

        }
          userList = () => {
  fetch('https://api.myjson.com/bins/13twjs')
  .then(response => response.json())
  .then(data => this.setState({result:data}) )
  return
}

          componentDidMount = () => {
    this.userList()
  }


        handleChange = (event) => {
        this.setState({value: event.target.value});
        }

        handleSubmit = (event) => {
        // alert('seleted text: ' + this.state.value);
        event.preventDefault();
         this.state.result.map( x=> {
          if(x.type==="image"){
              // console.log(x.src)
              this.state.val1.push(x.src)
              // this.setState({value:x.type})
          }
          else{
            // console.warn(x.src)
            this.state.val2.push(x.src)
            // this.setState({value:x.type})  
          }
          this.setState({value:x.type})

         })
        }

        render() {
          let filterResult;

          if(this.state.value==="image"){
            
         filterResult = this.state.val1.map( x=> {
           console.warn(x)
       return <li><img src={x} alt="image" width="200" height="200" /></li>
  })

  }

          else{
 
            filterResult = this.state.val2.map( x=> {
              console.warn(x)
       return <li><iframe src= {x}
   width="200" height="200" frameborder="0" allowfullscreen></iframe></li>
          })

        }

         return (
          <div>
           <form onSubmit={this.handleSubmit}>
            <label>
             
             <select value={this.state.value} onChange={this.handleChange}>
             <option value="image">image</option>
             <option value="video">video</option>
           </select>
           </label>
           <input type="submit" value="Submit" />
         </form>
<ul>{filterResult}</ul>

         </div>

       );

       }  
       } 

export default App;