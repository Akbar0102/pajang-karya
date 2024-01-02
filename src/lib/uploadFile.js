import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWSS3_REGION,
  credentials: {
    accessKeyId: process.env.AWSS3_ACCESS_KEY,
    secretAccessKey: process.env.AWSS3_SECRET_KEY,
  },
  endpoint: {
    url: "https://s3.ap-southeast-1.wasabisys.com",
  },
});

export async function uploadFile({ Body, Key, ContentType, Dir }) {
  const bytes = await Body.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const command = new PutObjectCommand({
    Bucket: process.env.AWSS3_BUCKET,
    Body: buffer,
    Key: `${Dir}/${Key}`,
    ContentType,
  });

  try {
    const res = await s3Client.send(command);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile({ Key, Dir }) {
  try {
    const fileKey = `${Dir}/${Key}`;

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWSS3_BUCKET,
      Key: fileKey,
    });

    const response = await s3Client.send(command);
    console.log(response);

    // return NextResponse.json({ message: 'File deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);

    // return NextResponse.json({ errorMessage: 'Failed to delete file' }, { status: 500 });
  }
}
