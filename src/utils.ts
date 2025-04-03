export const uint8ArrayToBase64 = (uint8Array: Uint8Array) => {
    return btoa(String.fromCharCode(...uint8Array));
}

export const base64ToUint8Array = (base64: string) => {
    return new Uint8Array([...atob(base64)].map(c => c.charCodeAt(0)));
}