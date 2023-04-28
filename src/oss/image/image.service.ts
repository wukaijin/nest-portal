/*
 * @Author: Carlos
 * @Date: 2023-04-28 20:25:41
 * @LastEditTime: 2023-04-28 21:44:03
 * @FilePath: /nest-portal/src/oss/image/image.service.ts
 * @Description: null
 */
import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

const fsp = fs.promises

const dir = path.resolve(__dirname, '../../../src')
const OSS_IMAGE = process.env.OSS_IMAGE || dir

async function generateFolderTree (dir: string, key: string) {
  const tree = []
  const files = await fsp.readdir(dir)
  if (!files.length) return undefined
  await Promise.all(files.map(async f => {
    const currentPath = path.resolve(dir, f)
    const currentKey = `${key}/${f}`
    const stat = await fsp.stat(currentPath)
    if (stat.isDirectory()) tree.push({
      label: f,
      key: currentKey,
      children: await generateFolderTree(currentPath, currentKey)
    })
  }))
  if (!tree.length) return undefined
  return tree
}

@Injectable()
export class ImageService {
  constructor() {}

  getFolders() {
    return generateFolderTree(OSS_IMAGE, '')
  }
}
