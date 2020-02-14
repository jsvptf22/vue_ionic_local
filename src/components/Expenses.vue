<template>
    <div>
        <div class="row pb-3">
            <div class="col">
                <ion-fab vertical="top" horizontal="end" slot="fixed">
                    <ion-fab-button @click="openModal">
                        <ion-icon name="add"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead class="thead-light">
                            <tr>
                                <th class="text-center" colspan="4">
                                    Gastos
                                </th>
                            </tr>
                            <tr>
                                <th>Descripción</th>
                                <th>Valor</th>
                                <th>Tipo</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="expenditure in expenses"
                                v-bind:key="expenditure.id"
                            >
                                <td>{{ expenditure.name }}</td>
                                <td>{{ expenditure.value }}</td>
                                <td>
                                    {{
                                        +expenditure.type
                                            ? "Inversión"
                                            : "Personal"
                                    }}
                                </td>
                                <td>
                                    <ion-button
                                        color="danger"
                                        @click="deleteItem(expenditure.id)"
                                        >Eliminar</ion-button
                                    >
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center"><b>Total</b></td>
                                <td colspan="3">{{ total }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ExpenditureForm from "./ExpenditureForm";

export default {
    name: "Expenses",
    props: {
        expenses: Array
    },
    methods: {
        openModal() {
            return this.$ionic.modalController
                .create({
                    component: ExpenditureForm,
                    componentProps: {
                        data: {
                            store: this.$store
                        }
                    }
                })
                .then(modal => {
                    modal.present();
                    modal.onDidDismiss().then(r => {
                        if (r.data) {
                            this.addExpenditure(r.data);
                        }
                    });
                });
        },
        addExpenditure(expenditure) {
            let data = this.expenses;
            data.push(expenditure);
            this.$emit("refreshExpenses", data);
        },
        deleteItem(id) {
            let data = this.expenses.filter(i => i.id != id);
            this.$emit("refreshExpenses", data);
        }
    },
    computed: {
        total() {
            let total = 0;
            this.expenses.forEach(item => {
                total += +item.value;
            });
            return total;
        }
    }
};
</script>
