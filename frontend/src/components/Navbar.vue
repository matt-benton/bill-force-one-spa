<template>
    <nav>
        <div class="brand">
            <router-link to="/"><h3>Bill Force One</h3></router-link>
            <svg
                class="menu-icon"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                @click="toggleNav"
            >
                <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
            </svg>
        </div>
        <ul class="side-nav">
            <router-link to="/accounts" :class="{ active: $route.params.path === '/accounts' }">
                <li><h3>Accounts</h3></li>
            </router-link>
            <router-link
                to="/accounts/create"
                :class="{ active: $route.params.path === 'accounts/create' }"
                class="active"
            >
                <li><h3>New Account</h3></li>
            </router-link>
        </ul>
    </nav>
</template>

<script>
export default {
    methods: {
        toggleNav() {
            const nav = document.querySelector('.side-nav')

            if (nav.style.display === 'none' || nav.style.display === '') {
                nav.style.display = 'flex'
            } else {
                nav.style.display = 'none'
            }
        },
    },
}
</script>

<style>
nav {
    background-color: var(--color-grey-dark-3);
    height: 100%;
    box-shadow: 0 8px 5px var(--color-grey-light-4);
}

.side-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media (max-width: 768px) {
    .side-nav {
        display: none;
    }
}

.brand {
    font-size: var(--font-medium);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--spacing-large);
    border-bottom: 0.5px solid var(--color-white);
}

.brand a {
    color: var(--color-white);
}

@media (max-width: 768px) {
    .brand {
        display: flex;
        justify-content: space-between;
    }
}

.side-nav a {
    color: var(--color-white);
    padding: var(--spacing-medium);
    width: 100%;
}

.side-nav a:hover {
    background-color: var(--color-primary-dark-1);
}

.side-nav li {
    display: flex;
}

.active {
    border-left: 3px solid var(--color-primary-dark-1);
}

.icon {
    width: var(--font-large);
    height: var(--font-large);
    fill: var(--color-white);
    margin-right: var(--spacing-medium);
}

.menu-icon {
    display: none;
    fill: var(--color-white);
}

@media (max-width: 768px) {
    .menu-icon {
        display: block;
    }
}
</style>
