const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

require('./models/Game')(sequelize, Sequelize.DataTypes);
require('./models/GamePlayers')(sequelize, Sequelize.DataTypes);
require('./models/Player')(sequelize, Sequelize.DataTypes);
require('./models/PlayerCharacters')(sequelize, Sequelize.DataTypes);
const AbilityValues = require('./models/Abilities')(sequelize, Sequelize.DataTypes);
require('./models/Character')(sequelize, Sequelize.DataTypes);
require('./models/CharacterAbilities')(sequelize, Sequelize.DataTypes);
const BrokenBodiesValues = require('./models/BrokenBodies')(sequelize, Sequelize.DataTypes);
const HabitValues = require('./models/Habits')(sequelize, Sequelize.DataTypes);
const InnateValues = require('./models/Innate')(sequelize, Sequelize.DataTypes);
const OriginValues = require('./models/Origin')(sequelize, Sequelize.DataTypes);
const TaleValues = require('./models/Tales')(sequelize, Sequelize.DataTypes);
const TraitValues = require('./models/Traits')(sequelize, Sequelize.DataTypes);
const specialisation = require('./models/Specialisation')(sequelize, Sequelize.DataTypes);
const ClassValues = require('./models/Class')(sequelize, Sequelize.DataTypes);
const MiseryValues = require('./models/Misery')(sequelize, Sequelize.DataTypes);
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
                strength_gen_modifier: 2,
                presence_gen_modifier: -1,
                agility_gen_modifier: -1,
                toughness_gen_modifier: 0,
                omen_dice: 2, 
                hit_dice: 10,
                starting_silver_d6_quantity: 2,
                weapon_dice: 10,
                armour_dice: 4,
                origin_dice: 6,
                origin_description: 'Your earliest memory: ',
                specialisation_rolls: 1
            }),
            ClassValues.upsert(
                {
                    name: 'Gutterborn Scum',
                    roll: 2,
                    description: 'An ill star smiled upon your birth. Poverty, crime and bad parenting didn\'t help either. In your community an honest day\'s work was never an option. Not that you ever tried, what are you, some kind of mug? A razor blade and a moonless night are worth a week of chump-work.',
                    strength_gen_modifier: -2,
                    presence_gen_modifier: 0,
                    agility_gen_modifier: 0,
                    toughness_gen_modifier: 0,
                    omen_dice: 2, 
                    hit_dice: 6,
                    starting_silver_d6_quantity: 1,
                    weapon_dice: 6,
                    armour_dice: 2,
                    origin_dice: 6,
                    origin_description: 'Bad birth: ',
                    specialisation_rolls: 1
                }),
                ClassValues.upsert(
                    {
                        name: 'Esoteric Hermit',
                        roll: 3,
                        description: 'The stone of your cave is one with the stars. Silence and perfection. Now the chaos of a fallen world disturbs your rituals and the caul of night grows blacker than your cavern\'s gloom. Irritating!',
                        strength_gen_modifier: -2,
                        presence_gen_modifier: 2,
                        agility_gen_modifier: 0,
                        toughness_gen_modifier: 0,
                        omen_dice: 4, 
                        hit_dice: 4,
                        starting_silver_d6_quantity: 1,
                        weapon_dice: 4,
                        armour_dice: 2,
                        origin_dice: 6,
                        origin_description: 'Eldritch origin: ',
                        specialisation_rolls: 1
                    }),
                    ClassValues.upsert(
                        {
                            name: 'Wretched Royalty',
                            roll: 4,
                            description: 'Bowed down only by the memories of your lost glory, you could never submit to anyone else. Not you, of noble blood! Not that you expect any of these peons to understand the depths of your sorrow.',
                            strength_gen_modifier: 0,
                            presence_gen_modifier: 0,
                            agility_gen_modifier: 0,
                            toughness_gen_modifier: 0,
                            omen_dice: 2, 
                            hit_dice: 6,
                            starting_silver_d6_quantity: 4,
                            weapon_dice: 8,
                            armour_dice: 3,
                            origin_dice: 6,
                            origin_description: 'Things were going well, until ',
                            specialisation_rolls: 2
                        }),
                        ClassValues.upsert(
                            {
                                name: 'Heretical Priest',
                                roll: 5,
                                description: 'Hunted by the **Two-Headed Basilisks** of the One True Faith, this heretic can be found raving in ruins, traipsing endlessly down dusty roads and desecrating cathedrals by night.',
                                strength_gen_modifier: -2,
                                presence_gen_modifier: 2,
                                agility_gen_modifier: 0,
                                toughness_gen_modifier: 0,
                                omen_dice: 4, 
                                hit_dice: 8,
                                starting_silver_d6_quantity: 3,
                                weapon_dice: 8,
                                armour_dice: 4,
                                origin_dice: 6,
                                origin_description: 'Unholy origins: ',
                                specialisation_rolls: 1
                            }),
                            ClassValues.upsert(
                                {
                                    name: 'Occult Herbmaster',
                                    roll: 6,
                                    description: 'Born of the mushroom, raised in the glade, watched by the eye of the moon in a silverback pool.',
                                    strength_gen_modifier: -2,
                                    presence_gen_modifier: 0,
                                    agility_gen_modifier: 0,
                                    toughness_gen_modifier: 2,
                                    omen_dice: 2, 
                                    hit_dice: 6,
                                    starting_silver_d6_quantity: 2,
                                    weapon_dice: 6,
                                    armour_dice: 2,
                                    origin_dice: 8,
                                    origin_description: 'Probably raised in ',
                                    specialisation_rolls: 0
                                }),
    //miseries
    MiseryValues.upsert({ psalm_number: 11, psalm_text: '1:1 The city shall be made hollow. Of those who rest in hollowness, they shall not be seen.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 12, psalm_text: '1:2 And the earth shall shake and be riven. And from the cracks shall rise a poisonous mist, and in ten days it will shroud the world.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 13, psalm_text: '1:3 Of those that build mightily, so shall they fall, stone by stone.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 14, psalm_text: '1:4 And the depths of the underworld shall bring forth flying spectres and crawling beasts. In their passing the worm grows fat, and the vulture weary.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 15, psalm_text: '1:5 Doubt is crowned. The loyal shall turn their blades on those who silver gave.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 16, psalm_text: '1:6 And blood-cough shall spread like fire across the wastelands of the drought.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 21, psalm_text: '2:1 As at the beginning, so at the end, all manner of fly and wasp shall fill the air.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 22, psalm_text: '2:2 And the ground pale with maggots.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 23, psalm_text: '2:3 And from the Spears: a frost. Born from Bergen Chrypt and covering all.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 24, psalm_text: '2:4 And in ten days and one the writings of sorcerors will be made pale as air.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 25, psalm_text: '2:5 And glass shall become quartz.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 26, psalm_text: '2:6 And SHE shall see HIM grow stronger, and SHE reveals herself and all shall be slain.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 31, psalm_text: '3:1 At Graven-Tosk the soil shall grow warm and those who rest be made to walk.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 32, psalm_text: '3:2 In the heart of Sarkash fog and dusk shall breathe beneath the waking trees. That which was hewed by man shall now hew in its turn.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 33, psalm_text: '3:3 And hunger shall come among you. You shall dig roots and pull children from the breast. The gaunt shall prey upon the gaunt.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 34, psalm_text: '3:4 The great shall be made poor and the poor poorer still.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 35, psalm_text: '3:5 Then shall come rain undending and the day shall be made night by its coming.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 36, psalm_text: '3:6 Brother shall slay Brother and Sister poison Sister.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 41, psalm_text: '4:1 For five days and five nights mothers flesh shall be the cloak of demons.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 42, psalm_text: '4:2 And for five days and five nights shall fathers weep.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 43, psalm_text: '4:3 Look to the West. Forth comes fire, and a horde, and the Kingdoms burn.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 44, psalm_text: '4:4 The liar Arkh shall make knots of the hearts of men, sundering the strongest of bonds.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 45, psalm_text: '4:5 Behold now the Endless Sea, where Leviathan causes waves to be as mountains.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 46, psalm_text: '4:6 And Leviathan shall come among you. Children winter-born and fated to fall before snow, both shall take. ', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 51, psalm_text: '5:1 The lake and brook shall blacken and become tar.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 52, psalm_text: '5:2 The trees shall wither, shrivel and die.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 53, psalm_text: '5:3 And birds shall fall dead from the sky.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 54, psalm_text: '5:4 In one night all those not yet of seven years and seven days shall pass. Born and unborn. And dawn shall give them life as eaters of men.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 55, psalm_text: '5:5 The sky shall weep fire and a great stone shall plummet as a city fallen from heaven.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 56, psalm_text: '5:6 And the last King and the last Queen shall wither to dust. Their wretched courts are devoured by wolves.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 61, psalm_text: '6:1 You shall know the last day is come. The sun shall set and never rise.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 62, psalm_text: '6:2 And day shall be as night and night as day. You shall not sleep, neither shall you wake.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 63, psalm_text: '6:3 Anthelia shall have her will and drink all colour from the world.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 64, psalm_text: '6:4 Those who walk on two legs shall be nameless as the beasts of the field.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 65, psalm_text: '6:5 The earth shall vein, bringing black serpents forth from within the earth.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 66, psalm_text: '6:6 And the unnamed enter the earth pssing through the Veil as it is sundered by Daejmon, the left underling of Nechrubel.', ends_world: 0}),
    MiseryValues.upsert({ psalm_number: 77, psalm_text: '7:7 All praise Yetsabu-Nech, the underworld\'s nightmare, and the black disk which stands before the sun! All praise Verhu, beaming with delight! All praise the fire which burns all! And the darkness shall swallow the darkness.', ends_world: 1}),


	];
	await Promise.all(seedVals);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);
