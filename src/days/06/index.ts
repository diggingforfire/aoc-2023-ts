import Day from "../../day";

class Day06 extends Day {
    protected solvePartOne(input: string): string | number {
        const timesWithDistance = this.getTimesWithDistance(input);
        
        const differentWays = this.getDifferentWays(timesWithDistance);

        const result = this.sumLengths(differentWays);

        return result;
    }

    protected solvePartTwo(input: string): string | number {
        const timesWithDistance = this.getTimesWithDistance(input, (line) => line.replaceAll(" ", ""));
        
        const differentWays = this.getDifferentWays(timesWithDistance);

        const result = this.sumLengths(differentWays);

        return result;
    }

    private sumLengths(differentWays: number[][] | undefined) {
        return differentWays?.map(ways => ways.length).reduce((a, b) => a * b)!;
    }

    getDifferentWays(timesWithDistance: { time: number; distance: number; }[] | undefined) {
        return timesWithDistance?.map(({ time, distance }) => this.getDistances(time).filter(dist => dist > distance));
    }

    getDistances(time: number) {
        let distances = [];
        let max = time;
        for (let i = 0; i < time; i++) {
            distances.push(i * max--);
        }
        return distances;
    }

    getTimesWithDistance(input: string, lineFunction?: (line: string) => string) {
        const [times, distances] = input.split("\n").map(line => ( (lineFunction && lineFunction(line) || line)).match(/\d+/g)?.map(str => parseInt(str)));
        const timesWithDistance = times?.map((time, index) => ({ time, distance: distances![index] }));
    
        return timesWithDistance;
    }
}

export default new Day06;