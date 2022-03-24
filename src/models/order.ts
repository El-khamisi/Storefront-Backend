// @ts-ignore
import Client from "../database";

enum status {
    active = 'active',
    complete = 'complete'
}

export type orders = {
    id: number;
    product_id: number;
    qnt_product: number;
    curr_status: status
}
