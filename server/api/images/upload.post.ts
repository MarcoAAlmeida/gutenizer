export default eventHandler(async (event) => {

  const formData = await readMultipartFormData(event)
  if (formData) {
    console.log('Form Data:', formData[0]?.filename)
  }

  return hubBlob().handleUpload(event, {
    multiple: false,
    ensure: {
      maxSize: '8MB',
      types: ['image/png', 'image/jpeg']
    }
  })
})
