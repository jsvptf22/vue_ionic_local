<template>
    <div>
        <div class="row pt-3">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead class="thead-light">
                            <tr>
                                <th class="text-center" colspan="6">
                                    Inventario
                                </th>
                            </tr>
                            <tr>
                                <th>Producto</th>
                                <th>Existencias</th>
                                <th>Restantes</th>
                                <th>Vendidas</th>
                                <th>Precio unitario</th>
                                <th>Total</th>
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
                                            :value="
                                                getActiveCheckUnits(item.id)
                                            "
                                            type="number"
                                        ></ion-input>
                                    </ion-item>
                                </td>
                                <td>
                                    {{ calculateSellouts(item) }}
                                </td>
                                <td>{{ item.minimalPrice }}</td>
                                <td>
                                    {{
                                        item.minimalPrice *
                                            calculateSellouts(item)
                                    }}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-center">
                                    <b>Unidades Vendidas</b>
                                </td>
                                <td>{{ totalUnitSellouts }}</td>
                                <td class="text-center"><b>Total</b></td>
                                <td>{{ totalSellouts }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <Expenses
                    :expenses="activeCheck.expenses"
                    v-on:refreshExpenses="refreshExpenses"
                />
            </div>
        </div>
        <div class="row pt-3">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead class="thead-light">
                            <tr>
                                <th colspan="2" class="text-center">
                                    <b>Resumen</b>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Total ventas</b></td>
                                <td>{{ totalSellouts }}</td>
                            </tr>
                            <tr>
                                <td><b>Total gastos</b></td>
                                <td>{{ totalExpenses }}</td>
                            </tr>
                            <tr>
                                <td><b>Total</b></td>
                                <td>{{ totalSellouts - totalExpenses }}</td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <ion-button
                                        color="success"
                                        expand="block"
                                        @click="alertSaveCheck()"
                                    >
                                        Terminar inventario
                                    </ion-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row pt-3">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead class="thead-light">
                            <tr>
                                <th colspan="2" class="text-center">
                                    <b>Beneficios</b>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Beneficios del local</b></td>
                                <td>{{ localProfits }}</td>
                            </tr>
                            <tr>
                                <td><b>Beneficios del vendedor</b></td>
                                <td>{{ sellerProfits }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import Expenses from "./Expenses";

export default {
    name: "Check",
    components: {
        Expenses
    },
    methods: {
        getIndexFromActiveCheck(itemId) {
            return this.activeCheck.check.findIndex(i => i.itemId == itemId);
        },
        getActiveCheckUnits(itemId) {
            let index = this.getIndexFromActiveCheck(itemId);
            return this.activeCheck.check[index].units;
        },
        calculateSellouts(item) {
            return item.cant - this.getActiveCheckUnits(item.id);
        },
        saveItem(itemId, units) {
            let index = this.getIndexFromActiveCheck(itemId);
            let activeCheck = this.activeCheck.check.filter(
                (v, i) => i != index
            );
            activeCheck.push({
                itemId,
                units
            });

            this.$store.commit("refreshData", {
                activeCheck: {
                    check: activeCheck,
                    expenses: this.activeCheck.expenses
                }
            });
        },
        refreshExpenses(expenses) {
            this.activeCheck.expenses = expenses;

            this.$store.commit("refreshData", {
                activeCheck: this.activeCheck
            });
        },
        alertSaveCheck() {
            return this.$ionic.alertController
                .create({
                    header: "Almacenando inventario",
                    message: "Está seguro de almacenar ?",
                    buttons: [
                        {
                            text: "No",
                            role: "cancel",
                            cssClass: "secondary"
                        },
                        {
                            text: "Almacenar",
                            cssClass: "primary",
                            handler: () => {
                                this.saveCheck();
                            }
                        }
                    ]
                })
                .then(a => a.present());
        },
        saveCheck() {
            let history = this.$store.state.checkHistory;
            history.unshift({
                id: "T" + moment().valueOf(),
                date: moment(),
                activeCheck: this.activeCheck,
                items: this.items,
                report: {
                    money: this.totalSellouts - this.totalExpenses,
                    personalExpenses: this.totalPersonalExpenses,
                    localProfits: this.localProfits,
                    sellerProfits: this.sellerProfits
                }
            });

            this.$store.dispatch("storeCheck", history);
            this.$router.push({ path: '/history' })

        }
    },
    computed: {
        ...mapState(["items", "activeCheck"]),
        totalUnitSellouts() {
            let total = 0;
            this.items.forEach(item => {
                total += item.cant - this.getActiveCheckUnits(item.id);
            });
            return total;
        },
        totalSellouts() {
            let total = 0;
            this.items.forEach(item => {
                total += item.minimalPrice * this.calculateSellouts(item);
            });
            return total;
        },
        totalExpenses() {
            let total = 0;
            this.activeCheck.expenses.forEach(item => {
                total += +item.value;
            });
            return total;
        },
        totalPersonalExpenses() {
            let total = 0;
            this.activeCheck.expenses.forEach(item => {
                if (!+item.type) {
                    total += +item.value;
                }
            });
            return total;
        },
        localProfits() {
            let total = 0;
            this.items.forEach(item => {
                total +=
                    (item.minimalPrice - item.cost) *
                    this.calculateSellouts(item);
            });
            return total;
        },
        sellerProfits() {
            let total = 0;
            this.items.forEach(item => {
                total +=
                    (item.publicPrice - item.minimalPrice) *
                    this.calculateSellouts(item);
            });
            return total;
        }
    }
};
</script>
