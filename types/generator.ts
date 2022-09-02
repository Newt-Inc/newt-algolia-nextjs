import { Content } from 'newt-client-js'

interface Image {
  _id: string
  src: string
  fileType: string
  fileName: string
  fileSize: number
  width: number
  height: number
}

export interface Generator extends Content {
  title: string
  logo: Image
  description?: string
  url: string
  tags: string[]
  star: number
}
