/*
 * @Author: Carlos
 * @Date: 2023-04-28 20:25:41
 * @LastEditTime: 2023-05-23 16:23:07
 * @FilePath: /nest-portal/src/oss/image/image.service.ts
 * @Description: null
 */
import { Body, HttpException, HttpStatus, Injectable, UploadedFile } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

const fsp = fs.promises

const dir = path.resolve(__dirname, '../../../src')
const OSS_DIR = process.env.OSS_DIR || dir

const isImage = (fileName: string) => /\.(jpe?g|png|svg|webp|gif)$/.test(fileName)

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

async function uploadImage(base: string, cPath: string, file: Express.Multer.File) {
  try {
    await fsp.access(path.resolve(base, cPath))
    new HttpException({ message: 'ALREADY EXIST' }, HttpStatus.BAD_REQUEST)
  } catch (error) {
    console.log(error)
    if (error.code === 'ENOENT') {
      return await fsp.writeFile(path.resolve(base, cPath), file.buffer)
    }
  }
}

@Injectable()
export class ImageService {
  getImages(path: string) {
    if (!path) return []
    return findImages(OSS_DIR, path)
  }
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name?: string; path?: string }
  ) {
    console.log(file, body)
    const name = body.name || file.originalname
    const path = body.path ? `${body.path}/${name}` : name
    return uploadImage(OSS_DIR, path, file)
  }
}
