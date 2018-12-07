import { observable } from 'mobx'
import ChunksStore from './chunks-store'
import CanvasMetadataStore from './canvas-metadata-store'
import NewChunkStore from './new-chunk-store'

let stores = initialize()

function initialize() {
  const chunksStore = new ChunksStore()
  const canvasMetadataStore = new CanvasMetadataStore()
  const newChunkStore = new NewChunkStore()

  return observable({
    chunksStore,
    canvasMetadataStore,
    newChunkStore
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
