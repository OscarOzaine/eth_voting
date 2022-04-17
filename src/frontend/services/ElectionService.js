
class ElectionService 
{
    election;

    constructor(election) {
        this.election = election;
    }

    async storeCandidate(name) {
        await(await this.election.storeCandidate(name)).wait();
    }

    async getCandidates(election) {
        const itemCount = await this.election.candidatesCount();
        console.log({itemCount});
        let items = [];
        for (let i = 1; i <= itemCount; i++) {
            const item = await this.election.candidates(i);
            
            items.push({
                id: item.id,
                name: item.name,
                voteCount: parseInt(item.voteCount._hex, 16),
            });
        }

        return items;
    }

    async vote(candidate) {
        return await(await this.election.vote(candidate.id)).wait();
    }
}

export default ElectionService;
