const { BlobServiceClient, ContainerClient } = require('@azure/storage-blob');
require('dotenv').config();

// Container SAS URL - store this in a .env file
const containerSasUrl = process.env.CONTAINER_SAS_URL;

async function generatePresignedUrlsForSmallImages() {
  // Create a container client using the SAS URL
  const containerClient = new ContainerClient(containerSasUrl);
  
  console.log('Processing JPEG images in images/jpeg folder');
  
  // List all blobs in the container with the specified prefix
  const prefix = 'images/jpeg/';
  const options = { prefix: prefix };
  
  let smallImageUrls = [];
  let i = 0;
  
  // List blobs with the prefix
  for await (const blob of containerClient.listBlobsFlat(options)) {
    if (i >= 5) break;  // Stop after 5 items
    
    // Get blob client for operations
    const blobClient = containerClient.getBlobClient(blob.name);
    
    // Get blob properties to check size
    const properties = await blobClient.getProperties();
    const sizeInKb = properties.contentLength / 1024;
    
    // Only process images less than 500KB
    if (sizeInKb < 500) {
      // With SAS URL approach, each blob's URL will already have the SAS token from the container
      const blobSasUrl = blobClient.url;
      
      smallImageUrls.push({
        name: blob.name,
        sizeKb: sizeInKb.toFixed(2),
        url: blobSasUrl
      });
      
      console.log(`Processed ${blob.name} (${sizeInKb.toFixed(2)} KB)`);
      i++;
    }
  }
  
  console.log(`Found ${i} images less than 500KB in the images/jpeg folder`);
  return smallImageUrls;
}

// Execute the function
generatePresignedUrlsForSmallImages()
  .then(urls => {
    console.log(`Total URLs processed: ${urls.length}`);
    // Example: output the first URL
    if (urls.length > 0) {
      console.log('Sample URL:', urls[0].url);
    }
  })
  .catch(error => {
    console.error('Error processing blobs:', error);
  });