import Day from "../../day";

enum HandType {
    HighCard,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind
}

const CardLabel : { [key: string]: number } = {
 "2": 2,
 "3": 3,
 "4": 4,
 "5": 5,
 "6": 6,
 "7": 7,
 "8": 8,
 "9": 9,
 "T": 10,
 "J": 11,
 "Q": 12,
 "K": 13,
 "A": 14
};

class Day07 extends Day {

    protected solvePartOne(input: string): string | number {
        
        const hands = this.getHands(input)

        this.sortHands(hands);

        return this.sumRanks(hands);
    }

    protected solvePartTwo(input: string): string | number {
        CardLabel["J"] = 1;

        const hands = this.getHands(input)

        for (const hand of hands) {
            hand.handType = hand.bestHandType;
        }

        this.sortHands(hands);

        return this.sumRanks(hands);
    }

    private sumRanks(hands: { handType: HandType | undefined; display: string; cards: number[]; bid: number; }[]) {
        return hands.reduce((acc, curr, rank) => acc + (curr.bid * (rank + 1)), 0);
    }

    private sortHands(hands: { handType: HandType | undefined; display: string; cards: number[]; bid: number; }[]) {
        hands.sort((a, b) => {
            const diff = (a.handType ?? 0) - (b.handType ?? 0);
            if (diff !== 0) {
                return diff;
            }

            for (let i = 0; i < 5; i++) {
                const diff = a.cards[i] - b.cards[i];
                if (diff !== 0) {
                    return diff;
                }
            }

            return 0;
        });
    }

    private getHands(input: string) {
        return input.split("\n")
            .map(line => line.split(" ")
            ).map((word) => {
                const handType = this.getHandType(word[0]);
                return {
                    handType: handType,
                    bestHandType: this.getBestHandType(word[0]),
                    display: word[0],
                    cards: word[0].split("").map(c => CardLabel[c]),
                    bid: parseInt(word[1])
                };
            });
    }

    private getBestHandType(hand: string) : HandType | undefined {
        
        let max = this.getHandType(hand) ?? 0;

        const jokers = hand.split("").map((c, i) => ({c, i})).filter(c => c.c === "J");

        if (jokers.length) {
            const keys = Object.keys(CardLabel);

            const cartesian =
                (...a: any[]) => a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
    
            const prod = jokers.map(joker => keys);
            
            const replacements = cartesian(...prod);

            for (const replacement of replacements) {
                const newHand = hand.split("");
                for (const joker of jokers) {
                    newHand[joker.i] = (replacement.shift && replacement.shift()) || replacement;
                }

                const handType = this.getHandType(newHand.join(""));
                if (handType && handType > max) {
                    max = handType;
                }
            }
        }

        return max;
    }

    private getHandType(hand: string): HandType | undefined  {
        const groups = hand.split("").reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number; });

        const keys = Object.keys(groups);

        if (keys.length === 1) return HandType.FiveOfAKind;
        if (keys.some(key => groups[key] === 4)) return HandType.FourOfAKind;
        if (keys.some(key => groups[key] === 3) && keys.some(key => groups[key] === 2)) return HandType.FullHouse;
        if (keys.some(key => groups[key] === 3)) return HandType.ThreeOfAKind;
        if (keys.filter(key => groups[key] === 2).length === 2) return HandType.TwoPair;
        if (keys.some(key => groups[key] === 2)) return HandType.OnePair;
        if (keys.length === 5) return HandType.HighCard;
    }
}

export default new Day07;