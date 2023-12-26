function lowerCaseString(input) {
  // Mengubah huruf besar menjadi huruf kecil dan hanya mengganti spasi
  return input.toLowerCase().replace(/\s+/g, '');
}

export default {
  lowerCaseString
}