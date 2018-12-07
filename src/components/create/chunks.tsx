import * as React from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { getStores } from '../../stores'
import { arrayMove } from '../../helpers'
import { observer } from 'mobx-react'
import Draggables from './draggables'
import Select from 'react-select'
import { options } from '../../stores/new-chunk-store'

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

  public render() {
    const { createNewChunk } = getStores().chunksStore
    return (
      <div>
        <div className="ff-newChunk">
          <Select
            className="ff-newChunk-input"
            placeholder="Choose New Chunk"
            value={null}
            options={options}
            onChange={(option: any) => createNewChunk(option.value)}
          />
        </div>
        <DragDropContext onDragEnd={this.handleOnDragEnd}>
          <Droppable droppableId="droppable-1" direction="vertical">
            {provided => (
              <div
                className="ff-chunks"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Draggables />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    )
  }
}
