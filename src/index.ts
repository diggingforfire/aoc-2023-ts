import Day01 from "./days/01";
import Day02 from "./days/02";
import Day03 from "./days/03";
import Day04 from "./days/04";

declare global {
  interface String {
    reverse(): string;
  }
}

String.prototype.reverse = function() {
  return this.split("").reverse().join("");
};

async function main() {
  //console.log(await Day01.partOne());
  //console.log(await Day01.partTwo());

  //console.log(await Day02.partOne());
  //console.log(await Day02.partTwo());

  //console.log(await Day03.partOne());
  //console.log(await Day03.partTwo());

  //console.log(await Day04.partOne());
  console.log(await Day04.partTwo());
}

main(); 

