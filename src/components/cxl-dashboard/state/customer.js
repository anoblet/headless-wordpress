import { action, observable } from "mobx";

class Customer {
    @observable
    data = {};

    @action
    setData(data) {
        this.data = data;
    }
}

export const customer = new Customer();
