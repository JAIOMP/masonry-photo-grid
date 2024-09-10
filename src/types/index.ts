
export interface Photo {
    id: string;
    urls: {
        regular: string;
    };
    alt_description: string;
}

export interface PixabayPhoto {
    id: string;
    largeImageURL: string;
    webformatURL: string;
    previewURL: string;
    tags: string;
    alt_description: string;
    user: string;
}