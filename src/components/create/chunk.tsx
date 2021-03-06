import * as React from 'react'
import { getStores } from '../../stores'
import { Chunk, FrameType } from '../../types'
import { MdDragHandle, MdClose } from 'react-icons/md'
import { observer } from 'mobx-react'
import { extractFramesFromVideo } from '../../helpers'

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

  private renderUpload() {
    const { chunk } = this.props
    const { frame } = chunk
    if (frame.type !== FrameType.Video) return null

    return (
      <input
        type="file"
        id="myFile"
        size={50}
        onChange={async e => {
          console.log('file', e)
          const { files } = e.currentTarget
          if (!files) return
          const frames = await extractFramesFromVideo(files[0])
          console.log('hi', e)
        }}
      />
    )
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
        {this.renderUpload()}
      </ul>
    )
  }
}
