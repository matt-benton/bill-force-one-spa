<template>
    <div class="bills-card">
        <div class="card-header">
            <a href="#">
                <h3>{{ bill.name }}</h3>
            </a>
            <span>{{ bill.amount }}</span>
        </div>
        <div class="card-body">
            <p class="due-text">
                Due on {{ getMonthName(bill) }} the {{ formatDueDateWithSuffix(bill) }}
                <svg
                    v-if="bill.warning"
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
    },
    props: ['bill'],
}
</script>

<style></style>
