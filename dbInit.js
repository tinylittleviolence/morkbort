const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

//require('./models/Game')(sequelize, Sequelize.DataTypes);
//require('./models/GamePlayer')(sequelize, Sequelize.DataTypes);
require('./models/Player')(sequelize, Sequelize.DataTypes);
require('./models/PlayerCharacters')(sequelize, Sequelize.DataTypes);
const AbilityValues = require('./models/Abilities')(sequelize, Sequelize.DataTypes);
require('./models/Characters')(sequelize, Sequelize.DataTypes);
require('./models/CharacterAbilities')(sequelize, Sequelize.DataTypes);
const BrokenBodiesValues = require('./models/BrokenBodies')(sequelize, Sequelize.DataTypes);
const HabitValues = require('./models/Habits')(sequelize, Sequelize.DataTypes);
const InnateValues = require('./models/Innate')(sequelize, Sequelize.DataTypes);
const OriginValues = require('./models/Origin')(sequelize, Sequelize.DataTypes);
const TaleValues = require('./models/Tales')(sequelize, Sequelize.DataTypes);
const TraitValues = require('./models/Traits')(sequelize, Sequelize.DataTypes);
const specialisation = require('./models/Specialisation')(sequelize, Sequelize.DataTypes);
const ClassValues = require('./models/Class')(sequelize, Sequelize.DataTypes);
require('./models/ClassInnates')(sequelize, Sequelize.DataTypes);
require('./models/ClassOrigins')(sequelize, Sequelize.DataTypes);
require('./models/ClassSpecialisation')(sequelize, Sequelize.DataTypes);



