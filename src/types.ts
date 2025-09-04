export type MediaFile = {
    fileName: string
    fileId: string
    imageUrl: string
}

export type ImageInstruction = {
    coordinates: Array<{ x: number, y: number, color: string }>;
    size: { width: number, height: number };
    timestamp: number;
}