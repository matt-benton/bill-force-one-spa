import gql from 'graphql-tag'

export const ALL_ACCOUNTS_QUERY = gql`
    query ALL_ACCOUNTS_QUERY {
        accounts {
            id
            name
            description
            bills {
                id
                name
                description
                due_month
                due_date
                paid
                amount
                account_id
            }
        }
    }
`

export const ACCOUNT_QUERY = gql`
    query ACCOUNT_QUERY($accountId: ID!) {
        account(id: $accountId) {
            id
            name
            bills {
                id
                name
                description
                due_month
                due_date
                paid
                amount
                account_id
            }
        }
    }
`

export const PAY_BILL_MUTATION = gql`
    mutation PAY_BILL_MUTATION($id: ID!, $paid: Boolean!) {
        updateBill(id: $id, paid: $paid) {
            id
            paid
        }
    }
`

export const BILL_QUERY = gql`
    query BILL_QUERY($billId: ID!) {
        bill(id: $billId) {
            id
            name
            description
            amount
            autopay
            due_date
            due_month
        }
    }
`

export const UPDATE_BILL_MUTATION = gql`
    mutation UPDATE_BILL_MUTATION(
        $id: ID!
        $name: String!
        $description: String
        $amount: Int!
        $dueDate: Int!
        $dueMonth: Int
        $autopay: Boolean
    ) {
        updateBill(
            id: $id
            name: $name
            description: $description
            amount: $amount
            due_date: $dueDate
            due_month: $dueMonth
            autopay: $autopay
        ) {
            id
            name
            description
            amount
            due_date
            due_month
            autopay
        }
    }
`

export const DELETE_BILL_MUTATION = gql`
    mutation DELETE_BILL_MUTATION($id: ID!) {
        deleteBill(id: $id) {
            id
        }
    }
`
