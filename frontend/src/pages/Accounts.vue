<template>
    <div class="accounts-list">
        <router-link
            :to="`/accounts/${account.id}/bills`"
            v-for="account in accounts"
            :key="account.id"
        >
            <div class="account-card">
                <h3>{{ account.name }}</h3>
                <p>{{ account.description }}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
import { ALL_ACCOUNTS_QUERY } from '../constants/graphql'

export default {
    apollo: {
        accounts: ALL_ACCOUNTS_QUERY,
    },
}
</script>

<style></style>
