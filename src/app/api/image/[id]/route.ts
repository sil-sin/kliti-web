import { downloadMegaFile } from '@/actions/mega'
import { getWatermarkSVG } from '@/utils/watermarkSvg'
import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }) {
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
    const fontSize = Math.floor(width / 12)
    const watermark = Buffer.from(getWatermarkSVG(width, height, fontSize))

    const outputBuffer = await sharp(imageBuffer)
      .composite([{ input: watermark }])
      .toBuffer()

    return new NextResponse(Buffer.from(outputBuffer), {
      status: 200,
      headers: {
        'Cache-Control':
          'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
        'Surrogate-Control': 'no-store',
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
