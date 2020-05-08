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

<style></style>
