'use server'
import { v2 as cloudinary } from 'cloudinary';

export const getImagesInFolder = async (folderName: string) => {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: `previews/${folderName}`,
            max_results: 10000,
        });
        
        // Return only bare minimum info for each image
        const minimalImages = result.resources.map((img: any) => {
            const url = cloudinary.url(img.public_id, {
                secure: true
            });

            return {
                public_id: img.public_id,
                name: img.filename || img.asset_id,
            };
        });
        return minimalImages;
    } catch (error) {
        console.error('Cloudinary API error:', error);
        return [];
    }
};

