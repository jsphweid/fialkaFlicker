import { action, observable, computed, reaction } from 'mobx'

export default class CanvasMetadataStore {
  @observable private _canvasWidth = 640
  @observable private _canvasHeight = 480
  @observable private _fps = 30
  @observable private _stopped = true

  @computed
  public get canvasWidth() {
    return this._canvasWidth
  }

  @computed
  public get canvasHeight() {
    return this._canvasHeight
  }

  @computed
  public get fps() {
    return this._fps
  }

  @computed
  public get stopped() {
    return this._stopped
  }

  @action
  public updateCanvasWidth = (newWidth: number): void => {
    this._canvasWidth = newWidth
  }

  @action
  public updateCanvasHeight = (newHeight: number): void => {
    this._canvasHeight = newHeight
  }

  @action
  public updateFps = (newFps: number): void => {
    this._fps = newFps
  }

  @action
  public toggleStop = (): void => {
    this._stopped = !this._stopped
  }

  @action
  public setKickoff = (fn: Function): void => {
    reaction(
      () => this._stopped,
      stopped => {
        if (!stopped) {
          fn()
        }
      }
    )
  }
}
