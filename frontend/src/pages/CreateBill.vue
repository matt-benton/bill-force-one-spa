<template>
    <div class="form-container">
        <form class="form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" v-model="form.name" />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea name="description" rows="3" v-model="form.description"></textarea>
            </div>
            <div class="form-group">
                <label for="amount">Amount</label>
                <input type="text" name="amount" v-model="form.amount" />
            </div>
            <div class="form-group">
                <label for="due_date">Due Date</label>
                <select name="due_date" v-model="form.due_date">
                    <option v-for="i in 31" :key="i">{{ i }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="due_month">Due Month (if bill is yearly)</label>
                <select name="due_month" v-model="form.due_month">
                    <option v-for="i in 12" :key="i">{{ i }}</option>
                </select>
            </div>
            <div class="form-check">
                <input type="checkbox" name="autopay" id="autopay" v-model="form.autopay" />
                <label for="autopay">Autopay</label>
            </div>
            <button class="btn btn-primary" @click.prevent="saveBill">
                Create Bill
            </button>
        </form>
    </div>
</template>

<script>
import { CREATE_BILL_MUTATION, ACCOUNT_QUERY } from '../constants/graphql'

export default {
    data() {
        return {
            accountId: this.$route.params.accountId,
            form: {
                name: '',
                description: '',
                amount: '',
                due_date: '1',
                due_month: '0',
                autopay: false,
            },
        }
    },
    apollo: {
        account: {
            query: ACCOUNT_QUERY,
            variables() {
                return {
                    accountId: this.$route.params.accountId,
                }
            },
        },
    },
    methods: {
        saveBill() {
            const { name, description, amount, due_date, due_month, autopay } = this.form

            this.$apollo
                .mutate({
                    mutation: CREATE_BILL_MUTATION,
                    variables: {
                        name: name,
                        description: description,
                        amount: amount,
                        due_date: due_date,
                        due_month: due_month,
                        autopay: autopay,
                        account_id: this.accountId,
                    },
                    update: (store, payload) => {
                        const data = store.readQuery({
                            query: ACCOUNT_QUERY,
                            variables: {
                                accountId: this.accountId,
                            },
                        })

                        data.account.bills.push(payload.data.createBill)

                        store.writeQuery({
                            query: ACCOUNT_QUERY,
                            variables: {
                                accountId: this.accountId,
                            },
                            data,
                        })
                    },
                })
                .then(() => {
                    this.$router.push(`/accounts/${this.accountId}/bills`)
                })
        },
    },
}
</script>

<style></style>
