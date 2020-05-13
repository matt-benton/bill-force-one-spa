<template>
    <div>
        <div class="row">
            <main-info-panel :account="account"></main-info-panel>
        </div>
        <h2>Account Dashboard</h2>
        <div v-if="$apollo.loading">Loading</div>
        <bill-card
            v-for="bill in account.bills"
            :key="bill.id"
            :bill="bill"
            @paid-status-toggled="togglePaidStatus(bill)"
            v-else
        ></bill-card>
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
        }
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
