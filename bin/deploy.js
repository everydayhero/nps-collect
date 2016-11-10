const s3 = require('s3')

const client = s3.createClient({
  maxAsyncS3: 5
})

const generate = () => {
  console.log("Preparing to publish")
  const params = {
    localDir: 'dist',
    deleteRemoved: true,
    s3Params: {
      Bucket: process.env.BUCKET,
      Prefix: process.env.BUCKET_PREFIX
    }
  }

  console.log('Publishing...')
  client.uploadDir(params)
    .on('error', (err) => {
      throw new Error('Failed S3 Sync', err.stack)
    })
    .on('end', () => {
      console.log('Published')
    })
}

generate()
