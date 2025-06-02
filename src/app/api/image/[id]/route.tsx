import { downloadMegaFile } from '@/actions/mega'
import { getWatermarkSVG } from '@/utils/watermarkSvg'
import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { cachedDataVersionTag } from 'v8'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } =await params

    // Validate the id parameter
    if (!id) {
      return NextResponse.json(
        { error: 'Missing id parameter' },
        { status: 400 }
      )
    }

    // Use your function to get the image buffer as base64
    const productRes = await downloadMegaFile(id)
    if (!productRes) {
      return NextResponse.json(
        { error: 'Failed to fetch product' },
        { status: 500 }
      )
    }

    // Convert base64 back to a buffer
    const imageBuffer = Buffer.from(productRes.base64, 'base64')
    const contentType = 'image/jpeg' // or detect from fileName if needed

    // Get image dimensions
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

        'Content-Type': contentType,
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
