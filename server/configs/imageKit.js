import ImageKit from "imagekit";
import dotenv from 'dotenv';
dotenv.config();

const imagekit = new ImageKit({
    // @ts-ignore
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    // @ts-ignore
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    // @ts-ignore
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export default imagekit;
