<template>
    <div>
        <div class="row">
            <main-info-panel :account="account"></main-info-panel>
        </div>
        <div class="row">
            <div class="bills-list-menu">
                <form class="bills-order-form">
                    <select class="bills-filter-select" id="bills-filter-select" name="filter">
                        <option value="month">Due This Month</option>
                        <option value="all">All Bills</option>
                        <option value="yearly">All Yearly Bills</option>
                    </select>
                    <label for="bills-order-select">Order By</label>
                    <select
                        class="bills-order-select"
                        id="bills-order-select"
                        name="order"
                        v-model="sortBy"
                    >
                        <option value="name">Name</option>
                        <option value="amount">Amount</option>
                        <option value="due_date">Due Date</option>
                        <option value="paid">Paid Status</option>
                    </select>
                </form>
                <div class="bills-list-menu-right">
                    <router-link :to="`/accounts/${accountId}/bills/create`">
                        <button class="btn btn-secondary">New Bill</button>
                    </router-link>
                    <button class="btn btn-secondary" type="submit">Reset Monthly Bills</button>
                </div>
            </div>
            <div class="bills-list">
                <div v-if="$apollo.loading">Loading</div>
                <bill-card
                    v-for="bill in sortedBills"
                    :key="bill.id"
                    :bill="bill"
                    @paid-status-toggled="togglePaidStatus(bill)"
                    v-else
                ></bill-card>
            </div>
        </div>
    </div>
</template>

<script>
import { ACCOUNT_QUERY } from '../constants/graphql'
import { PAY_BILL_MUTATION } from '../constants/graphql'
import BillCard from '../components/BillCard'
import MainInfoPanel from '../components/MainInfoPanel'

export default {
    data() {
        return {
            accountId: this.$route.params.accountId,
            sortBy: 'name',
        }
    },
    computed: {
        sortedBills: function() {
            const bills = this.account.bills

            return bills.sort((a, b) => {
                switch (typeof a[this.sortBy]) {
                    case 'string':
                        return a[this.sortBy].localeCompare(b[this.sortBy])
                    case 'number':
                        return a[this.sortBy] - b[this.sortBy]
                    case 'boolean':
                        return b[this.sortBy] - a[this.sortBy]
                }
            })
        },
    },
    methods: {
        togglePaidStatus(bill) {
            this.$apollo.mutate({
                mutation: PAY_BILL_MUTATION,
                variables: {
                    id: bill.id,
                    paid: !bill.paid,
                },
            })
        },
    },
    components: {
        'bill-card': BillCard,
        'main-info-panel': MainInfoPanel,
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
}
</script>

<style>
.bills-list-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-small);
    font-size: var(--font-medium);
}

.bills-list-menu-right form {
    margin-left: var(--spacing-small);
}

.bills-list-menu-right {
    display: flex;
}

.bills-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: var(--spacing-large);
}
</style>
