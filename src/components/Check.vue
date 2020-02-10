<template>
    <div>
        <div class="row">
            <div class="col-12 table-responsive">
                <table class="table table-bordered table-striped">
                    <thead class="thead-light">
                        <tr>
                            <th>Producto</th>
                            <th>Existencias</th>
                            <th>Restantes</th>
                            <th>Vendidas</th>
                            <th>Precio unitario</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" v-bind:key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.cant }}</td>
                            <td>
                                <ion-item>
                                    <ion-input
                                        @input="
                                            saveItem(
                                                item.id,
                                                $event.target.value
                                            )
                                        "
                                        :value="getActiveCheckUnits(item.id)"
                                        type="number"
                                    ></ion-input>
                                </ion-item>
                            </td>
                            <td>
                                {{ calculateSellouts(item) }}
                            </td>
                            <td>{{ item.minimalPrice }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button @click="add">add</button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Check",
    data() {
        return {};
    },
    methods: {
        getIndexFromActiveCheck(itemId) {
            return this.activeCheck.findIndex(i => i.itemId == itemId);
        },
        getActiveCheckUnits(itemId) {
            let index = this.getIndexFromActiveCheck(itemId);
            return this.activeCheck[index].units;
        },
        calculateSellouts(item) {
            return item.cant - this.getActiveCheckUnits(item.id);
        },
        saveItem(itemId, units) {
            let index = this.getIndexFromActiveCheck(itemId);
            let activeCheck = this.activeCheck.filter((v, i) => i != index);
            activeCheck.push({
                itemId,
                units
            });

            this.$store.commit("refreshData", {
                activeCheck
            });
        },
        add() {
            this.$store.dispatch("addItem", {
                id: "T" + Math.round(new Date().getTime() / 1000),
                name: "a",
                cant: 1,
                cost: 1,
                minimalPrice: 1,
                publicPrice: 1
            });
        }
    },
    computed: mapState(["items", "activeCheck", "cant"]),
    watch: {
        activeCheck(val, oldVal) {
            // is triggered whenever the store state changes
            console.log("do stuff", val, oldVal, this.activeCheck);
        }
    }
};
</script>
