import Day from "../../day";

interface Card {
    winningNumbers: number[];
    numbersYouHave: number[];
}

class Day04 extends Day {
    protected solvePartOne(input: string): string | number {

        const cards = this.getCards(input)

        const pointsPerCard = cards.map(card => this.getMatchedNumbersCount(card));
        
        const pointsTotal = pointsPerCard.filter(num => num).reduce((acc, num) => acc + Math.pow(2, num -1), 0);

        return pointsTotal;
    }

    protected solvePartTwo(input: string): string | number {

        const cards = this.getCards(input)

        const cardCount = cards.map(card => this.getDeepCount(card, cards)).reduce((acc, num) => acc + num, 0);

        return cardCount;
    }

    getDeepCount(card: Card, cards: Card[]) : number {
        const matchedNumbersCount = this.getMatchedNumbersCount(card);
        const index = cards.indexOf(card);
        const copies = cards.slice(index + 1, index + 1 + matchedNumbersCount);
        return 1 + copies.map(copy => this.getDeepCount(copy, cards)).reduce((acc, num) => acc + num, 0);
    }
    
    getMatchedNumbersCount(card: Card) {
        return card.winningNumbers?.filter(num => 
            card.numbersYouHave?.includes(num))?.length;
    }

    getCards(input: string) {
        return input.split("\n")
            .map(line => line.split("|"))
            .map(parts => ({
                winningNumbers: parts[0].split(":")[1].match(/\d+/g)?.map(char => parseInt(char)),
                numbersYouHave: parts[1].match(/\d+/g)?.map(char => parseInt(char))
            } as Card));
    }
}

export default new Day04;