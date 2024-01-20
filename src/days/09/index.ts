import Day from "../../day";

class Day09 extends Day {
    protected solvePartOne(input: string): string | number {
        
        const lines = this.getLinesFromInput(input);

        const result = lines.map(line => this.getNextValue(line)).reduce((a, b) => a + b, 0);   

        return result;
    }

    protected solvePartTwo(input: string): string | number {
        const lines = this.getLinesFromInput(input).map(line => line.reverse());

        const result = lines.map(line => this.getNextValue(line)).reduce((a, b) => a + b, 0);   

        return result;
    }

    getNextValue(input: number[]): number {
        const diffs = input.slice(1).map((n, i) => {
            return n - input[i];
        });

        if (diffs.every((n) => n === 0)) {
            return input[input.length - 1];
        }

        const last = this.getNextValue(diffs);

        return last + input[input.length - 1];
    }

    private getLinesFromInput(input: string) {
        return input
            .split("\n")
            .map((line) => line.split(" ").map((n) => parseInt(n)));
    }
}

export default new Day09;