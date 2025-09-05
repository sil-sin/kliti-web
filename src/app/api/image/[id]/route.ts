import { downloadMegaFile } from '@/actions/mega'
import { getWatermarkSVG } from '@/utils/watermarkSvg'
import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Missing id parameter' },
        { status: 400 }
      )
    }

    const productRes = await downloadMegaFile(id)
    if (!productRes) {
      return NextResponse.json(
        { error: 'Failed to fetch product' },
        { status: 500 }
      )
    }

    const imageBuffer = Buffer.from(productRes.base64, 'base64')
    const metadata = await sharp(imageBuffer).metadata()
    const width = metadata.width || 800
    const height = metadata.height || 800
    
    // Simplify SVG watermark - make it smaller
    const fontSize = Math.floor(width / 5) 
    const watermarkSvg = await getWatermarkSVG(
      Math.min(width, 1000), 
      Math.min(height, 1000),
      fontSize
    )
    const watermark = Buffer.from(watermarkSvg)

    const outputBuffer = await sharp(imageBuffer)
      .composite([{
        input: watermark,
        gravity: 'center'
      }])
      .jpeg({ quality: 70 }) // Optimize output
      .toBuffer()

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=172800, stale-while-revalidate=7200',
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'inline'
      }
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
