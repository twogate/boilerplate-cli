import * as fs from 'fs'
import * as path from 'path'

export default function recursiveMkdir(mkdirPathArg: string) {
  const mkdirPath = path.dirname(mkdirPathArg)
  mkdirPath.split(path.sep).reduce((accPaths, elm) => {
    const separatedMkdirPath = path.resolve(accPaths, elm)
    if (!fs.existsSync(separatedMkdirPath)) {
      fs.mkdirSync(separatedMkdirPath)
    }
    return path.join(accPaths, elm)
  }, path.isAbsolute(mkdirPathArg) ? '/' : './')
}
