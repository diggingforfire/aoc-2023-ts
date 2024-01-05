import Day from "../../day";

class Day03 extends Day {

    isAnyCharacterNeighbourASymbol(x: number, y: number, schematic: string[][]) {
        return this.isSymbol(x - 1, y, schematic) ||
            this.isSymbol(x + 1, y, schematic) ||
            this.isSymbol(x, y - 1, schematic) ||
            this.isSymbol(x, y + 1, schematic) ||
            this.isSymbol(x - 1, y - 1, schematic) ||
            this.isSymbol(x - 1, y + 1, schematic) ||
            this.isSymbol(x + 1, y - 1, schematic) ||
            this.isSymbol(x + 1, y + 1, schematic);
    }

    isAnyNumberNeighbourASymbol(x1: number, x2: number, y: number, schematic: string[][]) {
        for (let i = x1; i < x2; i++) {
            if (this.isAnyCharacterNeighbourASymbol(i, y, schematic )) {
                return true;
            }
        }
        return false;
    }

    isSymbol(x: number, y: number, schematic: string[][]) {
        const isSymbol = schematic[y]?.[x] && schematic[y]?.[x] !== "." && isNaN(parseInt(schematic[y]?.[x]));
        return isSymbol
    }

    getStringWithIndex(input: string, regex: RegExp) {
        const matches = [];
        let match;
        while (match = regex.exec(input)) {
            matches.push({ 
                value: match[0], 
                x1: match.index,
                x2: match[0].length + match.index -1, 
            });
        }
        return matches;
    }

    protected getGearRatio(
        star: {x1: number, x2: number, y: number}, 
        numbers: {number: number, x1: number, x2: number, y: number}[]) : number {
        
        const offsets = [
            {x: -1, y: +1}, {x: 0, y: +1}, {x: +1, y: +1},  
            {x: -1, y: 0},/*{x: 0, y: 0}*/ {x: +1, y: 0},  
            {x: -1, y: -1},{x: 0, y: -1},  {x: +1, y: -1}, 
        ];

        const neighbourNumbers = offsets
            .map(offset => ({x: star.x1 + offset.x, y: star.y + offset.y}))
            .map(coords => numbers.filter(num => coords.x >= num.x1 && coords.x <= num.x2 && num.y === coords.y))
            .flatMap(nums => nums.map(num => num.number));
         
        const uniqueNumbers = [...new Set(neighbourNumbers)];

        if (uniqueNumbers.length === 2) {
            return uniqueNumbers[0] * uniqueNumbers[1];
        }

        return 0;
    }

    protected solvePartOne(input: string): string | number {
        const lines = input.split("\n");
        
        const schematic = lines.map(line => line.split(""));

        const numbers = lines.flatMap((line, index) => 
            this.getStringWithIndex(line, /\d+/g).map((str) => ({
                number: parseInt(str.value),
                x1: str.x1,
                x2: str.x2,
                y: index
            })));

        const partNumbers = numbers.filter(num => this.isAnyNumberNeighbourASymbol(num.x1, num.x2, num.y, schematic));
    
        return partNumbers.reduce((acc, num) => acc + num.number, 0);
    }

    protected solvePartTwo(input: string): string | number {
        const lines = input.split("\n");

        const stars = lines.flatMap((line, index) => 
            this.getStringWithIndex(line, /\*/g).map((str) => ({
                x1: str.x1,
                x2: str.x2,
                y: index
            })));   

        const numbers = lines.flatMap((line, index) => 
            this.getStringWithIndex(line, /\d+/g).map((str) => ({
                number: parseInt(str.value),
                x1: str.x1,
                x2: str.x2,
                y: index
            })));

        const gearRatios = stars.map(star => this.getGearRatio(star, numbers));

        const sumOfRatios = gearRatios.reduce((acc, num) => acc + num, 0);

        return sumOfRatios;
    }
}

export default new Day03;