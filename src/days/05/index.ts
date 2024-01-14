import Day from "../../day";

interface Map {
    sourceStart: number;
    sourceEnd: number;
    destinationStart: number;
    destinationEnd: number;
    count: number;
}

class Day05 extends Day {
    protected solvePartOne(input: string): string | number {

        const seeds = input.split("\n\n")[0].match(/\d+/g)?.map(char => parseInt(char));
        
        const maps = input.split("\n\n").slice(1)
            .map(map => map.split("\n")
                .map(line => line.match(/\d+/g)).filter(match => match)
                .map(match => match!.map(num => parseInt(num)))
                .map(numbers => ({
                    sourceStart: numbers[1],
                    destinationStart: numbers[0],
                    count: numbers[2]    
                }))
                .map(({sourceStart, destinationStart, count}) => ({
                    sourceStart,
                    sourceEnd: sourceStart + count - 1,
                    destinationStart,
                    destinationEnd: destinationStart + count - 1,
                    count,      
                } as Map)
            ));

        const locations = seeds!.map(seed => this.followCategory(seed, maps[0], maps));      

        return Math.min(...locations);
    }

    followCategory(source: number, map: Map[], maps: Map[][]) : number {
        const nextMap = maps[0];

        if (!nextMap) return source;

        const containingMap = nextMap.find(({sourceStart, sourceEnd}) => source >= sourceStart && source <= sourceEnd);
        
        if (!containingMap) {
            return this.followCategory(source, maps[1], maps.slice(1));
        } else {
            const sourceDelta = source - containingMap!.sourceStart;
            const destination = containingMap!.destinationStart + sourceDelta;
            return this.followCategory(destination, maps[1], maps.slice(1));
        }
    }

    protected solvePartTwo(input: string): string | number {

        const seeds = input.split("\n\n")[0].match(/\d+/g)?.map(char => parseInt(char));
        
        const maps = input.split("\n\n").slice(1)
            .map(map => map.split("\n")
                .map(line => line.match(/\d+/g)).filter(match => match)
                .map(match => match!.map(num => parseInt(num)))
                .map(numbers => ({
                    sourceStart: numbers[1],
                    destinationStart: numbers[0],
                    count: numbers[2]    
                }))
                .map(({sourceStart, destinationStart, count}) => ({
                    sourceStart,
                    sourceEnd: sourceStart + count - 1,
                    destinationStart,
                    destinationEnd: destinationStart + count - 1,
                    count,      
                } as Map)
            ));

        let minLocation = Number.MAX_VALUE;
        const cache = {} as {[key: number]: number};

        for (let i = 0; i < seeds!.length; i += 2) {
            const pair = seeds!.slice(i, i + 2);
            const sourceStart = pair[0];
            const sourceEnd = pair[0] + pair[1] - 1;

            console.log(sourceStart + " - " + sourceEnd);
            
            maps[0] = maps[0].filter(map => sourceStart <= map.sourceEnd && map.sourceStart <= sourceEnd);
            
            for (let j = sourceStart; j < sourceEnd; j++) {

                if (j % 10000 === 0) console.log(j);
                let newLocation = cache[j];
                if (!newLocation) {
                    newLocation = this.followCategory(j, maps[0], maps);
                    cache[j] = newLocation;
                }

                if (newLocation < minLocation) {
                    minLocation = newLocation;}
            }
        }
       
        return minLocation;
    }
}

export default new Day05;