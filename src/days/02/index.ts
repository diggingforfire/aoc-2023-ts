import Day from "../../day";

interface Game {
    id: number;
    sets: Cube[][];
}

interface Cube {
    color: string;
    count: number;
}

function parseGameInput(input: string) : Game[] {
    return input
        .split("\n")
        .map((line) => line.split(":"))
        .map((parts) => ({
            id: parseInt(parts[0].split(" ")[1]),
            sets: parts[1].split(";").map((set) => 
                set.trim().split(",").map((cubes) => 
                    cubes.trim().split(" ")
                ).map(cube => 
                    ({ color: cube[1], count: parseInt(cube[0]) })
                ) as Cube[]
            )
        }) as Game);
}

class Day02 extends Day {
    protected solvePartOne(input: string): string | number {
        const games = parseGameInput(input);

        const cubes: Cube[] = [
            {
                color: "red",
                count: 12
            },
            {
                color: "blue",
                count: 14
            },
            {
                color: "green",
                count: 13
            },
        ];

        const validGames = games.filter((game) => 
            game.sets.every((set) => 
                set.every((cube) => 
                    (cubes.find((c) => 
                        c.color === cube.color)?.count ?? 0) >= cube.count)));

        return validGames.reduce((acc, game) => acc + game.id, 0);
    }

    protected solvePartTwo(input: string): string | number {
        const games = parseGameInput(input);

        const result = games.map((game) => 
            game.sets.flatMap(set => set.flatMap(cube => cube)).reduce((acc, cube) => {
                acc[cube.color] = Math.max((acc[cube.color] ?? 0), cube.count);
                return acc;
            }, {} as { [key: string]: number })
        ).map((game) => Object.values(game).reduce((acc, val) => acc * val, 1))
        .reduce((acc, val) => acc + val, 0);

        return result;
    }
}

export default new Day02;