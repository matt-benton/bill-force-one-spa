<template>
    <div class="accounts-list">
        <a :href="`/accounts/${account.id}/bills`" v-for="account in accounts" :key="account.id">
            <div class="account-card">
                <h3>{{ account.name }}</h3>
                <p>{{ account.description }}</p>
            </div>
        </a>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    apollo: {
        accounts: gql`
            query {
                accounts {
                    id
                    name
                    description
                }
            }
        `,
    },
}
</script>

<style></style>
