import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

export default function novoReadLine() {    
 return createInterface({
    input: stdin,
    output: stdout
});
}