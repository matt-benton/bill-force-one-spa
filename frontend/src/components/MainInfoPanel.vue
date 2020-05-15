<template>
    <div class="main-info-panel">
        <div class="main-info-item">
            <h3 class="main-info-item-header">Account</h3>
            <h1>{{ account ? account.name : '' }}</h1>
        </div>
        <div class="main-info-item">
            <h3 class="main-info-item-header">Today's Date</h3>
            <h1>{{ today }}</h1>
        </div>
        <div class="main-info-item">
            <h3 class="main-info-item-header">Total</h3>
            <h1>{{ sumOfAllBills }}</h1>
        </div>
        <div class="main-info-item">
            <h3 class="main-info-item-header">Amount Still Due</h3>
            <h1>{{ sumOfUnpaidBills }}</h1>
        </div>
    </div>
</template>

<script>
import { format } from 'date-fns'

export default {
    data() {
        return {
            today: format(new Date(), 'MM/dd/yyyy'),
        }
    },
    computed: {
        sumOfAllBills: function() {
            let total = 0

            this.displayedBills.forEach(bill => {
                total += bill.amount
            })

            return (total / 100).toFixed(2)
        },
        sumOfUnpaidBills: function() {
            let total = 0

            this.displayedBills.forEach(bill => {
                if (!bill.paid) {
                    total += bill.amount
                }
            })

            return (total / 100).toFixed(2)
        },
    },
    props: ['account', 'displayedBills'],
}
</script>

<style>
.main-info-panel {
    background: linear-gradient(to right, var(--color-grey-dark-3), var(--color-grey-dark-4));
    color: var(--color-primary-light-1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: var(--spacing-large) var(--spacing-large);
    box-shadow: 0 8px 5px var(--color-grey-light-3);
}

.main-info-item {
    width: 100%;
    padding: var(--spacing-medium);
}

.main-info-item-header {
    color: var(--color-primary-light-2);
    padding-bottom: var(--spacing-small);
}
</style>
