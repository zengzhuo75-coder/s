import { NextRequest, NextResponse } from 'next/server'
import { copyFile, mkdir } from 'fs/promises'
import path from 'path'
import fs from 'fs'

export async function POST(request: NextRequest) {
  try {
    const matches = await request.json()

    const sourceDir = path.join(process.cwd(), 'public', 'bridge-previews')
    const targetDir = path.join(process.cwd(), 'public', 'images', 'bridges')

    let successCount = 0
    const errors = []

    for (const [bridgeId, filename] of Object.entries(matches)) {
      if (typeof filename !== 'string' || !filename) continue

      const sourcePath = path.join(sourceDir, filename as string)
      const targetPath = path.join(targetDir, `${bridgeId}.png`)

      try {
        // 检查源文件是否存在
        if (!fs.existsSync(sourcePath)) {
          errors.push(`${bridgeId}: 源文件不存在`)
          continue
        }

        // 复制文件
        await copyFile(sourcePath, targetPath)

        // 获取文件大小
        const stats = fs.statSync(targetPath)

        successCount++
        console.log(`✓ ${bridgeId} ← ${filename} (${(stats.size / 1024).toFixed(1)}KB)`)
      } catch (error: any) {
        errors.push(`${bridgeId}: ${error.message}`)
      }
    }

    return NextResponse.json({
      success: true,
      matched: successCount,
      total: Object.keys(matches).length,
      errors: errors
    })
  } catch (error: any) {
    console.error('匹配失败:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
