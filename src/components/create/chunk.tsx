import * as React from 'react'
import { getStores } from '../../stores'
import { Chunk, ChunkType } from '../../types'
import { MdDragHandle } from 'react-icons/md'
import { observer } from 'mobx-react'

export interface ChunkProps {
  chunk: Chunk
  dragHandleProps: Object
}

@observer
export default class ChunkDisplay extends React.Component<ChunkProps> {
  public render() {
    const { chunk, dragHandleProps } = this.props
    const { type, frameCount } = chunk
    const { updateFrameCount } = getStores().chunksStore
    const color =
      chunk.type === ChunkType.SolidColor ? (
        <li
          style={{
            backgroundColor: chunk.color,
            width: '20px',
            height: '20px',
            border: '1px solid black'
          }}
        />
      ) : null
    return (
      <ul className="ff-chunk">
        <li className="ff-chunk-grab" {...dragHandleProps}>
          <MdDragHandle />
        </li>
        <li>{type}</li>
        <li>
          <input
            type="text"
            pattern="[0-9]*"
            onChange={e =>
              updateFrameCount(chunk, parseInt(e.currentTarget.value))
            }
            value={frameCount}
          />
        </li>
        {color}
      </ul>
    )
  }
}
