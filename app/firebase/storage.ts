import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "@firebase/storage";

const storage = getStorage();

export async function uploadImage(
    imageId: string,
    file: File,
    onProgress?: (progress: number) => void
): Promise<string> {
    const storageRef = ref(storage, `images/${imageId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (onProgress) onProgress(progress);
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                console.error("Upload failed:", error);
                reject(error); //
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => resolve(downloadURL)) //
                    .catch(reject);
            }
        );
    });
}