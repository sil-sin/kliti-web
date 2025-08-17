//initialize Cloudinary
import { unstable_cache } from 'next/cache';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});


export const getImageUrl = (publicId: string) => {
    return cloudinary.url(publicId, {
        transformation: [
            { width: 800, height: 600, crop: 'fill' },
            {
                overlay: "text:Verdana_60_bold:© Your Watermark",
                gravity: "south_east",
                x: 20,
                y: 20,
                color: "#ffffff",
                opacity: 70
            }
        ],
        secure: true
    });
};

export const getFolderByName = async (name: string) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });

        const result = await cloudinary.api.sub_folders('previews');
        console.log('Cloudinary folders:', result.folders);
        const folder = result.folders.find((f: any) => f.name === name);
        return folder || null;
    } catch (error) {
        console.error('Cloudinary API error:', error);
        return null;
    }
};

