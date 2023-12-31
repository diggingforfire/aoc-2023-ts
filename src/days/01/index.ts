import Day from "../../day";

class Day01 extends Day {

    numbersMap = {
        one: 1, 
        two: 2, 
        three: 3, 
        four: 4, 
        five: 5, 
        six: 6, 
        seven: 7, 
        eight: 8, 
        nine: 9, 
    };
    
    protected solve(input: string, patternFirstMatch: RegExp, patternLastMatch: RegExp): number {
            
        type num = keyof typeof this.numbersMap;

        const result = input
            .split("\n")
            .map((line) => ({
                first: line.match(patternFirstMatch)?.[0], 
                last: line.reverse().match(patternLastMatch)?.[0]
            }))
            .map((result) => 
                `${this.numbersMap[result.first as num] || result.first}` +
                `${this.numbersMap[(result.last?.reverse()) as num] || result.last}`)
            .reduce((acc, cur) => acc + parseInt(cur), 0);

        return result;
    }

    protected solvePartOne(input: string): string | number {
        return this.solve(input, /\d/g, /\d/g);
    }

    protected solvePartTwo(input: string): string | number {
        const wordsRegex = Object.keys(this.numbersMap).map((key) => key).join("|");
        const patternFirstMatch: RegExp = new RegExp(`${wordsRegex}|\\d`, "g");
        const patternLastMatch: RegExp = new RegExp(`${wordsRegex.reverse()}|\\d`, "g");
        return this.solve(input, patternFirstMatch, patternLastMatch);
    }
}

export default new Day01;