const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const seedVals = [
        //abilities
		AbilityValues.upsert({ name: 'Agility', tag: 'AGI'}),
		AbilityValues.upsert({ name: 'Presence', tag: 'PRE'}),
        AbilityValues.upsert({ name: 'Strength', tag: 'STR'}),
        AbilityValues.upsert({ name: 'Toughness', tag: 'TOU'}),
        //Broken bodies
        BrokenBodiesValues.upsert({ roll: 1, name: 'Staring, manic gaze.'}),
        BrokenBodiesValues.upsert({ roll: 2, name: 'Covered in (for some) blasphemous tattoos.'}),
        BrokenBodiesValues.upsert({ roll: 3, name: 'Rotting face. Wears a mask.'}),
        BrokenBodiesValues.upsert({ roll: 4, name: 'Lost three toes, limps.'}),
        BrokenBodiesValues.upsert({ roll: 5, name: 'Starved: gaunt and pale.'}),
        BrokenBodiesValues.upsert({ roll: 6, name: 'One hand replaced with rusting hook (d6 damage).'}),
        BrokenBodiesValues.upsert({ roll: 7, name: 'Decaying teeth.'}),
        BrokenBodiesValues.upsert({ roll: 8, name: 'Hauntingly beautiful, unnervingly clean.'}),
        BrokenBodiesValues.upsert({ roll: 9, name: 'Hands caked with sores.'}),
        BrokenBodiesValues.upsert({ roll: 10, name: 'Cataract slowly but surely spreading in both eyes.'}),
        BrokenBodiesValues.upsert({ roll: 11, name: 'Long tangled hair, at least one cockroach in residence.'}),
        BrokenBodiesValues.upsert({ roll: 12, name: 'Broken, crushed ears.'}),
        BrokenBodiesValues.upsert({ roll: 13, name: 'Juddering and stuttering from nerve damage or stress.'}),
        BrokenBodiesValues.upsert({ roll: 14, name: 'Corpulent, ravenous, drooling.'}),
        BrokenBodiesValues.upsert({ roll: 15, name: 'One hand lacks thumb and index finger, grips like a lobster.'}),
        BrokenBodiesValues.upsert({ roll: 16, name: 'Red, swollen alcoholic\'s nose.'}),
        BrokenBodiesValues.upsert({ roll: 17, name: 'Resting maniac face, making friends is hard.'}),
        BrokenBodiesValues.upsert({ roll: 18, name: 'Chronic athlete\'s foot. Stinks.'}),
        BrokenBodiesValues.upsert({ roll: 19, name: 'Recently slashed and stinking eye covered with a patch.'}),
        BrokenBodiesValues.upsert({ roll: 20, name: 'Nails cracked and black, maybe about to drop off.'}),
        //Bad Habits
        HabitValues.upsert({ roll: 1, name: 'Obsessively collect small sharp stones.'}),
        HabitValues.upsert({ roll: 2, name: 'Won\'t use a blade without testing it on your own flesh. Arms knitted with scars.'}),
        HabitValues.upsert({ roll: 3, name: 'Can\'t stop drinking once you start.'}),
        HabitValues.upsert({ roll: 4, name: 'Gambling addict. Must bet every day. If you lose, raise and bet again.'}),
        HabitValues.upsert({ roll: 5, name: 'Cannot tolerate criticism of any kind. Results in rage and weeping.'}),
        HabitValues.upsert({ roll: 6, name: 'Unable to get to the point. Have never actually finished a story.'}),
        HabitValues.upsert({ roll: 7, name: 'Best friend is a skull. Carry it with you, tell it everything, you trust no one more.'}),
        HabitValues.upsert({ roll: 8, name: 'You pick your nose so deep it bleeds.'}),
        HabitValues.upsert({ roll: 9, name: 'Laugh hysterically at your own jokes, which you then explain in detail.'}),
        HabitValues.upsert({ roll: 10, name: 'A nihilist. You insist on telling everyone you are a nihilist and explaining why.'}),
        HabitValues.upsert({ roll: 11, name: 'Inveterate bug eater.'}),
        HabitValues.upsert({ roll: 12, name: 'Stress response is aestethic display. The worse things get, the fancier you need to be.'}),
        HabitValues.upsert({ roll: 13, name: 'Permanent phlegm deposit in throat. Continuously cough, snort, spit and swallow.'}),
        HabitValues.upsert({ roll: 14, name: 'Pyromaniac.'}),
        HabitValues.upsert({ roll: 15, name: 'Consistently lose important items and forget vital facts.'}),
        HabitValues.upsert({ roll: 16, name: 'Insecure shit-stirrer. Will talk about whoever just left the room.'}),
        HabitValues.upsert({ roll: 17, name: 'You stutter when lying.'}),
        HabitValues.upsert({ roll: 18, name: 'You giggle insanely at the worst possible times.'}),
        HabitValues.upsert({ roll: 19, name: 'You whistle when trying to hide. You will deny this. Whistle when 5, 7, 9, 11 or 13 is rolled on a d20.'}),
        HabitValues.upsert({ roll: 20, name: 'You make jewelry from the teeth of the dead. If this can be considered a bad habit.'}),
        //Terrible Traits
        TraitValues.upsert({ roll: 1, name: 'Endlessly aggravated.'}),
        TraitValues.upsert({ roll: 2, name: 'Inferiority complex.'}),
        TraitValues.upsert({ roll: 3, name: 'Problems with authority.'}),
        TraitValues.upsert({ roll: 4, name: 'Loud mouth.'}),
        TraitValues.upsert({ roll: 5, name: 'Cruel.'}),
        TraitValues.upsert({ roll: 6, name: 'Egocentric.'}),
        TraitValues.upsert({ roll: 7, name: 'Nihilistic.'}),
        TraitValues.upsert({ roll: 8, name: 'Prone to substance abuse.'}),
        TraitValues.upsert({ roll: 9, name: 'Conflicted.'}),
        TraitValues.upsert({ roll: 10, name: 'Shrewd.'}),
        TraitValues.upsert({ roll: 11, name: 'Vindictive.'}),
        TraitValues.upsert({ roll: 12, name: 'Cowardly.'}),
        TraitValues.upsert({ roll: 13, name: 'Lazy.'}),
        TraitValues.upsert({ roll: 14, name: 'Suspicious.'}),
        TraitValues.upsert({ roll: 15, name: 'Ruthless.'}),
        TraitValues.upsert({ roll: 16, name: 'Worried.'}),
        TraitValues.upsert({ roll: 17, name: 'Bitter.'}),
        TraitValues.upsert({ roll: 18, name: 'Deceitful.'}),
        TraitValues.upsert({ roll: 19, name: 'Wasteful.'}),
        TraitValues.upsert({ roll: 20, name: 'Arrogant.'}),
        //Troubling Tales
        TaleValues.upsert({ roll: 1, name: 'Pursued for manslaughter. There is a bounty.'}),
        TaleValues.upsert({ roll: 2, name: 'In massive debt. The debt is being traded to successively more ruthless groups.'}),
        TaleValues.upsert({ roll: 3, name: 'Have a rare, sought after item.'}),
        TaleValues.upsert({ roll: 4, name: 'Have a cursed never-healing wound.'}),
        TaleValues.upsert({ roll: 5, name: 'Had an illegal, immoral and secret affair with a member of the royal family. Has proof.'}),
        TaleValues.upsert({ roll: 6, name: 'Escaped cult member. Terrified and paranoid. Other cultists are everywhere.'}),
        TaleValues.upsert({ roll: 7, name: 'An identity thief who recently killed and replaced this person.'}),
        TaleValues.upsert({ roll: 8, name: 'Banished and disowned for unspecified deeds. Can never go home.'}),
        TaleValues.upsert({ roll: 9, name: 'Deserted military after witnessing a massacre, bounty on head. Hunted by former friends.'}),
        TaleValues.upsert({ roll: 10, name: 'Very recently murdered a close relative. _Very recently_.'}),
        TaleValues.upsert({ roll: 11, name: 'A puzzle cube has been calibrated incorrectly (or has it?), awakening a slumbering abomination.'}),
        TaleValues.upsert({ roll: 12, name: 'Evil creatures love the scent of your spoor and are drawn to it, bringing disaster in your wake.'}),
        TaleValues.upsert({ roll: 13, name: 'A battle wound left a shard of metal slowly inching closer to your heart. Every day there is a 2% chance it reaches it.'}),
        TaleValues.upsert({ roll: 14, name: 'Violence forced you into the wilderness. You think waving trees are whispering. You talk to, scream at, attack trees.'}),
        TaleValues.upsert({ roll: 15, name: 'Cursed to share the nightmares of others, you sleep far, far away.'}),
        TaleValues.upsert({ roll: 16, name: 'At permanent war with all corvids. No contact without some violence. You carry a sling.'}),
        TaleValues.upsert({ roll: 17, name: 'After dreaming of an underground temple to a forgotten god you understand the songs of insects and worms.'}),
        TaleValues.upsert({ roll: 18, name: 'Being tracked and observed by a golem after an agreement which you know has been wiped from your mind.'}),
        TaleValues.upsert({ roll: 19, name: '\'Burn or be burned\' is the fate you accept.'}),
        TaleValues.upsert({ roll: 20, name: 'Your flesh heals twice as fast, but your companions twice as slow. You see a many-eyed \'guardian angel\.'}),
        //Classes
        ClassValues.upsert(
            {
                name: 'Fanged Deserter',
                roll: 1,
                description: 'You have thirty or so friends who never let you down: YOUR TEETH. Disloyal, deranged or simply uncontrollable, any group that didn\'t boot you out you left anyway. But your parliament of teeth - enormous, protruding, sharp - have always been your allies.',
                strengthGenModifier: 2,
                presenceGenModifier: -1,
                agilityGenModifier: -1,
                toughnessGenModifier: 0,
                omenDice: 2, 
                hitDice: 10,
                startingSilverd6Quantity: 2,
                weaponDice: 10,
                armourDice: 4,
                originDice: 6,
                originDescription: 'Your earliest memory is ',
                specialisationRolls: 1
            }),
            ClassValues.upsert(
                {
                    name: 'Gutterborn Scum',
                    roll: 2,
                    description: 'An ill star smiled upon your birth. Poverty, crime and bad parenting didn\'t help either. In your community an honest day\'s work was never an option. Not that you ever tried, what are you, some kind of mug? A razor blade and a moonless night are worth a week of chump-work.',
                    strengthGenModifier: -2,
                    presenceGenModifier: 0,
                    agilityGenModifier: 0,
                    toughnessGenModifier: 0,
                    omenDice: 2, 
                    hitDice: 6,
                    startingSilverd6Quantity: 1,
                    weaponDice: 6,
                    armourDice: 2,
                    originDice: 6,
                    originDescription: 'Bad birth: ',
                    specialisationRolls: 1
                }),
                ClassValues.upsert(
                    {
                        name: 'Esoteric Hermit',
                        roll: 3,
                        description: 'The stone of your cave is one with the stars. Silence and perfection. Now the chaos of a fallen world disturbs your rituals and the caul of night grows blacker than your cavern\'s gloom. Irritating!',
                        strengthGenModifier: -2,
                        presenceGenModifier: 2,
                        agilityGenModifier: 0,
                        toughnessGenModifier: 0,
                        omenDice: 4, 
                        hitDice: 4,
                        startingSilverd6Quantity: 1,
                        weaponDice: 4,
                        armourDice: 2,
                        originDice: 6,
                        originDescription: 'Eldritch origin: ',
                        specialisationRolls: 1
                    }),
                    ClassValues.upsert(
                        {
                            name: 'Wretched Royalty',
                            roll: 4,
                            description: 'Bowed down only by the memories of your lost glory, you could never submit to anyone else. Not you, of noble blood! Not that you expect any of these peons to understand the depths of your sorrow.',
                            strengthGenModifier: 0,
                            presenceGenModifier: 0,
                            agilityGenModifier: 0,
                            toughnessGenModifier: 0,
                            omenDice: 2, 
                            hitDice: 6,
                            startingSilverd6Quantity: 4,
                            weaponDice: 8,
                            armourDice: 3,
                            originDice: 6,
                            originDescription: 'Things were going well, until ',
                            specialisationRolls: 2
                        }),
                        ClassValues.upsert(
                            {
                                name: 'Heretical Priest',
                                roll: 5,
                                description: 'Hunted by the **Two-Headed Basilisks** of the One True Faith, this heretic can be found raving in ruins, traipsing endlessly down dusty roads and desecrating cathedrals by night.',
                                strengthGenModifier: -2,
                                presenceGenModifier: 2,
                                agilityGenModifier: 0,
                                toughnessGenModifier: 0,
                                omenDice: 4, 
                                hitDice: 8,
                                startingSilverd6Quantity: 3,
                                weaponDice: 8,
                                armourDice: 4,
                                originDice: 6,
                                originDescription: 'Unholy origins: ',
                                specialisationRolls: 1
                            }),
                            ClassValues.upsert(
                                {
                                    name: 'Occult Herbmaster',
                                    roll: 6,
                                    description: 'Born of the mushroom, raised in the glade, watched by the eye of the moon in a silverback pool.',
                                    strengthGenModifier: -2,
                                    presenceGenModifier: 0,
                                    agilityGenModifier: 0,
                                    toughnessGenModifier: 2,
                                    omenDice: 2, 
                                    hitDice: 6,
                                    startingSilverd6Quantity: 2,
                                    weaponDice: 6,
                                    armourDice: 2,
                                    originDice: 8,
                                    originDescription: 'Probably raised in ',
                                    specialisationRolls: 0
                                })

	];
	await Promise.all(seedVals);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);
