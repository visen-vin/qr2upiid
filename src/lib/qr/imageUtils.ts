export async function getImageDataFromFile(file: File): Promise<ImageData> {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('No file provided'));
            return;
        }

        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            if (e.target?.result) {
                img.src = e.target.result as string;
            }
        };

        reader.onerror = (e) => reject(new Error('Failed to read file'));

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }

            // Limit max size to avoid memory issues with huge photos (optional optimization)
            // For QR, usually usually full res is fine, but sometimes scaling down helps if too huge.
            // Let's keep original size for max precision unless it's insane.
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);
            try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                resolve(imageData);
            } catch (e) {
                reject(new Error('Failed to extract image data'));
            }
        };

        img.onerror = () => reject(new Error('Failed to load image'));

        reader.readAsDataURL(file);
    });
}
