const PremiumDog = artifacts.require('PremiumDog.sol');
const simpleStorage = artifacts.require('SimpleStoragevAndyBimBam.sol');

contract('PremiumDog', () => {
    let dogFamilly;

    before(async () => {
        dogFamilly = await PremiumDog.new();
    });

    it('Should change price & fetch dog', async () => {
        await dogFamilly.changeSaleOpen(false);
        await dogFamilly.changePrice([0, 2], ["30000000000000000", "10000000000000000"]);
        const expecteDog = await dogFamilly.getDogByDogType(2);
        assert(expecteDog.price.toString() === '10000000000000000');
    });

    it('Should fetch max supply', async () => {
        const expectedMaxSupply = await dogFamilly.totalSupply();
        assert(expectedMaxSupply.toString() === '10000');
    });

    it('Should create pack', async () => {
        await dogFamilly.changeSaleOpen(true);
        const accounts = await web3.eth.getAccounts();
        const oldDogCount = await dogFamilly.getDogCount(2);
        let oldCount = await dogFamilly.getCounter();
        const expectedPack = await dogFamilly.createPack(2, { from: accounts[0], value: 10000000000000000 });
        const newDogCount = await dogFamilly.getDogCount(2);
        let newCount = await dogFamilly.getCounter();
        assert((newDogCount - oldDogCount) === 1, 'wrong dog count');
        assert((newCount - oldCount).toString() === '1', 'wrong count');
    });

})

// contract('SimpleStoragevAndyBimBam', () => {
// it.skip('Should update data', async () => {
//     const storage = await simpleStorage.new();
//     await storage.updateData(10);
//     const data = await storage.readData();
//     assert(data.toString() === '10')
// });