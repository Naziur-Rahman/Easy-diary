// utils/compressionUtils.js
export const compressText = (text) => {
  // Simple compression using Base64 (replace with better algorithm if needed)
  try {
    const compressed = btoa(unescape(encodeURIComponent(text)));
    return {
      compressed: true,
      data: compressed,
      originalSize: new Blob([text]).size,
      compressedSize: new Blob([compressed]).size
    };
  } catch (error) {
    console.error('Compression error:', error);
    return null;
  }
};

export const decompressText = (compressedText) => {
  try {
    return decodeURIComponent(escape(atob(compressedText)));
  } catch (error) {
    console.error('Decompression error:', error);
    return null;
  }
};

export const calculateSpaceSaved = (entries) => {
  const compressedEntries = entries.filter(entry => entry.compressed);
  const totalSaved = compressedEntries.reduce((acc, entry) => {
    return acc + (entry.originalSize - entry.compressedSize);
  }, 0);
  
  return formatBytes(totalSaved);
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};