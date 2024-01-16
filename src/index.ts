import Day01 from "./days/01";
import Day02 from "./days/02";
import Day03 from "./days/03";
import Day04 from "./days/04";
import Day05 from "./days/05";
import Day06 from "./days/06";
import Day07 from "./days/07";
import Day08 from "./days/08";

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
  //console.log(await Day04.partTwo());

  //console.log(await Day05.partOne());
  //console.log(await Day05.partTwo());

  //console.log(await Day06.partOne());
  // console.log(await Day06.partTwo());

  //console.log(await Day07.partOne());
  //console.log(await Day07.partTwo());

  console.log(await Day08.partOne());
  console.log(await Day08.partTwo());
}

main(); 

