class Result {
    constructor(rolls, modifier, total) {
    this.rolls = rolls;
    this.modifier = modifier;
    this.total = total;  
    }
 }

module.exports = {
    Roll(numDice, sides, modifier) {

        try {
            let rolls = [];
            let total = 0;

            for (i = 0; i < numDice; i++)
            {
                const rollResult = Math.floor(Math.random() * Math.floor(sides)) + 1;
                console.log(`rolled a ${rollResult}`);
                rolls.push(rollResult);
                total = total + rollResult;
            }
            
            total = total + modifier;

            let result = new Result(rolls, modifier, total);

            return result;
         
        }

        catch (error) {
            console.log(error);
        }

    }
};