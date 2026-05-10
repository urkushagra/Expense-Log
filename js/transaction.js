export class Transaction{

  constructor(desc, amount, category, type, date){

    this.id = crypto.randomUUID();

    this.desc = desc;

    this.amount = Number(amount);

    this.category = category;

    this.type = type;

    this.date = date;
  }
}
