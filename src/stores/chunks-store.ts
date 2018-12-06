import { computed, action, observable } from 'mobx'
import { Chunk, ChunkType } from '../types'

export default class ChunksStore {
  @observable
  public chunks: Chunk[] = [
    { frameCount: 1, type: ChunkType.SolidColor, color: 'black' },
    { frameCount: 2, type: ChunkType.SolidColor, color: 'white' },
    { frameCount: 1, type: ChunkType.SolidColor, color: '#ABABAB' }
  ]

  @action
  public setNewChunks = (chunks: Chunk[]): void => {
    this.chunks = chunks
  }

  @action
  public updateFrameCount = (chunk: Chunk, newFrameCount: number): void => {
    const i = this.chunks.findIndex(c => c === chunk)
    const clone = this.chunks.slice()
    clone[i].frameCount = newFrameCount
  }
}
