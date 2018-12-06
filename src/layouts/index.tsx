import * as React from 'react'
import DevTools from 'mobx-react-devtools'
import './index.scss'

export default class MainLayout extends React.Component {
  render() {
    return (
      <div className="ff">
        {this.props.children}
        <DevTools />
      </div>
    )
  }
}
