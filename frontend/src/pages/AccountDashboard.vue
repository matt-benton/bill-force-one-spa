<template>
    <div>
        <h2>Account Dashboard</h2>
        <ul>
            <li v-for="bill in account.bills" :key="bill.id">
                <h3>{{ bill.name }}</h3>
                <p>{{ bill.description }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    data() {
        return {
            accountId: this.$route.params.accountId,
        }
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
