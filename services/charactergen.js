const { Characters, CharacterAbilities, Classes, Inventory, Items, Armour, Weapons, Traits, BrokenBodies, Habits, Origins} = require ('../dbObjects');


const roll = require('../services/diceroller');

class Character {
    constructor(charName, classRoll, omens, silver, maxHp, currentHp, powerUses, infected, broken, dead, traits, brokenBodies, habits, origin) {
            this.charName = charName,
            this.classRoll = classRoll,
            this.omens = omens,
            this.silver = silver,
            this.maxHp = maxHp, 
            this.currentHp = currentHp, 
            this.powerUses = powerUses, 
            this.infected = infected,
            this.broken = broken,
            this.dead = dead,
            this.traits = traits,
            this.brokenBodies = brokenBodies,
            this.habits = habits,
            this.origin = origin

        }
};

class ClassRoll {
    constructor(className, roll,
        description, 
        strengthGenModifier, 
        presenceGenModifier,
        agilityGenModifier, 
        toughnessGenModifier,
        omenDice,
        hitDice,
        startingSilverD6Quantity,
        weaponDice,
        armourDice, 
        originDice,
        originDescription,
        specialisationRolls) {
    this.className = className,
    this.roll = roll,
    this.description = description,
    this.strengthGenModifier = strengthGenModifier,
    this.presenceGenModifier = presenceGenModifier, 
    this.agilityGenModifier = agilityGenModifier, 
    this.toughnessGenModifier = toughnessGenModifier,
    this.omenDice = omenDice, 
    this.hitDice = hitDice, 
    this.startingSilverD6Quantity = startingSilverD6Quantity,
    this.weaponDice = weaponDice,
    this.armourDice = armourDice, 
    this.originDice = originDice,
    this.originDescription = originDescription,
    this.specialisationRolls = specialisationRolls
        }
};

class Abilities {
    constructor(str, pre, agi, tou) {
        this.str = str,
        this.pre = pre,
        this.agi = agi, 
        this.tou = tou
    }
};

async function GenerateAbilityScore(mod) {

    const range = await roll.Roll(3, 6, mod).total;

    if (range <= 4) {
        return -3
    }
    if (range >= 5 && range <= 6) {
        return -2
    }
    if (range >= 7 && range <= 8) {
        return -1
    }
    if (range >= 9 && range <= 12) {
        return 0
    }
    if (range >= 13 && range <= 14) {
        return 1
    }
    if (range >= 15 && range <= 16) {
        return 2
    }
    if (range >= 17) {
        return 3
    }

}

async function GenerateStarterItem(classRoll, phase) {
    
    let itemRoll = 0;

    if (phase === 1) {itemRoll = await roll.Roll(1, 6, 0).total;}
    else if (phase === 2 ) {itemRoll = await roll.Roll(1, 12, 0).total;}
    else if (phase === 3 ) {itemRoll = await roll.Roll(1, 12, 0).total;}

    console.log('item roll: ' + itemRoll + ' phase: ' + phase);

    let starterItem = await Items.findOne({ where: { starter_table: phase, starter_roll: itemRoll }});

    //treatment for fanged deserter's illiterate trait
    if (classRoll === 1) {
        do {
            console.log('deserter rolled a scroll. rerolling...');
            if (phase === 1) {itemRoll = await roll.Roll(1, 6, 0).total;}
            else if (phase === 2 ) {itemRoll = await roll.Roll(1, 12, 0).total;}
            else if (phase === 3 ) {itemRoll = await roll.Roll(1, 12, 0).total;}
            starterItem = await Items.findOne({ where: { starter_table: phase, starter_roll: itemRoll }});
        }
        while (starterItem.is_scroll === 1);
    }

    return starterItem;

}

async function GenerateStarterArmour(armourDice) {
    armourRoll = await roll.Roll(1, armourDice, 0).total;

    armour = await Armour.findOne({ where: { roll: armourRoll}});

    return armour;
}

async function GenerateStarterWeapon(weaponDice) {
    weaponRoll = await roll.Roll(1, weaponDice, 0).total;

    weapon = await Weapons.findOne({ where: { roll: weaponRoll}});

    return weapon;
}


async function GenerateTraits() {
    let traits = [];

    rollOne = await roll.Roll(1, 20, 0).total;
    rollTwo = await roll.Roll(1, 20, 0).total;

    traitOne = await Traits.findOne({ where: { roll: rollOne }});
    traitTwo = await Traits.findOne({ where: { roll: rollTwo }});

    traits.push(traitOne.name);
    traits.push(traitTwo.name);

    return traits.join(' ');

}

async function GenerateBrokenBodies() {

    bbRoll = await roll.Roll(1, 20, 0).total;

    bb = await BrokenBodies.findOne({ where: { roll: bbRoll }});

    return bb.name;

}

async function GenerateHabits() {
    habitRoll = await roll.Roll(1, 20, 0).total;

    habit = await Habits.findOne({ where: { roll: habitRoll }});

    return habit.name;
}

async function GenerateOrigin(classRoll, originDice) {
   const originRoll = await roll.Roll(1, originDice, 0).total;

    const origin = await Origins.findOne({ where: { class_roll: classRoll, roll: originRoll}});

    return origin.description;
    
}

