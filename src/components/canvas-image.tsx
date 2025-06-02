'use client'
import { useEffect, useRef, useState } from 'react'
import { decodeBase64ToPixels, renderExpandedView, renderThumbnail } from '../utils/image-utils'
interface PixelCanvasProps {
    base64: string
    fileName: string
    thumbnailSize?: number
    maxExpandedSize?: number
    isExpanded?: boolean

}

export default function PixelCanvas({
    base64,
    fileName,
    thumbnailSize = 150,
    maxExpandedSize = 600,
    isExpanded = false
}: PixelCanvasProps) {
    const thumbnailCanvasRef = useRef<HTMLCanvasElement>(null)
    const expandedCanvasRef = useRef<HTMLCanvasElement>(null)
    const [pixelData, setPixelData] = useState<{
        width: number,
        height: number,
        data: Uint8ClampedArray
    } | null>(null)

    // Process the base64 image to raw pixel data
    useEffect(() => {
        if (!base64) return
        decodeBase64ToPixels(base64, setPixelData)
    }, [base64])

    // Render thumbnail when pixel data is available
    useEffect(() => {
        if (!pixelData || !thumbnailCanvasRef.current) return

        renderThumbnail(pixelData, thumbnailSize, thumbnailCanvasRef as React.RefObject<HTMLCanvasElement>)
    }, [pixelData, thumbnailSize])

    // Render expanded view when hovering
    useEffect(() => {
        if (pixelData && expandedCanvasRef.current) {
            renderExpandedView(pixelData, maxExpandedSize, expandedCanvasRef as React.RefObject<HTMLCanvasElement>)
        }
    }, [pixelData, maxExpandedSize])

    return (
        <div className="relative inline-block">
            <canvas
                ref={isExpanded ? expandedCanvasRef : thumbnailCanvasRef}
                className="rounded-lg border shadow-md cursor-pointer"
                width={thumbnailSize}
                height={thumbnailSize}
                onContextMenu={(e) => e.preventDefault()}
                aria-label={`Thumbnail of ${fileName}`}
            />
        </div>
    )
}