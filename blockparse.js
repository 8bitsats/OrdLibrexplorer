async function parseBlockForInscriptions(client, blockHash) {
    const block = await client.getBlock(blockHash, 2); // Verbose block data
    let inscriptions = [];

    for (const tx of block.tx || []) {
        for (const output of tx.vout || []) {
            const scriptHex = output.scriptPubKey.hex;
            if (isOrdinalInscription(scriptHex)) {
                const inscriptionData = extractInscriptionData(scriptHex);
                if (inscriptionData) {
                    inscriptions.push({
                        txid: tx.txid,
                        vout: output.n,
                        inscription: inscriptionData.content,
                        // Additional inscription data can be added here
                    });
                }
            }
        }
    }

    return inscriptions;
}
