import { Cliente } from "./cliente.model";
import { Email } from "./email.model";

export interface ClienteDetail {
    cliente: Cliente;
    emails: Email[];
}