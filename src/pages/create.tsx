import * as React from 'react'
import { observer } from 'mobx-react'
import MainLayout from '../layouts'
import Chunks from '../components/create/chunks'
import Canvas from '../components/create/canvas'
import CanvasMetadataEditor from '../components/create/canvas-metadata-editor'

@observer
export default class CreatePage extends React.Component {
  public render() {
    return (
      <MainLayout>
        <div className="ff-create">
          <Chunks />
          <CanvasMetadataEditor />
          <Canvas />
        </div>
      </MainLayout>
    )
  }
}
