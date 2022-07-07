const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers');
const { execPath } = require('process');

jest.mock('fs');

test('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: "Bobby", id: "B5" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Bobby");
    expect(zookeeper.id).toBe("B5");
});

test('filters by query', () => {
    const startingZookeepers = [
        {
        id: "0",
        name: "Kim",
        age: 28,
        favoriteAnimal: "dolphin",
        },
        {
        id: "1",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin",
        },
    ];

    const updatedZookeepers = filterByQuery({ age: 28 }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1)
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin"
        },
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        },
    ];

    const result = findById("0", startingZookeepers);

    expect(result.name).toBe("Kim");
});

test('validates favorite animals', () => {
    const age = {
        id: "2",
        name: "Isabella",
        age: 67,
        favoriteAnimal: "bear"
    };
    
    const invalidAge = {
        id: "3",
        name: "Linda",
        age: "48",
        favoriteAnimal: "otter"
    };

    const result = validateZookeeper(age);
    const result2 = validateZookeeper(invalidAge);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});