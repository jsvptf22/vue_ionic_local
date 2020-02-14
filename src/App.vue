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
                <div class="row">
                    <div class="col-4">
                        <ion-button
                            @click="openTab('/items', 'Productos')"
                            expand="block"
                        >
                            <ion-icon
                                slot="icon-only"
                                name="add-circle"
                            ></ion-icon>
                        </ion-button>
                    </div>
                    <div class="col-4">
                        <ion-button
                            @click="openTab('/check', 'Hacer inventario')"
                            expand="block"
                        >
                            <ion-icon
                                slot="icon-only"
                                name="checkbox"
                            ></ion-icon>
                        </ion-button>
                    </div>
                    <div class="col-4">
                        <ion-button
                            @click="openTab('/history', 'Historial')"
                            expand="block"
                        >
                            <ion-icon slot="icon-only" name="cash"></ion-icon>
                        </ion-button>
                    </div>
                </div>
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
