import { computed, action, observable } from 'mobx'
import { Chunk, FrameType, Loop, Frame } from '../types'

const { SolidColor, Video } = FrameType
const masterDefaults = {
  count: 1
}

const defaultChunks: any = {
  [SolidColor]: {
    ...masterDefaults,
    frame: { type: SolidColor, color: 'white' }
  },
  [Video]: {
    ...masterDefaults,
    frame: { type: Video, loaded: false }
  }
}

export default class ChunksStore {
  @observable
  public chunks: Chunk[] = [
    { count: 1, frame: { type: SolidColor, color: 'black' } },
    { count: 2, frame: { type: SolidColor, color: 'white' } },
    { count: 1, frame: { type: SolidColor, color: '#ABABAB' } }
  ]

  @observable
  private loopIndex: number = 0

  @action
  public getCurrentFrame = (): Frame => {
    try {
      const frame = this.loop.frames[this.loopIndex]
      if (!frame) throw 'any'
      this.loopIndex++
      return frame
    } catch (e) {
      this.loopIndex = 0
      return this.loop.frames[this.loopIndex]
    }
  }

  @computed
  public get loop(): Loop {
    const frames: Frame[] = []
    this.chunks.forEach(chunk => {
      for (let i = 0; i < chunk.count; i++) {
        frames.push(chunk.frame)
      }
    })
    return { size: frames.length, frames }
  }

  @action
  public setNewChunks = (chunks: Chunk[]): void => {
    this.chunks = chunks
  }

  @action
  public updateFrameCount = (chunk: Chunk, newFrameCount: number): void => {
    const i = this.chunks.findIndex(c => c === chunk)
    const clone = this.chunks.slice()
    clone[i].count = newFrameCount
  }

  @action
  public updateColor = (chunk: Chunk, color: string): void => {
    const i = this.chunks.findIndex(c => c === chunk)
    const clone = this.chunks.slice()
    if (clone[i].frame.type === FrameType.SolidColor) {
      ;(clone[i].frame as any).color = color
    }
  }

  @action
  public createNewChunk = (type: FrameType): void => {
    this.chunks.push(defaultChunks[type])
  }

  @action
  public removeChunk = (chunk: Chunk): void => {
    this.chunks = this.chunks.filter(c => c !== chunk)
  }
}
