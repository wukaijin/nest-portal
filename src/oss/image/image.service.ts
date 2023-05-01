/*
 * @Author: Carlos
 * @Date: 2023-04-28 20:25:41
 * @LastEditTime: 2023-05-01 22:09:13
 * @FilePath: /nest-portal/src/oss/image/image.service.ts
 * @Description: null
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

const fsp = fs.promises

const dir = path.resolve(__dirname, '../../../src')
const OSS_IMAGE = process.env.OSS_IMAGE || dir

const isImage = (fileName: string) => /\.(je?pg|png|svg|webp|gif)$/.test(fileName)

async function generateFolderTree(dir: string, key: string) {
  const tree = []
  const files = await fsp.readdir(dir)
  if (!files.length) return undefined
  await Promise.all(
    files.map(async f => {
      const currentPath = path.resolve(dir, f)
      const currentKey = key ? `${key}/${f}` : f
      const stat = await fsp.stat(currentPath)
      if (stat.isDirectory())
        tree.push({
          label: f,
          value: currentKey,
          key: currentKey,
          children: await generateFolderTree(currentPath, currentKey)
        })
    })
  )
  if (!tree.length) return undefined
  return tree
}

async function findImages(base: string, cPath: string) {
  const docs = []
  const files = await fsp.readdir(path.resolve(base, cPath))
  if (!files.length) return []
  await Promise.all(
    files.map(async f => {
      const currentPath = path.resolve(base, cPath, f)
      const currentKey = `${cPath}/${f}`
      const stat = await fsp.stat(currentPath)
      if (!stat.isDirectory() && isImage(currentKey))
        docs.push({
          label: f,
          key: currentKey
        })
    })
  )

  return docs
}

async function addFolder(base: string, cPath: string) {
  try {
    await fsp.access(path.resolve(base, cPath))
    return null
  } catch (error) {
    return await fsp.mkdir(path.resolve(base, cPath))
  }
}

async function removeFolder(base: string, cPath: string) {
  try {
    await fsp.access(path.resolve(base, cPath))
    console.log('removeRe1:')

    const result = await fsp.rmdir(path.resolve(base, cPath))
    console.log('removeRe:', result)
  } catch (error) {
    if (error.code === 'ENOTEMPTY') {
      throw new HttpException({ message: 'NOT EMPTY' }, HttpStatus.BAD_REQUEST)
    }
  }
}

@Injectable()
export class ImageService {
  getFolders() {
    return generateFolderTree(OSS_IMAGE, '')
  }
  getImages(path: string) {
    if (!path) return []
    return findImages(OSS_IMAGE, path)
  }
  addFolder(path: string) {
    if (!path) return null
    return addFolder(OSS_IMAGE, path)
  }
  deleteFolder(path: string) {
    if (!path) return null
    return removeFolder(OSS_IMAGE, path)
  }
}
