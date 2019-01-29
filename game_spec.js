const game = require('./game.js')

 test('enhance success',()=>{
    const testItem = {
        name: '[+10] longsword',
        originalName: 'longsword',
        type: 'weapon',
        durability: 100,
        enhancement: 10,
    }
    const expectedItem ={
        name: '[+11] longsword',
        originalName: 'longsword',
        type: 'weapon',
        durability: 100,
        enhancement: 11,
    }
    const actual = game.success(testItem)
    expect(actual).toEqual(expectedItem);
    expect(actual.enhancement).toBe(11);
    expect(actual.name).toBe('[+11] longsword');
});

 test('enhancement fails', ()=>{
    const testItem = {
        name: '[+10] longsword',
        originalName: 'longsword',
        type: 'weapon',
        durability: 100,
        enhancement: 10,
    }
    const expectedItem = {
        name: '[+10] longsword',
        originalName: 'longsword',
        type: 'weapon',
        durability: 95,
        enhancement: 10,
    }
    const actual = game.fail(testItem)
    expect(actual).toEqual(expectedItem)
    expect(actual.enhancement).toBe(expectedItem.enhancement);
    expect(actual.name).toBe(expectedItem.name)
    expect(actual.durability).toBe(expectedItem.durability)
})


 test('enhancement fails with < 16 level', () => {
    const testItem = {
        name: '[TET] longsword',
        originalName: 'longsword',
        type: 'weapon',
        durability: 100,
        enhancement: 19,
    }
    const expectedItem = {
        name: '[TRI] longsword',
        originalName: 'longsword',
        type: 'weapon',
        durability: 90,
        enhancement: 18,
    }
    const actual = game.fail(testItem)
    expect(actual).toEqual(expectedItem)
    expect(actual.enhancement).toBe(expectedItem.enhancement);
    expect(actual.name).toBe(expectedItem.name)
    expect(actual.durability).toBe(expectedItem.durability)
})

 it('repair durability', ()=>{
    const actual = game.repair({durability: 0});
    expect(actual.durability).toBe(100);
})
it('repair() should not change other properties',()=>{
    const actual = game.repair({name:'foo', durability: 20});
    expect(actual).toEqual({ name: 'foo', durability: 100});
})

 test('should return objects', ()=>{
    const testItem = {
        name: '[+10] longsword',
        originalName: 'longsword',
        type: 'weapon',
        durability: 100,
        enhancement: 10,
    }
    const success = game.success(testItem)
    const repair = game.repair(testItem)
    const fail = game.fail(testItem)
    expect(typeof success).toBe('object')
    expect (typeof repair).toBe('object');
    expect (typeof fail).toBe('object');

 })
test('16 and higher should return string', ()=>{
    const testItem = {
        name: '[TRI] longsword',
        originalName: 'longsword',
        type: 'weapon',
        durability: 100,
        enhancement: 18,
    }
    const enhLevel = game.enhanceArr[testItem.enhancement]
    expect(typeof enhLevel).toBe('string')
})

 it('throws error when enhancing a max level item', ()=>{
    const testItem = {
        name: '[TRI] longsword',
        originalName: 'longsword',
        type: 'weapon',
        durability: 100,
        enhancement: 20,
    };
    expect(()=>{game.success(testItem)}).toThrow();
})

 it('throws error if level 15 or higher and less than 10 durability', () => {
    const testItem = {
        name: '[TRI] longsword',
        originalName: 'longsword',
        type: 'weapon',
        durability: 5,
        enhancement: 19,
    };
    expect(() => { game.success(testItem) }).toThrow();
})
it ('throws error if level is less than 14 and less than 25 durability', () => {
  const testItem = {
    name: '[TRI] longsword',
    originalName: 'longsword',
    type: 'weapon',
    durability: 15,
    enhancement: 7,
  };
  expect (() => {
    game.success (testItem);
  }).toThrow ();
});

 it('throws error when item less than level 5 fails', () => {
    const testItem = {
        name: '[TRI] longsword',
        originalName: 'longsword',
        type: 'weapon',
        durability: 100,
        enhancement: 4,
    };
    expect(() => { game.fail(testItem) }).toThrow();
})

 it ('throws error when armor less than level 7 fails', () => {
  const testItem = {
    name: '[TRI] longsword',
    originalName: 'longsword',
    type: 'armor',
    durability: 100,
    enhancement: 6,
  };
  expect (() => {
    game.fail (testItem);
  }).toThrow ();
});

 it('throws error when durabilty tries to be less than 0', () => {
    const testItem = {
        name: '[TRI] longsword',
        originalName: 'longsword',
        type: 'armor',
        durability: -1,
        enhancement: 6,
    };
    expect(() => {
        game.fail(testItem);
    }).toThrow();
});