export default eventHandler(async (event) => {

  const formData = await readMultipartFormData(event)
  console.log('Form Data:', formData)

  return hubBlob().handleUpload(event, {
    multiple: false,
    ensure: {
      maxSize: '8MB',
      types: ['image/png', 'image/jpeg']
    }
  })
})
