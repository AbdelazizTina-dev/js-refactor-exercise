import invoices from "./invoices.json";
import plays from "./plays.json";
import { statement } from "./statement";
import { Invoice, PlaysRecord } from "./types";

const invoice = JSON.parse(JSON.stringify(invoices[0])) as Invoice;
const parsedPlays = JSON.parse(JSON.stringify(plays)) as PlaysRecord;

console.log(statement(invoice, parsedPlays));
