<template>
    <div class="bills-card">
        <div class="card-header">
            <a href="#">
                <h3>{{ bill.name }}</h3>
            </a>
            <span>{{ getAmountFormatted(bill.amount) }}</span>
        </div>
        <div class="card-body">
            <p class="due-text">
                Due on {{ getMonthName(bill) }} the {{ formatDueDateWithSuffix(bill) }}
                <svg
                    v-if="getWarningStatus(bill)"
                    class="warning-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    viewBox="0 0 24 24"
                >
                    <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
                </svg>
            </p>
            <p>{{ bill.description }}</p>
        </div>
        <div class="card-footer">
            <form>
                <button class="btn btn-success" v-if="bill.paid" @click.prevent="togglePaidStatus">
                    Paid
                    <svg
                        class="paid-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"
                        />
                    </svg>
                </button>
                <button class="btn btn-primary" v-else @click.prevent="togglePaidStatus">
                    Pay
                </button>
            </form>
            <p v-if="bill.autopay" class="autopay-text">autopay on</p>
        </div>
    </div>
</template>

<script>
import { format } from 'date-fns'

export default {
    methods: {
        formatDueDateWithSuffix(bill) {
            return format(new Date(2019, 1, bill.due_date), 'do')
        },
        getMonthName(bill) {
            switch (bill.due_month) {
                case 0:
                    return
                case 1:
                    return 'January'
                case 2:
                    return 'February'
                case 3:
                    return 'March'
                case 4:
                    return 'April'
                case 5:
                    return 'May'
                case 6:
                    return 'June'
                case 7:
                    return 'July'
                case 8:
                    return 'August'
                case 9:
                    return 'September'
                case 10:
                    return 'October'
                case 11:
                    return 'November'
                case 12:
                    return 'December'
            }
        },
        getAmountFormatted(amount) {
            return (amount / 100).toFixed(2)
        },
        togglePaidStatus() {
            this.$emit('paid-status-toggled')
        },
        getWarningStatus(bill) {
            return this.isPastDue(bill)
        },
        isDue(bill) {
            return !bill.paid
        },
        isPastDue(bill) {
            if (this.isDue(bill)) {
                const now = new Date(Date.now())

                if (bill.due_month === 0) {
                    // today's date is after the due date
                    return now.getDay() + 1 > bill.due_date
                } else {
                    /**
                     * This month is after the due month
                     * or this month is the same as the due month and today's date is past the due date
                     */
                    return (
                        now.getMonth() + 1 > bill.due_month ||
                        (now.getMonth() + 1 && now.getDay() + 1 > bill.due_date)
                    )
                }
            }
        },
        isDueToday(bill) {
            if (this.isDue(bill)) {
                const now = new Date(Date.now())

                if (bill.due_month === 0) {
                    return now.getDay() + 1 > bill.due_date
                } else {
                    return (
                        now.getMonth() + 1 === bill.due_month && now.getDay() + 1 === bill.due_date
                    )
                }
            }
        },
    },
    props: ['bill'],
}
</script>

<style>
.bills-card {
    padding: var(--spacing-large);
    background-color: var(--color-white);
    color: var(--color-grey-dark-3);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 40rem;
    box-shadow: 0 8px 5px var(--color-grey-light-2);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: var(--font-small);
}

.card-header a {
    color: var(--color-primary-dark-3);
}

.card-body {
    flex: 2;
    padding-top: var(--spacing-large);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: var(--font-smaller);
}

.due-text {
    font-size: var(--font-medium);
    padding-bottom: var(--spacing-medium);
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-top: var(--spacing-large);
}

.warning-icon {
    width: var(--font-small);
    height: var(--font-small);
    fill: var(--color-red);
}

.paid-icon {
    width: var(--font-large);
    height: var(--font-large);
    margin-left: var(--spacing-small);
    fill: var(--color-white);
}

.autopay-text {
    font-size: var(--font-smaller);
}
</style>
