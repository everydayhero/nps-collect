const s3 = require('s3')
const requiredEnvVars = require('./required-vars')

const client = s3.createClient({
  maxAsyncS3: 5
})

const tokenPresent = (token) => !!process.env[token]
const tokenNotPresent = (token) => !tokenPresent(token)

const assertEnvVars = () =>
  requiredEnvVars.filter(tokenNotPresent)

const generate = () => {
  const missingVars = assertEnvVars()
  if (missingVars.length) {
    console.log("Can't deploy as there are env vars missing", missingVars)
    return
  }

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
      console.error('Sync failed', err)
      throw new Error('Failed S3 Sync', err.stack)
    })
    .on('end', () => {
      console.log('Published')
    })
}

generate()