module.exports = {
    async CharGen(user, classRoll) {

        try {
        console.log('class roll: ' + classRoll);
        //get class
        const generatedClass = await Classes.findOne({ where: {roll: classRoll }});

        console.log(`Generated class: ${generatedClass.name}`);

        //const nameRollOne = await roll.Roll(1, 6, 0);
        //const nameRollTwo = await roll.Roll(1, 8, 0);
        //const charName = await Names.findOne({ where: { rollOne: nameRollOne, rollTwo = nameRollTwo }} );
        const charName = 'Dave the test';

        const omens = await roll.Roll(1, generatedClass.omen_dice, 0).total;

        console.log(`Generated omens: ${omens}`);

        const silver = await roll.Roll(generatedClass.starting_silver_d6_quantity, 6, 0).total * 10

        console.log(`Generated silver: ${silver}`);

        
        const strength = await GenerateAbilityScore(generatedClass.strength_gen_modifier);
        const presence = await GenerateAbilityScore(generatedClass.presence_gen_modifier);
        const agility = await GenerateAbilityScore(generatedClass.agility_gen_modifier);
        const toughness = await GenerateAbilityScore(generatedClass.toughness_gen_modifier);

        console.log(`STR: ${strength} PRE: ${presence} AGI: ${agility} TOU: ${toughness}`);

        const maxHp = await roll.Roll(1, generatedClass.hit_dice, toughness).total;
        //min hp is always 1
        if (maxHp < 1) { maxHp = 1 };

        const currentHp = maxHp;

        const powerUses = await roll.Roll(1, 4, presence).total;
        if (powerUses < 0) { powerUses = 0 };

        const infected = 0;
        const broken = 0;
        const dead = 0;

        const traits = await GenerateTraits();

        const brokenBodies = await GenerateBrokenBodies();

        const habits = await GenerateHabits();
        
        const origin = await GenerateOrigin(classRoll, generatedClass.origin_dice);

        console.log(origin);

        const generatedCharacter = new Character(charName, classRoll, omens, silver, maxHp, currentHp, powerUses, infected, broken, dead, traits, brokenBodies, habits, origin);
        const generatedAbilities = new Abilities(strength, presence, agility, toughness);
        console.log(generatedCharacter);
        console.log(generatedAbilities);

        //generate starting items
        let hasScrolls = false;

        const firstStarterItem = await GenerateStarterItem(classRoll, 1);

        if (firstStarterItem) { console.log(firstStarterItem.name); }
        else console.log('Nothing');

        const secondStarterItem = await GenerateStarterItem(classRoll, 2);
        if (secondStarterItem.is_scroll === 1)  {
            
            hasScrolls = 1
            //go and get proper description from scroll table
        }
        console.log(secondStarterItem.name);

        const thirdStarterItem = await GenerateStarterItem(classRoll, 3);
        if (thirdStarterItem.is_scroll === 1) {
            
            hasScrolls = 1
            //go and get proper description from scroll table
        }
        console.log(thirdStarterItem.name);

        let armourDiceToUse = generatedClass.armour_dice;

        if (hasScrolls === 1) {armourDiceToUse = 2}
        console.log('armour dice: ' + armourDiceToUse)

        let weaponDiceToUse = generatedClass.weapon_dice;

        if (hasScrolls === 1) {weaponDiceToUse = 6}
        console.log('weapon dice: ' + weaponDiceToUse)

        starterArmour = await GenerateStarterArmour(armourDiceToUse);
        console.log('armour: ' + starterArmour.name);

        starterWeapon = await GenerateStarterWeapon(weaponDiceToUse);
        console.log('weapon: ' + starterWeapon.name);

        /*const savedCharacter = await Characters.create({ 
            user_id: generatedCharacter.user, 
            name: generatedCharacter.charName,
            class: generatedCharacter.classRoll,
            omens: generatedCharacter.omens,
            max_hp: generatedCharacter.maxHp,
            current_hp: generatedCharacter.currentHp, 
            power_uses: generatedCharacter.powerUses,
            infected: generatedCharacter.infected,
            broken: generatedCharacter.broken,
            dead: generatedCharacter.dead,
            traits: generatedCharacter.traits,
            broken_bodies: generatedCharacter.brokenBodies,
            habits: generatedCharacter.habits,
            origin: generatedCharacter.origin
        });

        console.log(savedCharacter);

        const savedCharacterAbilities = await CharacterAbilities.create({
            character_id = savedCharacter.id,
            strength: generatedAbilities.str,
            presence: generatedAbilities.pre,
            agility: generatedAbilities.agi,
            toughness: generatedAbilities.tou,
        });

        console.log(savedCharacterAbilities);

        const invItemOne = await InventoryManager.AddToInventoryFromDb(savedCharacter.id, firstStarterItem.name);
        const invItemTwo = await InventoryManager.AddToInventoryFromDb(savedCharacter.id, secondStarterItem.name);
        const invItemThree = await InventoryManager.AddToInventoryFromDb(savedCharacter.id, thirdStarterItem.name);

        if (invItemOne) { console.Log invItemOne; }
        if (invItemTwo) { console.Log invItemTwo; }
        if (invItemThree) { console.Log invItemThree; }

        */
    } 
    catch (error) {
        console.log(error);
        return;
    }


    },

    
    
}