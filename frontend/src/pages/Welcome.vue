<template>
    <div class="welcome-container">
        <div class="welcome-panel">
            <h1 class="main-heading">Bill Force One</h1>
            <h3 class="sub-heading">Track Your Monthly Expenses: Know What's Due And When</h3>
            <ul class="welcome-menu">
                <li class="welcome-menu-item">
                    <router-link to="/accounts">
                        <button class="btn btn-secondary">Accounts</button>
                    </router-link>
                </li>
                <li class="welcome-menu-item">
                    <router-link to="/accounts/create">
                        <button class="btn btn-secondary">New Account</button>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style>
.welcome-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(var(--color-grey-dark-2) 40%, var(--color-grey-dark-3) 40%);
}

.welcome-panel {
    background-color: var(--color-primary-dark-3);
    padding: var(--spacing-largest);
    color: var(--color-white);
    transform: translateY(-40%);
}

.main-heading {
    font-size: var(--font-xl);
    font-weight: 400;
    margin-bottom: var(--spacing-medium);
}

.sub-heading {
    font-size: var(--font-large);
    font-weight: 400;
    margin-bottom: var(--spacing-largest);
}

.welcome-menu {
    display: flex;
}

.welcome-menu-item {
    margin-right: var(--spacing-medium);
}
</style>
