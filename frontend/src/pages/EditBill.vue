<template>
    <div class="form-container">
        <div class="alert alert-primary">
            ALERT MESSAGE
        </div>
        <div class="alert alert-danger" v-show="deleteDialogVisible">
            <p>Are you sure you want to delete this bill?</p>
            <div class="alert-buttons">
                <form>
                    <button class="btn btn-danger" @click.prevent="deleteBill">Delete</button>
                    <button
                        class="btn btn-secondary"
                        type="button"
                        @click="deleteDialogVisible = false"
                    >
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
            <button
                class="btn btn-secondary"
                type="button"
                @click.prevent="deleteDialogVisible = true"
            >
                Delete
            </button>
        </form>
    </div>
</template>

<script>
import {
    BILL_QUERY,
    UPDATE_BILL_MUTATION,
    DELETE_BILL_MUTATION,
    ACCOUNT_QUERY,
} from '../constants/graphql'

export default {
    data() {
        return {
            deleteDialogVisible: false,
        }
    },
    methods: {
        deleteBill() {
            this.$apollo
                .mutate({
                    mutation: DELETE_BILL_MUTATION,
                    variables: {
                        id: this.bill.id,
                    },
                    update: (store, payload) => {
                        // Read the data from our cache for this query.
                        const data = store.readQuery({
                            query: ACCOUNT_QUERY,
                            variables: {
                                accountId: this.$route.params.accountId,
                            },
                        })

                        // Remove the deleted item from the cache
                        data.account.bills = data.account.bills.filter(
                            bill => bill.id !== payload.data.deleteBill.id,
                        )

                        // Write our data back to the cache.
                        store.writeQuery({
                            query: ACCOUNT_QUERY,
                            variables: {
                                accountId: this.$route.params.accountId,
                            },
                            data,
                        })
                    },
                })
                .then(() => {
                    this.$router.push(`/accounts/${this.$route.params.accountId}/bills`)
                })
        },
        updateBill() {
            this.$apollo.mutate({
                mutation: UPDATE_BILL_MUTATION,
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
            query: BILL_QUERY,
            variables() {
                return {
                    billId: this.$route.params.billId,
                }
            },
        },
    },
}
</script>

<style></style>
