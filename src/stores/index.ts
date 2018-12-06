import { observable } from 'mobx'
import ChunksStore from './chunks-store'
import CanvasMetadataStore from './canvas-metadata-store'

let stores = initialize()

function initialize() {
  const chunksStore = new ChunksStore()
  const canvasMetadataStore = new CanvasMetadataStore()

  return observable({
    chunksStore,
    canvasMetadataStore
  })
}

export function getStores(): StoresType {
  return stores
}

export function reinitializeStores(): StoresType {
  stores = initialize()
  return stores
}

export const initializeReturnType = returnType(initialize)
export type StoresType = typeof initializeReturnType

function returnType<T>(fn: () => T) {
  if (typeof fn === 'string') {
    ;(fn as any)()
  }
  return {} as T
}
