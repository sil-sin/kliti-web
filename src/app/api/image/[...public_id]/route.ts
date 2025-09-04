import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ public_id: string[] }> }
) {
  const { public_id } = await params;
  if (!public_id || !Array.isArray(public_id) || public_id.length === 0) {
    return NextResponse.json({ error: 'Missing public_id parameter' }, { status: 400 });
  }

  const fullPublicId = public_id.join('/');
  const { getImageUrl } = require('@/lib/cloudinary');
  const cloudinaryUrl = getImageUrl(fullPublicId);

  try {
    const imageRes = await fetch(cloudinaryUrl);
    if (!imageRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch image from Cloudinary' }, { status: 502 });
    }
    const contentType = imageRes.headers.get('content-type') || 'image/jpeg';
    const imageBuffer = await imageRes.arrayBuffer();
    return new NextResponse(Buffer.from(imageBuffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Error proxying image' }, { status: 500 });
  }
}