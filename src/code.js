import React from 'react'

function code() {
    let sol = `
    class HelloMessage extends React.Component {
        handlePress = () => {
          alert('Hello')
        }
        render() {
          return (
            <div>
              <p>Hello {this.props.name}</p>
              <button onClick={this.handlePress}>Say Hello</button>
            </div>
          );
        }
      }
      `;
  return (
    <div>{sol}</div>
  )
}

export default code