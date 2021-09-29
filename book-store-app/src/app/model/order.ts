import { Book } from "./book";
import { User } from "./user";

export class Order {
    id !: number;
    receiverName !: String;
    receiverNumber !: String;
    orderDate !: String;
    quantity !: number;
    price !: number;
    city !: String;
    state !: String;
    address !: String;
    zipCode !: String;
    landMark !: String;
    addressType !: String;
    user !: User;
    book !: Book;

}
