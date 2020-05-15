<template>
    <div>
        <div class="row">
            <!-- ! FIXME: The values inside this component are based on ALL bills, not displayed bills -->
            <main-info-panel :account="account" :displayedBills="displayedBills"></main-info-panel>
        </div>
        <div class="row">
            <div class="bills-list-menu">
                <form class="bills-order-form">
                    <select
                        class="bills-filter-select"
                        id="bills-filter-select"
                        name="filter"
                        v-model="filterBy"
                    >
                        <option value="dueThisMonth">Due This Month</option>
                        <option value="all">All Bills</option>
                        <option value="dueYearly">All Yearly Bills</option>
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
                    <button
                        class="btn btn-secondary"
                        type="submit"
                        @click="resetPaidBills(displayedBills)"
                    >
                        Reset Paid Bills
                    </button>
                </div>
            </div>
            <div class="bills-list">
                <div v-if="$apollo.loading">Loading</div>
                <bill-card
                    v-for="bill in displayedBills"
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
import { ACCOUNT_QUERY, PAY_BILL_MUTATION } from '../constants/graphql'
import BillCard from '../components/BillCard'
import MainInfoPanel from '../components/MainInfoPanel'

export default {
    data() {
        return {
            accountId: this.$route.params.accountId,
            sortBy: 'due_date',
            filterBy: 'dueThisMonth',
        }
    },
    computed: {
        displayedBills() {
            if (this.account) {
                return this.sortBills(this.filterBills(this.account.bills))
            }

            return []
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
        sortBills(bills) {
            // ! FIXME: Bills are sorted by due date only so they are not in monthly order
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
        filterBills(bills) {
            const now = new Date(Date.now())

            switch (this.filterBy) {
                case 'all':
                    return bills
                case 'dueThisMonth':
                    return bills.filter(bill => {
                        return bill.due_month === 0 || bill.due_month === now.getMonth() + 1
                    })
                case 'dueYearly':
                    return bills.filter(bill => {
                        return bill.due_month !== 0
                    })
            }
        },
        resetPaidBills(bills) {
            bills.forEach(bill => {
                if (bill.paid) {
                    this.$apollo.mutate({
                        mutation: PAY_BILL_MUTATION,
                        variables: {
                            id: bill.id,
                            paid: false,
                        },
                    })
                }
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
