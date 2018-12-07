import * as React from 'react'
import { observer } from 'mobx-react'
import { getStores } from '../../stores/index'
import { FrameType } from '../../types'

class FpsControlledLoop {
  private delay: number
  private time: number | null = null
  private frameIndex = -1
  private tref: number | undefined
  private isPlaying = false
  private callback: Function
  private fps: number

  constructor(fps: number, callback: Function) {
    this.fps = fps
    this.delay = 1000 / fps
    this.callback = callback
  }

  private loop = (timestamp: number) => {
    if (!this.time) {
      this.time = timestamp
    }
    const seg = Math.floor((timestamp - this.time) / this.delay)
    if (seg > this.frameIndex) {
      this.frameIndex = seg
      this.callback({
        time: timestamp,
        frame: this.frameIndex
      })
    }
    this.tref = requestAnimationFrame(this.loop)
  }

  public setNewFrameRate = (newfps: number) => {
    this.fps = newfps
    this.delay = 1000 / this.fps
    this.frameIndex = -1
    this.time = null
  }

  public start = () => {
    if (!this.isPlaying) {
      this.isPlaying = true
      this.tref = requestAnimationFrame(this.loop)
    }
  }

  public pause = () => {
    if (this.isPlaying && this.tref) {
      cancelAnimationFrame(this.tref)
      this.isPlaying = false
      this.time = null
      this.frameIndex = -1
    }
  }
}

@observer
export default class Canvas extends React.Component {
  private ctx: CanvasRenderingContext2D | null = null
  private controlledLoop: FpsControlledLoop

  constructor(props: any) {
    super(props)
    this.controlledLoop = new FpsControlledLoop(30, this.draw)
    getStores().canvasMetadataStore.setStartStop(
      this.controlledLoop.start,
      this.controlledLoop.pause
    )
    getStores().canvasMetadataStore.setFpsUpdater(
      this.controlledLoop.setNewFrameRate
    )
  }

  public componentDidMount() {
    const canvas = this.refs.canvas as HTMLCanvasElement
    this.ctx = canvas.getContext('2d')
  }

  private draw = () => {
    const { canvasWidth, canvasHeight } = getStores().canvasMetadataStore
    if (!this.ctx) return

    const currentFrame = getStores().chunksStore.getCurrentFrame()
    if (currentFrame.type === FrameType.SolidColor) {
      this.ctx.fillStyle = currentFrame.color
    }

    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }

  public render() {
    const { canvasWidth, canvasHeight } = getStores().canvasMetadataStore
    return <canvas ref="canvas" width={canvasWidth} height={canvasHeight} />
  }
}
