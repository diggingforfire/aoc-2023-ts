import Day01 from "./days/01";

declare global {
  interface String {
    reverse(): string;
  }
}

String.prototype.reverse = function() {
  return this.split("").reverse().join("");
};

async function main() {
  console.log(await Day01.partOne());
  console.log(await Day01.partTwo());
}

main(); 

