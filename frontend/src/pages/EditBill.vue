<template>
    <div class="form-container">
        <div class="alert alert-primary">
            ALERT MESSAGE
        </div>
        <div class="alert alert-danger" id="delete-bill-dialog">
            <p>Are you sure you want to delete this bill?</p>
            <div class="alert-buttons">
                <form>
                    <button class="btn btn-danger" type="submit">Delete</button>
                    <button class="btn btn-secondary" type="button" id="hide-delete-dialog-button">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
        <form class="form" v-if="bill">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" v-model="bill.name" />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea name="description" v-model="bill.description"></textarea>
            </div>
            <div class="form-group">
                <label for="amount">Amount</label>
                <input type="text" name="amount" v-model="bill.amount" />
            </div>
            <div class="form-group">
                <label for="due_date">Due Date</label>
                <select name="due_date" v-model="bill.due_date">
                    <option v-for="i in 31" :key="i">{{ i }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="due_month">Due Month (if bill is yearly)</label>
                <select name="due_month" v-model="bill.due_month">
                    <option v-for="i in 12" :key="i">{{ i }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="account">Account</label>
            </div>
            <div class="form-check">
                <input
                    type="checkbox"
                    name="autopay"
                    id="autopay"
                    value="1"
                    v-model="bill.autopay"
                />
                <label for="autopay">Autopay</label>
            </div>
            <button class="btn btn-primary" @click.prevent="updateBill">Save</button>
            <button class="btn btn-secondary" type="button" id="show-delete-dialog-button">
                Delete
            </button>
        </form>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    methods: {
        updateBill() {
            this.$apollo.mutate({
                mutation: gql`
                    mutation(
                        $id: ID!
                        $name: String!
                        $description: String
                        $amount: Int!
                        $dueDate: Int!
                        $dueMonth: Int
                        $autopay: Boolean
                    ) {
                        updateBill(
                            id: $id
                            name: $name
                            description: $description
                            amount: $amount
                            due_date: $dueDate
                            due_month: $dueMonth
                            autopay: $autopay
                        ) {
                            id
                            name
                            description
                            amount
                            due_date
                            due_month
                            autopay
                        }
                    }
                `,
                variables: {
                    id: this.bill.id,
                    name: this.bill.name,
                    description: this.bill.description,
                    amount: this.bill.amount,
                    dueDate: this.bill.due_date,
                    dueMonth: this.bill.due_month,
                    autopay: this.bill.autopay,
                },
            })
        },
    },
    apollo: {
        bill: {
            query: gql`
                query($billId: ID!) {
                    bill(id: $billId) {
                        id
                        name
                        description
                        amount
                        autopay
                        due_date
                        due_month
                    }
                }
            `,
            variables() {
                return {
                    billId: 1,
                }
            },
        },
    },
}
</script>

<style></style>
