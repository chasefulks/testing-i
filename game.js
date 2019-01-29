const item = {
    name: 'longsword',
    originalName: 'longsword',
    type: 'weapon',
    durability: 100,
    enhancement: 0,
}

 const enhanceArr = [
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,'PRI','DUO','TRI', 'TET', 'PEN'
]

 function success(item){
    if (item.durability < 25 && 0 < item.enhancement < 14) {
        throw new Error('cannot increase at this durability')
    }
    if (item.durability < 10 && item.enhancement >= 15) {
        throw new Error('cannot increase at this durability')
    }
    item.enhancement = item.enhancement + 1
    if(item.enhancement < 16){
        item.name = `[+${enhanceArr[item.enhancement]}] ${item.originalName}`;

     }
    else if (item.enhancement > 15){
        item.name = `[${enhanceArr[item.enhancement]}] ${item.originalName}`;
    }
    if(item.enhancement > 20){
        throw new Error('max level')
    }
    return item
}

 function fail(item){
    if(item.enhancement <= 5){
        throw new Error('item cannot fail')
    }
    if(item.type === 'armor' && item.enhancement <= 7){
        throw new Error('item cannot fail')
    }
    if(0 <= item.enhancement <= 14){
        item.durability = item.durability - 5;
    }
    if(item.enhancement >= 15){
        item.durability = item.durability - 5;
    }
    if(item.enhancement > 16){
        item.enhancement = item.enhancement - 1;
        item.name = `[${enhanceArr[item.enhancement]}] ${item.originalName}`
    }
    if(item.durability < 0){
        throw new Error('durability <0!')
    }
    if (item.durability < 20 && 0 < item.enhancement < 14) {
        throw new Error('cannot have durability less than 20 at this level')
    }
    return item
}
function repair(item){
    item.durability = 100;
    return item
}

 module.exports = {
  success,
  fail,
  repair,
  enhanceArr,
};