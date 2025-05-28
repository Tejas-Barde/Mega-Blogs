const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    collectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    projectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    rteApiKey : String(import.meta.env.VITE_TINYMICE_RTE_API_KEY)
}

export default conf;