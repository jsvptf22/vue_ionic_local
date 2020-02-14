<template>
    <div>
        <div class="row fixed-top">
            <div class="col-11">
                <ion-fab vertical="top" horizontal="end" slot="fixed">
                    <ion-fab-button @click="openModal">
                        <ion-icon name="add"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </div>
        </div>
        <div class="row">
            <div class="col-12 table-responsive">
                <table class="table table-bordered table-striped">
                    <thead class="thead-light">
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Costo</th>
                            <th>Precio mínimo</th>
                            <th>Precio público</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" v-bind:key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.cant }}</td>
                            <td>{{ item.cost }}</td>
                            <td>{{ item.minimalPrice }}</td>
                            <td>{{ item.publicPrice }}</td>
                            <td>
                                <ion-button
                                    color="danger"
                                    @click="deleteItem(item.id)"
                                    >Eliminar</ion-button
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import ItemForm from "./ItemForm";

export default {
    data: function() {
        return {};
    },
    methods: {
        openModal() {
            return this.$ionic.modalController
                .create({
                    component: ItemForm,
                    componentProps: {
                        data: {
                            store: this.$store
                        }
                    }
                })
                .then(m => m.present());
        },
        deleteItem(id) {
            return this.$store.dispatch("deleteItem", id);
        }
    },
    computed: mapState(["items"])
};
</script>
