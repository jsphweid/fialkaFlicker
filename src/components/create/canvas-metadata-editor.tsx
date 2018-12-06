import * as React from 'react'
import { getStores } from '../../stores'
import { observer } from 'mobx-react'

@observer
export default class CanvasMetadataEditor extends React.Component {
  public render() {
    const {
      canvasHeight,
      canvasWidth,
      updateCanvasHeight,
      updateCanvasWidth,
      updateFps,
      fps,
      stopped,
      toggleStop
    } = getStores().canvasMetadataStore
    return (
      <div>
        <input
          type="text"
          pattern="[0-9]*"
          onChange={e => updateCanvasWidth(parseInt(e.currentTarget.value))}
          value={canvasWidth}
        />
        <input
          type="text"
          pattern="[0-9]*"
          onChange={e => updateCanvasHeight(parseInt(e.currentTarget.value))}
          value={canvasHeight}
        />
        <input
          type="text"
          pattern="[0-9]*"
          onChange={e => updateFps(parseInt(e.currentTarget.value))}
          value={fps}
        />
        <button onClick={() => toggleStop()}>
          {stopped ? 'Start' : 'Stop'}
        </button>
      </div>
    )
  }
}
