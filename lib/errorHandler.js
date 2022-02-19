function errorHandler(error) {
  console.error('Error', error)
  throw new Error('Error en el servidor', error)
}
