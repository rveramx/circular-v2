import { supabase, getPublicUrl } from '../lib/supabase';

export interface ImageDataType {
  id: number;
  url: string;
  type: 'login' | 'ad';
}

export const getImages = async (type: 'login' | 'ad') => {
  try {
    const bucketName = 'login-images';
    const prefix = type === 'login' ? 'login/' : 'home/';

    const { data: files, error } = await supabase.storage.from(bucketName).list(prefix);

    if (error) throw error;

    const images: ImageDataType[] = files
      .filter((file) => file.name.match(/\.(jpg|jpeg|png)$/i))
      .map((file, index) => ({
        id: index + 1,
        url: getPublicUrl(bucketName, `${prefix}${file.name}`),
        type: type,
      }));

    return images;
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    return [];
  }
};
