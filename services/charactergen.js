const { Characters, CharacterAbilities, Classes, Items, 
    Armour, Weapons, Traits, BrokenBodies, Habits, Origins, 
    Names, Specialisations, CharacterSpecialisations, CharacterWeapons, CharacterArmour, Scrolls} = require ('../dbObjects');


const roll = require('../services/diceroller');
const InventoryManager = require('../services/inventorymanager');

class Character {
    constructor(user, charName, classRoll, omens, silver, maxHp, currentHp, powerUses, infected, broken, dead, traits, brokenBodies, habits, origin) {
            this.user = user,
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

class Item {
    constructor(
        name, 
        flavourText,
        value,
        size,
        classAffinity,
        classRoll,
        starterTable,
        starterRoll,
        isScroll,
        customFlavourText) {
    this.name = name,
    this.flavourText = flavourText,
    this.value = value;
    this.size = size;
    this.classAffinity = classAffinity;
    this.classRoll = classRoll;
    this.starterTable = starterTable,
    this.starterRoll = starterRoll,
    this.isScroll = isScroll,
    this.customFlavourText = customFlavourText
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

    //if we find nothing (a roll of one or two) then return straight away

    if (!starterItem) {
        return;
    }

    //treatment for fanged deserter's illiterate trait
    if (classRoll === 1 && starterItem.is_scroll === 1) {
        do {
            console.log('deserter rolled a scroll. rerolling...');
            if (phase === 1) {itemRoll = await roll.Roll(1, 6, 0).total;}
            else if (phase === 2 ) {itemRoll = await roll.Roll(1, 12, 0).total;}
            else if (phase === 3 ) {itemRoll = await roll.Roll(1, 12, 0).total;}
            starterItem = await Items.findOne({ where: { starter_table: phase, starter_roll: itemRoll }});
        }
        while (starterItem.is_scroll === 1);
    }

    //return an instance of the item class for the sake of being able to edit it!
    generatedStarterItem = new Item(
        starterItem.name,
        starterItem.flavour_text,
        starterItem.value,
        starterItem.size,
        starterItem.class_affinity,
        starterItem.class_roll,
        starterItem.starter_table,
        starterItem.starter_roll,
        starterItem.is_scroll,
        starterItem.custom_flavour_text
    );


    //if we have a scroll, update the name and description with a randomly rolled scroll of the right type
    if (generatedStarterItem.isScroll === 1) {
        let scrollType;
        if (phase === 2) {scrollType = 'Unclean'};
        if (phase === 3) {scrollType = 'Sacred'};
        
        generatedStarterItem = await GetScrollInfo(scrollType, generatedStarterItem);
    }
    
    return generatedStarterItem;
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

async function GenerateName() {

    rollOne = await roll.Roll(1, 6, 0).total;
    rollTwo = await roll.Roll(1, 8, 0).total;

    charName = await Names.findOne({ where: { roll_one: rollOne, roll_two: rollTwo}});

    return charName.name;
}

async function GenerateSpecialisation(classRoll, specRolls) {

    let specs = [];
    let lastRollResult = 0
    let rollResult = 0;

    for (let i = 0; i < specRolls; i++) 
    {     
        //make sure we don't get the same spec twice
        do {
          rollResult = await roll.Roll(1, 6, 0).total;
        } while (rollResult == lastRollResult);

        lastRollResult = rollResult;

        let specResult = await Specialisations.findOne({ where: {class_roll: classRoll, roll: rollResult}});
        specs.push(specResult);
    
    }
    
    return specs;

}

async function GetScrollInfo(scrollType, scrollItem) {

    scrollRoll = await roll.Roll(1, 10, 0).total;

    scrollData = await Scrolls.findOne({ where: { scroll_type: scrollType, roll: scrollRoll}});

    scrollItem.name = `${scrollData.name} (${scrollType} scroll)`;
    scrollItem.flavourText = scrollData.effect;

    return scrollItem;
}

module.exports = {
    async CharGen(user, classRoll) {

        try {
        console.log('class roll: ' + classRoll);
        //get class
        const generatedClass = await Classes.findOne({ where: {roll: classRoll }});

    
        const charName = await GenerateName();

        const omens = await roll.Roll(1, generatedClass.omen_dice, 0).total;

        const silver = await roll.Roll(generatedClass.starting_silver_d6_quantity, 6, 0).total * 10
        
        const strength = await GenerateAbilityScore(generatedClass.strength_gen_modifier);
        const presence = await GenerateAbilityScore(generatedClass.presence_gen_modifier);
        const agility = await GenerateAbilityScore(generatedClass.agility_gen_modifier);
        const toughness = await GenerateAbilityScore(generatedClass.toughness_gen_modifier);

        let maxHp = await roll.Roll(1, generatedClass.hit_dice, toughness).total;
        //min hp is always 1
        if (maxHp < 1) { maxHp = 1 };

        const currentHp = maxHp;

        //poweruses can't be any less than zero 
        let powerUses = await roll.Roll(1, 4, presence).total;
        if (powerUses < 0) { powerUses = 0 };

        const infected = 0;
        const broken = 0;
        const dead = 0;

        const traits = await GenerateTraits();

        const brokenBodies = await GenerateBrokenBodies();

        const habits = await GenerateHabits();

        let habitItemSearchTerm; 

        if (habits === 'Best friend is a skull. Carry it with you, tell it everything, you trust no one more.') 
        {
            habitItemSearchTerm = 'Skull';
        }
        if (habits === 'You make jewelry from the teeth of the dead. If this can be considered a bad habit.')
        {
            habitItemSearchTerm = 'Necklace';
        }
        
        const origin = await GenerateOrigin(classRoll, generatedClass.origin_dice);

        const generatedCharacter = new Character(user, charName, classRoll, omens, silver, maxHp, currentHp, powerUses, infected, broken, dead, traits, brokenBodies, habits, origin);
        const generatedAbilities = new Abilities(strength, presence, agility, toughness);
        console.log(generatedCharacter);
        console.log(generatedAbilities);

        //generate starting items
        let hasScrolls = false;

        const firstStarterItem = await GenerateStarterItem(classRoll, 1);

        if (firstStarterItem) { console.log(firstStarterItem.name); }
        else console.log('Nothing');

        const secondStarterItem = await GenerateStarterItem(classRoll, 2);
        if (secondStarterItem.isScroll === 1)  {

            hasScrolls = 1


        }
        console.log(secondStarterItem.name);

        const thirdStarterItem = await GenerateStarterItem(classRoll, 3);
        if (thirdStarterItem.isScroll === 1) {
            
            hasScrolls = 1
          

        }
        console.log(thirdStarterItem.name);

        let scrollItemToStore;

        //if it's an esoteric hermit, generate an extra scroll for them
        if (classRoll == 3)
            {
                console.log('getting a scroll for the esoteric');
                let scrollGenRoll = await roll.Roll(1, 2, 0).total;
                console.log(scrollGenRoll);
                let scrollGenType;

                if (scrollGenRoll == 1) {
                    scrollGenType = 'Unclean';
                }
                else {
                    scrollGenType = 'Sacred';
                }
                console.log(scrollGenType);
               const scrollItem = await Items.findOne({ where: { name: scrollGenType + ' scroll'}});
    
            scrollItemToStore = new Item(
                scrollItem.name,
                scrollItem.flavour_text,
                scrollItem.value,
                scrollItem.size,
                scrollItem.class_affinity,
                scrollItem.class_roll,
                scrollItem.starter_table,
                scrollItem.starter_roll,
                scrollItem.is_scroll,
                scrollItem.custom_flavour_text
        );

        
    
        scrollItemToStore = await GetScrollInfo(scrollGenType, scrollItemToStore);

        console.log(scrollItemToStore);

        }

        


        let armourDiceToUse = generatedClass.armour_dice;

        if (hasScrolls === 1) {armourDiceToUse = 2}
        console.log('armour dice: ' + armourDiceToUse)

        let weaponDiceToUse = generatedClass.weapon_dice;

        if (hasScrolls === 1) {weaponDiceToUse = 6}
        console.log('weapon dice: ' + weaponDiceToUse)

        const starterArmour = await GenerateStarterArmour(armourDiceToUse);
        console.log('armour: ' + starterArmour.name);

        const starterWeapon = await GenerateStarterWeapon(weaponDiceToUse);
        console.log('weapon: ' + starterWeapon.name);

        //create an array to hold weapons to store
        let weaponsToStore = [];

        weaponsToStore.push(starterWeapon);

        //generate specialisations 

        let specs = await GenerateSpecialisation(classRoll, generatedClass.specialisation_rolls);
        if(specs[0]) {console.log(specs[0].name)};
        if(specs[1]) {console.log(specs[1].name)};

        //if that spec comes with a weapon (or if they're toothy!), add it to the array for storing

        for (let i = 0; i < specs.length; i++)
        {
            if (specs[i].class_roll === 1)
            {
                const weap = await Weapons.findOne({ where: { name: 'Bite'}})
                weaponsToStore.push(weap);
            }
            if (specs[i].class_roll === 1 && specs[i].roll === 2)
            {
                const weap = await Weapons.findOne({ where: { name: 'Smelly Scimitar'}})
                weaponsToStore.push(weap);
            }
            if (specs[i].class_roll === 1 && specs[i].roll === 4)
            {
                const weap = await Weapons.findOne({ where: { name: 'Sigurd\'s Sling'}})
                weaponsToStore.push(weap);
            }
            if (specs[i].class_roll === 1 && specs[i].roll === 6)
            {
                const weap = await Weapons.findOne({ where: { name: 'Horseshoe'}})
                weaponsToStore.push(weap);
            }
            if (specs[i].class_roll === 4 && specs[i].roll === 1)
            {
                const weap = await Weapons.findOne({ where: { name: 'Ancestral Blade'}})
                weaponsToStore.push(weap);
            }
            if (specs[i].class_roll === 4 && specs[i].roll === 4)
            {
                const weap = await Weapons.findOne({ where: { name: 'Eurekia'}})
                weaponsToStore.push(weap);
            }
            if (specs[i].class_roll === 4 && specs[i].roll === 5)
            {
                const weap = await Weapons.findOne({ where: { name: 'Silk-wrapped Dagger'}})
                weaponsToStore.push(weap);
            }
            if (specs[i].class_roll === 5 && specs[i].roll === 1)
            {
                const weap = await Weapons.findOne({ where: { name: 'Sacred crook'}})
                weaponsToStore.push(weap);
            }

        }

         

        



        const savedCharacter = await Characters.create({ 
            user_id: generatedCharacter.user, 
            name: generatedCharacter.charName,
            class: generatedCharacter.classRoll,
            omens: generatedCharacter.omens,
            silver: generatedCharacter.silver,
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

        //console.log(savedCharacter);

        const savedCharacterAbilities = await CharacterAbilities.create({
            character_id: savedCharacter.character_id,
            strength: generatedAbilities.str,
            presence: generatedAbilities.pre,
            agility: generatedAbilities.agi,
            toughness: generatedAbilities.tou,
        });

        //console.log(savedCharacterAbilities);

        //store inventory
        var invItemOne;
        
        if (firstStarterItem) {
            invItemOne = await InventoryManager.AddToInventoryFromDb(savedCharacter.character_id, firstStarterItem.name, true);
        } 
        var invItemTwo;
        var invItemThree;

        if (secondStarterItem.isScroll === 1) {
            invItemTwo = await InventoryManager.AddToInventoryManual(savedCharacter.character_id, secondStarterItem.name, secondStarterItem.flavourText, secondStarterItem.value, secondStarterItem.size, secondStarterItem.isScroll);
        }
        else {
            invItemTwo = await InventoryManager.AddToInventoryFromDb(savedCharacter.character_id, secondStarterItem.name, true);
        }

        if (thirdStarterItem.isScroll === 1) {
            invItemThree = await InventoryManager.AddToInventoryManual(savedCharacter.character_id, thirdStarterItem.name, thirdStarterItem.flavourText, thirdStarterItem.value, thirdStarterItem.size, thirdStarterItem.isScroll);
        }
        else {
            invItemThree = await InventoryManager.AddToInventoryFromDb(savedCharacter.character_id, thirdStarterItem.name, true);
        }
        

        //if (invItemOne) { console.log(invItemOne); }
        //if (invItemTwo) { console.log(invItemTwo); }
        //if (invItemThree) { console.log(invItemThree); }

        //habit items, if applicable
        if (habitItemSearchTerm) {
            habitItem = await InventoryManager.AddToInventoryFromDb(savedCharacter.character_id, habitItemSearchTerm, true);
            //console.log(habitItem);
        }
        //esoteric's scroll, if applicable
        if (scrollItemToStore) {
            console.log('storing esoteric scroll');
            storedScroll = await InventoryManager.AddToInventoryManual(savedCharacter.character_id, scrollItemToStore.name, scrollItemToStore.flavourText, scrollItemToStore.value, scrollItemToStore.size, scrollItemToStore.isScroll);
        }
        
        //add lockpicks for the gutterborn if necessary
        if (classRoll === 2 && specs[0].name === 'Filthy Fingersmith') {
            console.log('generating lockpicks for scum...');
            freeLockpicks = await InventoryManager.AddToInventoryFromDb(savedCharacter.character_id, 'Lockpicks');
        }


        //store specialisations

        let storedSpecs = [];

        for (let i = 0; i < specs.length; i++)
        {
            specToPush = await CharacterSpecialisations.create({
                character_id: savedCharacter.character_id,
                specialisation_id: specs[i].id
            })
            storedSpecs.push(specToPush);
        }

        //store weapons

        let storedWeapons = [];

        for (let i = 0; i < weaponsToStore.length; i++)
        {
            let wear;

            if (weaponsToStore[i].roll != 0) {
                wear = 1;
            }
            else if (weaponsToStore[i].roll = 0) {
                wear = 0;
            }


            weaponToPush = await CharacterWeapons.create({
                character_id: savedCharacter.character_id,
                weapon_id: weaponsToStore[i].id,
                worn: wear
            });

            //if it's a ranged weapon, get ammo for it
            if (weaponsToStore[i].is_ranged) {
                generatedAmmo = await InventoryManager.GenerateAmmo(savedCharacter.character_id, savedCharacterAbilities.presence, weaponsToStore[i].name);
            }

            storedWeapons.push(weaponToPush);
        }

        //store armour

        storedArmour = await CharacterArmour.create({
            character_id: savedCharacter.character_id,
            armour_id: starterArmour.id,
            worn: 1
        });

        //find the created character

        createdCharacterInfo = await Characters.findOne({ where: { character_id: savedCharacter.character_id}});
        //console.log('SAVED CHARACTER DATA');
        //console.log(createdCharacterInfo);

        return createdCharacterInfo;
        
    } 
    catch (error) {
        console.log(error);
        return;
    }


    },

    
    
}