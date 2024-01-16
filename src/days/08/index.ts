import Day from "../../day";

class Day08 extends Day {
    protected solvePartOne(input: string): string | number {

        const inputParts = input.split("\n\n");
        const instructions = inputParts[0];

        const nodes = this.getNodes(inputParts);

        const start = "AAA";
        const end = "ZZZ";

        let nextNode = nodes[start];

        let counter = 0;

        for (let i = 0; true; i++) {
            counter++;
            const nextInstruction = instructions[i % instructions.length];
            const nextId = nextInstruction === "L" ? nextNode.left : nextNode.right;
      
            if (nextId === end) {
                break;
            }

            nextNode = nodes[nextId];
        }

        return counter;
    }

    protected solvePartTwo(input: string): string | number {
      
        const inputParts = input.split("\n\n");
        const instructions = inputParts[0];
        
        const nodes = this.getNodes(inputParts);

        const starts = Object.keys(nodes).filter(key => key.endsWith("A")).map(key => ({start: key}));

        let counter = 0;
        
        const counters = new Map<string, number>();

        for (let i = 0; true; i++) {
            const nextInstruction = instructions[i % instructions.length];

            counter++;

            for (const start of starts) {
                let nextNode = nodes[start.start];
                const nextId = nextInstruction === "L" ? nextNode.left : nextNode.right;
                start.start = nextId;

                if (start.start.endsWith("Z") && !counters.has(start.start)) {
                    counters.set(start.start, counter);
                }
            }     

            if (counters.size === starts.length) {
                break;
            }
        }

        const gcd = (a: number, b: number): number => b == 0 ? a : gcd (b, a % b);
        const lcm = (a: number, b: number): number =>  a / gcd(a, b) * b;
        const lcmAll = (ns: number[]) => ns.reduce(lcm, 1);

        return lcmAll(Array.from(counters.values()));
    }

    getNodes(inputParts: string[]) {
        const nodes = inputParts[1].split("\n").map(line => 
            line.match(/[A-Z]{3}/g)
        ).map((matches) => ({
            id: matches![0],
            left: matches![1],
            right: matches![2]
        })).reduce((acc, curr) => {
            acc[curr.id] = { left: curr.left, right: curr.right };
            return acc;
        }, {} as { [key: string]: { left: string, right: string } });

        return nodes;
    }
}

export default new Day08;