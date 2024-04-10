import fs from 'node:fs'
import path from 'node:path'

export async function clearDirectory(): Promise<void> {
  try {
    const entries = await fs.promises.readdir(
      path.resolve(__dirname, '..', '..', 'tmp', 'docs'),
      { withFileTypes: true },
    )
    for (const entry of entries) {
      const fullPath = path.join(
        path.resolve(__dirname, '..', '..', 'tmp', 'docs'),
        entry.name,
      )
      if (entry.isDirectory()) {
        await clearDirectory()
        await fs.promises.rmdir(fullPath)
      } else {
        await fs.promises.unlink(fullPath)
      }
    }
  } catch (error) {
    console.error(
      `Error clearing directory ${path.resolve(__dirname, '..', 'tmp', 'docs')}: ${error}`,
    )
    throw error
  }
}
