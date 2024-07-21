import invoices from "./invoices.json";
import plays from "./plays.json";
import { statement } from "./statement";
import { PlaysRecord } from "./types";

const invoice = invoices[0];
const parsedPlays = plays as PlaysRecord;

console.log(statement(invoice, parsedPlays));
