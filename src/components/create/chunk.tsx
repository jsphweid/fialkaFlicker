import * as React from 'react'
import { getStores } from '../../stores'
import { Chunk, FrameType } from '../../types'
import { MdDragHandle, MdClose } from 'react-icons/md'
import { observer } from 'mobx-react'

export interface ChunkProps {
  chunk: Chunk
  dragHandleProps: Object
}

@observer
export default class ChunkDisplay extends React.Component<ChunkProps> {
  private renderColor() {
    const { chunk } = this.props
    const { frame } = chunk
    const { updateColor } = getStores().chunksStore
    if (frame.type !== FrameType.SolidColor) return null

    return [
      <li
        key="color"
        style={{
          backgroundColor: frame.color,
          width: '20px',
          height: '20px',
          border: '1px solid black'
        }}
      />,
      <li key="colorinput">
        <input
          type="text"
          onChange={e => updateColor(chunk, e.currentTarget.value)}
          value={frame.color}
        />
      </li>
    ]
  }

  public render() {
    const { chunk, dragHandleProps } = this.props
    const { frame, count } = chunk
    const { updateFrameCount, removeChunk } = getStores().chunksStore

    return (
      <ul className="ff-chunk">
        <li className="ff-chunk-grab" {...dragHandleProps}>
          <MdDragHandle />
        </li>
        <li className="ff-chunk-close" onClick={() => removeChunk(chunk)}>
          <MdClose />
        </li>
        <li>{frame.type}</li>
        <li className="ff-chunk-count">
          <input
            type="text"
            pattern="[0-9]*"
            onChange={e =>
              updateFrameCount(chunk, parseInt(e.currentTarget.value))
            }
            value={count}
          />
        </li>
        {this.renderColor()}
      </ul>
    )
  }
}
