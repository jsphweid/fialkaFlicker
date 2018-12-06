import * as React from 'react'
import { observer } from 'mobx-react'
import { getStores } from '../../stores/index'

@observer
export default class Canvas extends React.Component {
  ctx: CanvasRenderingContext2D | null = null

  public componentDidMount() {
    const canvas = this.refs.canvas as HTMLCanvasElement
    this.ctx = canvas.getContext('2d')
    window.requestAnimationFrame(this.draw)
    getStores().canvasMetadataStore.setKickoff(this.draw)
  }

  private draw = () => {
    const {
      canvasWidth,
      canvasHeight,
      stopped
    } = getStores().canvasMetadataStore
    if (!this.ctx || stopped) return

    window.requestAnimationFrame(this.draw)

    this.ctx.fillStyle = '#FF0000'
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }

  public render() {
    const { canvasWidth, canvasHeight } = getStores().canvasMetadataStore
    return <canvas ref="canvas" width={canvasWidth} height={canvasHeight} />
  }
}