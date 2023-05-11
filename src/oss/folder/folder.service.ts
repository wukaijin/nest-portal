/*
 * @Author: Carlos
 * @Date: 2023-05-03 15:03:23
 * @LastEditTime: 2023-05-03 20:54:51
 * @FilePath: /nest-portal/src/oss/folder/folder.service.ts
 * @Description: null
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { CreateFolderDto } from './dto/create-folder.dto'
import { UpdateFolderDto } from './dto/update-folder.dto'
import * as fs from 'fs'
import * as path from 'path'

const fsp = fs.promises

const dir = path.resolve(__dirname, '../../../src')
const OSS_DIR = process.env.OSS_DIR || dir

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
    await fsp.rmdir(path.resolve(base, cPath))
  } catch (error) {
    if (error.code === 'ENOTEMPTY') {
      throw new HttpException({ message: 'NOT EMPTY' }, HttpStatus.BAD_REQUEST)
    }
  }
}

async function renameFolder(base: string, cPath: string, name: string) {
  try {
    await fsp.access(path.resolve(base, cPath))
    await fsp.rename(path.resolve(base, cPath), path.resolve(base, cPath, '..', name))
  } catch (error) {
    if (error.code === 'ENOTEMPTY') {
      throw new HttpException({ message: 'NOT EXIST' }, HttpStatus.BAD_REQUEST)
    }
  }
}
@Injectable()
export class FolderService {
  create(createFolderDto: CreateFolderDto) {
    return 'This action adds a new folder'
  }

  getDirectory() {
    return generateFolderTree(OSS_DIR, '')
  }

  addFolder(path: string) {
    if (!path) return null
    return addFolder(OSS_DIR, path)
  }

  renameFolder(path: string, name: string) {
    if (!path) return null
    return renameFolder(OSS_DIR, path, name)
  }

  deleteFolder(path: string) {
    if (!path) return null
    return removeFolder(OSS_DIR, path)
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`
  }

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return `This action updates a #${id} folder`
  }

  remove(id: number) {
    return `This action removes a #${id} folder`
  }
}
