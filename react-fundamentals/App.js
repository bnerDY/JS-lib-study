import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component { // enable multiple state
    constructor() {// enable this keyword
        super();
        this.state = {
            txt: "this is the state txt",
            cat: 0
        };
        this.update = this.update.bind(this);
    }

    update(e) {
        this.setState({txt: e.target.value})
    }

    render() {
        let txt = this.state.txt;
        return (
            <div>
                <input type="text" onChange={this.update} />
                <h1>{txt}</h1>
            </div>
        );
    }
}

const Widget = (props) => {
    return (
        <div>
            <input type="text" onChange={props.update} />
            <h1>{props.txt}</h1>
        </div>
    );
};

// App.propTypes = {
//     txt: React.PropTypes.string,
//     cat: React.PropTypes.number.isRequired
// };
//
// App.defaultProps = {
//     txt: 'this is the default txt'
// };

ReactDOM.render(
    <App cat={5}/>,
    document.getElementById('app')
);

// const App = () => <h1>Hello Something</h1>
export default App