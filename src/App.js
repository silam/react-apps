//import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

import {TodoBanner} from "./ToDoBanner";
import {TodoCreator} from "./TodoCreator";
import {TodoRow} from "./TodoRow";

import {VisibilityControl} from "./VisibilityControl";



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default class App extends Component {

  constructor(props){
    // State Data and Data binding
    super(props);
    this.state = {
      userName: "Adam",

      todoItems: [
        {action: "Buy Flowers", done: false},
        {action: "Get Shoes", done: false},
        {action: "Collect Tickers", done: true},
        {action: "Call Joe Biden", done: false}
      ],
      showCompleted: true
      //newItemText: ""
    }
  }



  updateNewTextValue = (event) => {
    this.setState({
      newItemText: event.target.value
    });
  }


  createNewTodo = (task)=>
  {
    if ( !this.state.todoItems.find(item=>item.action === task))
    {
      this.setState(
        {
          todoItems: [...this.state.todoItems, {
            action: task, done: false
          }]}, () => localStorage.setItem("todos", JSON.stringify(this.state)));

        
      
    }
  }


  changeStateData = () => {
    this.setState(
      {
        userName: this.state.userName === "Adam" ? "Bob": "Adam"
      }
    )
  }



  toggleTodo = (todo) => {
    this.setState(
      {
        todoItems: this.state.todoItems.map(item => item.action === todo.action?
          {...item, done:!item.done} : item)
      }
    );

  }

  todoTableRows = (doneValue)=> this.state.todoItems
    .filter(item=> item.done === doneValue)
    .map(item=>
          // <tr key={item.action} >
          //   <td>{item.action}</td>
          //   <td>
          //     <input type="checkbox" checked={item.done}
          //       onChange={()=>this.toggleTodo(item)} />
          //   </td>
          // </tr>

          <TodoRow key={item.action} item={item}
            callback={this.toggleTodo}/>
      );

  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(data != null ? JSON.parse(data) :
      {
          userName: "Adam",
          todoItems: [
            {action: "Buy Flowers", done: false},
            {action: "get shoes", done: false},
            { action: "Collect Tickets", done: true},
            {action: "Call Joe", done: false}
          ],
          showCompleted: true
      });
  }
  
  
  // can use this fat arrow function
  // render = () => 
  //   <div>

  //   </div>


  render(){
    return (
      <div>
        {/* <h4 className="bg-primary text-white text-center p-2">
          {this.state.userName} is to do list
          ({this.state.todoItems.filter(t=>!t.done).length} items to do)
        </h4> */}


        <TodoBanner name={this.state.userName} tasks = {this.state.todoItems} />


        <div className="container-fluid">
          {/* <div className="my-1">
            <input className="form-control"
              value={this.state.newItemText}
              onChange={this.updateNewTextValue}>

              </input>
              <button className="btn btn-primary mt-1"
                  onClick={this.createNewTodo}>
                  Add
              </button>

          </div> */}

          <TodoCreator  callback={this.createNewTodo}/>

          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Descripton</th>
                <th>Done</th>
              </tr>
            </thead>

            <tbody>
              {this.todoTableRows(false)}
            </tbody>
          </table>

          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl description="Completed Tasks"
                isChecked={this.state.showCompleted}
                callback={(checked)=> this.setState({showCompleted: checked})}>

            </VisibilityControl>
          </div>

          {this.state.showCompleted && 
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    
                    <th>Description</th>
                 
                    <th>Done</th>
                  
                  </tr>

                  <tbody>{this.todoTableRows(true)}</tbody>
                </thead>
              </table>
          }

        </div>
        
      </div>
    )
  }
}

