export enum FrameType {
  SolidColor = 'Solid Color',
  Video = 'Video'
}

export interface Chunk {
  count: number
  frame: Frame
}

export interface BaseFrame {
  type: FrameType
}

export type Frame = SolidColorFrame | VideoFrame

export interface SolidColorFrame extends BaseFrame {
  color: string
  type: FrameType.SolidColor
}

export interface VideoFrame extends BaseFrame {
  loaded: false
  type: FrameType.Video
}

export interface Loop {
  frames: Frame[]
  size: number
}
