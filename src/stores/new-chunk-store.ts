import { action, observable } from 'mobx'
import { FrameType } from '../types'

const frameTypes = Object.values(FrameType)

export const options = frameTypes.map(frameType => ({
  value: frameType,
  label: frameType
}))

export const defaultOption = options[0]

export default class NewChunkStore {
  @observable
  public selectedOption = defaultOption

  @action
  public setSelectedOption = (option: {
    value: FrameType
    label: FrameType
  }) => {
    this.selectedOption = option
  }
}
