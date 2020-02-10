<template>
    <ion-app>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ title }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-buttons>
                    <ion-button @click="openTab('/items', 'Productos')">
                        <ion-icon slot="icon-only" name="add-circle"></ion-icon>
                    </ion-button>
                    <ion-button @click="openTab('/check', 'Hacer inventario')">
                        <ion-icon slot="icon-only" name="checkbox"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-buttons slot="primary">
                    <ion-button @click="openTab('/profits', 'Beneficios')">
                        <ion-icon slot="icon-only" name="cash"></ion-icon>
                    </ion-button>

                    <ion-button @click="openTab('/state', 'Balance')">
                        <ion-icon
                            slot="icon-only"
                            name="trending-up"
                        ></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-footer>
    </ion-app>
</template>

<script>
export default {
    name: "app",
    data: function() {
        return {
            title: "Mi local"
        };
    },
    methods: {
        openTab(route, title) {
            this.title = title;
            this.$router.push(route);
        }
    },
    mounted: function() {
        let data = localStorage.getItem("local") || "{}";
        data = JSON.parse(data);

        this.$store.commit("refreshData", data);
    }
};
</script>
