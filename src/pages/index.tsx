import * as React from 'react'
import { observer } from 'mobx-react'
import MainLayout from '../layouts'

@observer
export default class BrowsePage extends React.Component {
  public render() {
    return <MainLayout>main index</MainLayout>
  }
}
