export enum ChunkType {
  SolidColor = 'Solid Color',
  Video = 'Video'
}

export interface BaseChunk {
  frameCount: number
  type: ChunkType
}

export type Chunk = SolidColorChunk | VideoChunk

export interface SolidColorChunk extends BaseChunk {
  color: string
  type: ChunkType.SolidColor
}

export interface VideoChunk extends BaseChunk {
  videoTitle: string // remove
  type: ChunkType.Video
}
