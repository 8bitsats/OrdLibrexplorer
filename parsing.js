// Assuming inscriptions are UTF-8 encoded text after the OP_RETURN opcode
function extractInscriptionData(scriptHex) {
    if (!isOrdinalInscription(scriptHex)) {
        return null; // Not an ordinal inscription
    }
    
    // Remove the OP_RETURN opcode and length indicator from the script hex
    const dataHex = scriptHex.substring(4); // Adjust as needed based on the actual pattern
    const inscriptionText = hexToText(dataHex);
    
    return {
        content: inscriptionText,
        // Additional parsed data fields
    };
}

// Convert hex string to UTF-8 text
function hexToText(hexString) {
    const hexes = hexString.match(/.{1,2}/g) || [];
    let text = '';
    for (let i = 0; i < hexes.length; i++) {
        text += String.fromCharCode(parseInt(hexes[i], 16));
    }
    return text;
}
