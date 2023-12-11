async function saveInscriptions(inscriptions) {
    try {
        await Inscription.insertMany(inscriptions);
    } catch (error) {
        console.error('Error saving inscriptions to the database:', error);
        throw error;
    }
}
