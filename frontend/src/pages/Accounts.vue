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

<style>
.accounts-list {
    margin: var(--spacing-medium) var(--spacing-large);
}

.account-card {
    background-color: #fff;
    border: 1px solid var(--color-grey-light-3);
    font-size: var(--font-medium);
    padding: var(--spacing-large);
    margin-bottom: var(--spacing-medium);
    border-radius: 5px;
}

.account-card h3 {
    color: var(--color-primary-dark-3);
    margin-bottom: var(--spacing-medium);
}

.account-card p {
    color: var(--color-grey-dark-3);
}
</style>
