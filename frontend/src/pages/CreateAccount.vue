<template>
    <div class="form-container">
        <form class="form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" v-model="name" />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea name="description" rows="3" v-model="description"></textarea>
            </div>
            <button class="btn btn-primary" @click.prevent="submit">Create Account</button>
        </form>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    data() {
        return {
            name: '',
            description: '',
        }
    },
    methods: {
        submit() {
            this.$apollo
                .mutate({
                    mutation: gql`
                        mutation($name: String!, $description: String) {
                            createAccount(name: $name, description: $description) {
                                id
                                name
                                description
                            }
                        }
                    `,
                    variables: {
                        name: this.name,
                        description: this.description,
                    },
                })
                .then(response => {
                    this.$router.push(`/accounts/${response.data.createAccount.id}/bills`)
                })
        },
    },
}
</script>

<style></style>
