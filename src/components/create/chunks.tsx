import * as React from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import { getStores } from '../../stores'
import { arrayMove } from '../../helpers'
import { Chunk, ChunkType } from '../../types'
import { MdDragHandle } from 'react-icons/md'
import { observer } from 'mobx-react'
import ChunkDisplay from './chunk'

@observer
export default class Chunks extends React.Component {
  constructor(props: any) {
    super(props)
  }
  private handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result
    if (!destination) return
    const chunks = getStores().chunksStore.chunks
    const newChunks = arrayMove([...chunks], source.index, destination.index)
    getStores().chunksStore.setNewChunks(newChunks)
  }

  private renderDraggables() {
    const { chunks } = getStores().chunksStore
    return chunks.map((chunk, i) => {
      return (
        <Draggable draggableId={`draggable-${i}`} index={i} key={i}>
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

  public render() {
    return (
      <DragDropContext onDragEnd={this.handleOnDragEnd}>
        <Droppable droppableId="droppable-1" type="PERSON">
          {provided => (
            <div
              className="ff-chunks"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.renderDraggables()}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}
