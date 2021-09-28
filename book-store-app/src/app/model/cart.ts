import { Book } from "./book";
import { User } from "./user";

export class CartModel {
    id !: number;
    user !: User;
    book !: Book;
    quantity !: number;
}
