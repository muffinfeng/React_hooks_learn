import './App.css';
import React,{Component,PureComponent} from 'react'

class Foo extends PureComponent{
  render(){
    console.log('Foo render');
    return <div>{this.props.person.age}</div>;
  }
}


class App extends Component {
  state = {
    count: 0,
    person: {
      age: 1,
    }
  }


  render(){
    const person = this.state.person;
    const count = this.state.count;
    return (
      <div>
        <button onClick={() => {
          person.age++;
          this.setState({
            person,
          })
        }}>
          add
        </button>
        <Foo person={person}></Foo>
      </div>
    );
  }
}

export default App;
