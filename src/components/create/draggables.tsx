import * as React from 'react'
import { getStores } from '../../stores'
import { observer } from 'mobx-react'
import { Draggable } from 'react-beautiful-dnd'
import ChunkDisplay from './chunk'

@observer
export default class Draggables extends React.Component {
  public render() {
    const { chunks } = getStores().chunksStore
    return chunks.map((chunk, i) => {
      return (
        <Draggable draggableId={`draggable-${i}`} index={i} key={`drag${i}`}>
          {provided => (
            <div ref={provided.innerRef} {...provided.draggableProps}>
              <ChunkDisplay
                chunk={chunk}
                dragHandleProps={{ ...provided.dragHandleProps }}
              />
            </div>
          )}
        </Draggable>
      )
    })
  }
}
