export const copyOrWrite = (text) => {
    const isCopyable = text.startsWith('var:') || !/"(.+)"/.test(text);
    return isCopyable ? 'copy' : 'write';
}
