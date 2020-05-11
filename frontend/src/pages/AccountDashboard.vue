<template>
    <div>
        <h2>Account Dashboard</h2>
        <div v-if="$apollo.loading">Loading</div>
        <bill-card v-for="bill in account.bills" :key="bill.id" :bill="bill" v-else></bill-card>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import BillCard from '../components/BillCard'

export default {
    data() {
        return {
            accountId: this.$route.params.accountId,
        }
    },
    components: {
        'bill-card': BillCard,
    },
    apollo: {
        account: {
            query: gql`
                query($accountId: ID!) {
                    account(id: $accountId) {
                        id
                        name
                        bills {
                            id
                            name
                            description
                            due_month
                            due_date
                        }
                    }
                }
            `,
            variables() {
                return {
                    accountId: this.$route.params.accountId,
                }
            },
        },
    },
}
</script>

<style></style>
