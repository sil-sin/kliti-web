'use server';

import type { MutableFile } from 'megajs';
import { File, Storage } from 'megajs';
import { unstable_cache } from 'next/cache';

type MediaFile = {
  imageUrl: string;
  videoUrl?: string;
  shareURL: string;
  attributes: any;
};

export async function fetchMegaFilesMetadata(userId: string): Promise<MediaFile[]> {
  const megaPassword = process.env.MEGA_PASSWORD;
  const megaEmail = process.env.MEGA_EMAIL;

  if (!megaPassword || !megaEmail) {
    throw new Error('MEGA_PASSWORD environment variable is not defined');
  }

  const storage = new Storage({
    email: 'silviberat@gmail.com',
    password: megaPassword,
    userAgent: 'Node.js',
    keepalive: false,
  });

  await storage.ready;

  const files = Object.values(storage.files);

  const userFolder: any = files.find(
    (file): file is MutableFile =>
      file.directory && file.attributes && (file.attributes as any).n === userId
  );

  if (!userFolder?.children) {
    await storage.close();
    return [];
  }

  const userFiles = await Promise.all(
    Array.from(Object.values(userFolder.children))
      .filter(
        (file: any): file is MutableFile =>
          !file.directory &&
          file.attributes &&
          'n' in file.attributes &&
          /\.(jpg|jpeg|png|gif|webp)$/i.test(file.attributes.n)
      )
      .map(async (file: any) => {
        return {
          fileName: file.attributes.n,
          fileId: file.nodeId,
        };
      })
  );

  await storage.close();

  return userFiles as any;
}

export const getMegaFiles = unstable_cache(
  async (userId: string) => {
    try {
      return await fetchMegaFilesMetadata(userId);
    } catch (error: any) {
      console.error('Failed to initialize MEGA storage:', error);
      throw new Error('Failed to fetch MEGA files sil: ' + error.message);
    }
  },
  ['mega-files'],
  {
    revalidate: 86400,
    tags: ['mega-files'],
  }
);

// This variable is used to prevent multiple downloads of the same file
let dnodeId: string[] = []
// Download a single file by nodeId
export async function downloadMegaFile(nodeId: string) {
  if (dnodeId.includes(nodeId)) return
  const megaPassword = process.env.MEGA_PASSWORD;
  const megaEmail = process.env.MEGA_EMAIL;

  if (!megaPassword || !megaEmail) {
    throw new Error('MEGA_PASSWORD environment variable is not defined');
  }

  const storage = new Storage({
    email: 'silviberat@gmail.com',
    password: megaPassword,
    userAgent: 'Node.js',
    keepalive: false,
  });

  try {
    await storage.ready;
    // Find file by nodeId
    const targetFile: any = Object.values(storage.files).find(
      (file: any) => {
        // console.log('File nodeId:', file.nodeId, 'Target nodeId:', nodeId);
        return file.nodeId === nodeId
      }
    );

    if (!targetFile || targetFile.directory) {
      console.error('File not found or is a directory:', nodeId);
      throw new Error('File not found');
    }

    // Download file as a buffer
    const buffer = await targetFile.downloadBuffer();
    const base64 = buffer.toString('base64');
    dnodeId.push(nodeId)

    return {
      base64,
      fileName: targetFile.attributes.n,
      fileId: nodeId,
    };
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  } finally {
    await storage.close();
  }
}