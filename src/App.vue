<template>
    <div>
        <navbar></navbar>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Navbar from "./components/navbar/Navbar";

export default {
    name: 'app',
    components: {
        Navbar
    }
}
</script>

<style>
h1 {
 margin-top: 40px !important;
 margin-bottom: 40px !important;
}

@import "../node_modules/bootstrap/dist/css/bootstrap.css";
</style>
