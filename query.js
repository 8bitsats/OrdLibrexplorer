async function findInscriptions(query) {
    try {
        const searchResults = await Inscription.find({
            // Example query, which should be adapted to your specific search needs
            content: { $regex: new RegExp(query, 'i') }
        }).limit(50); // Limit the number of results for performance

        return searchResults;
    } catch (error) {
        console.error('Error finding inscriptions:', error);
        throw error;
    }
}
