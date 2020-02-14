<template>
    <div>
        <div
            class="row"
            v-for="(item, index) in checkHistory"
            v-bind:key="index"
        >
            <div class="col-12">
                <ion-card>
                    <ion-item>
                        <ion-icon name="cash" slot="start"></ion-icon>
                        <ion-label>{{ formatDate(item.date) }}</ion-label>
                        <ion-button
                            @click="deleteItem(item.id)"
                            fill="solid"
                            slot="end"
                            color="danger"
                            >Eliminar</ion-button
                        >
                    </ion-item>

                    <ion-card-content>
                        <ion-item>
                            <ion-label>
                                Beneficios del local:
                                {{ item.report.localProfits }}
                            </ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label>
                                Beneficios del vendedor:
                                {{ item.report.sellerProfits }}
                            </ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label>
                                Adición a caja:
                                {{ item.report.money }}
                            </ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label>
                                Caja al día:
                                {{ totalBox }}
                            </ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label>
                                Gastos personales:
                                {{ item.report.personalExpenses }}
                            </ion-label>
                        </ion-item>
                    </ion-card-content>
                </ion-card>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
    name: "History",
    computed: {
        ...mapState(["checkHistory"]),
        totalBox() {
            let total = 0;
            this.checkHistory.forEach(i => {
                total += +i.report.money;
            });
            return total;
        }
    },
    methods: {
        formatDate(momentInstance) {
            let m = moment(momentInstance).locale("es");
            return m.format("dddd Do MMMM YYYY, h:mm:ss a");
        },
        deleteItem(id) {
            let history = this.checkHistory.filter(i => i.id != id);

            this.$store.commit("refreshData", {
                checkHistory: history
            });
        }
    }
};
</script>
