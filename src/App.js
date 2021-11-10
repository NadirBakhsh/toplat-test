import { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          task: "testing",
          isDone: false,
        },
      ],
      task: "",
    };
    this.addItem = this.addItem.bind(this);
    this.done = this.done.bind(this);
  }

  addItem(e) {
    const arr = this.state.items;
    arr.push({ task: this.state.task, isDone: false });
    this.setState({ items: arr }, () => {
      this.setState({ task: "" });
    });
  }

  done(v) {
    const arr = this.state.items;
    if (!arr[v.target.value].isDone) {
      arr[v.target.value].isDone = true;
      this.setState({ items: arr });
    } else {
      arr[v.target.value].isDone = false;
      this.setState({ items: arr });
    }
  }


  componentDidMount() {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>this.setState({result: json}))
  }

  render() {
    return (
      <>
        <div className='TodoList'>
          <input
            value={this.state.task}
            onChange={(e) => this.setState({ task: e.target.value })}
            placeholder='item'
          />
          <button onClick={this.addItem}>add</button>

          <ul>
            {this.state.items.map((item, index) => {
              return (
                <li
                  key={item}
                  value={index}
                  onClick={this.done}
                  className={item.isDone && "is-done"}
                >
                  {item.task}
                </li>
              );
            })}
          </ul>

          <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
        </div>
      </>
    );
  }
}
