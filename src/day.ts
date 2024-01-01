import fs from "fs";
import path from "path";

abstract class Day {

    async partOne(): Promise<string | number> {
        const input = await this.getInput();
        return this.solvePartOne(input);
    }

    async partTwo(): Promise<string | number> {
        const input = await this.getInput();
        return this.solvePartTwo(input);
    }

    async getInput(): Promise<string> {
        const input = await fs.promises.readFile(path.join(__dirname, "days", this.constructor.name.slice(-2), 'input.txt'), 'utf-8');
        return input;
    }

    protected abstract solvePartOne(input: string): string | number;
    protected abstract solvePartTwo(input: string): string | number;
}

export default Day;