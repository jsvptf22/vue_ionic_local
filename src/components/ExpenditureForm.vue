<template>
    <div>
        <ion-header>
            <ion-toolbar>
                <ion-title>Crear Gasto</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal(null)">
                        <ion-icon slot="icon-only" name="close"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item>
                <ion-label position="stacked">Nombre</ion-label>
                <ion-input @input="name = $event.target.value"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Valor</ion-label>
                <ion-input
                    type="number"
                    @input="value = $event.target.value"
                ></ion-input>
            </ion-item>
            <ion-radio-group @click="type = $event.target.value">
                <ion-list-header>
                    <ion-label>Tipo</ion-label>
                </ion-list-header>

                <ion-item>
                    <ion-label>Inversión</ion-label>
                    <ion-radio slot="start" value="1"></ion-radio>
                </ion-item>

                <ion-item>
                    <ion-label>Personal</ion-label>
                    <ion-radio slot="start" value="0"></ion-radio>
                </ion-item>
            </ion-radio-group>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-button v-on:click="save" color="primary" expand="block">
                    <ion-icon slot="start" name="add"></ion-icon>
                    Guardar
                </ion-button>
            </ion-toolbar>
        </ion-footer>
    </div>
</template>

<script>
export default {
    name: "ExpenditureForm",
    data() {
        return {
            store: {},
            name: "",
            value: 0,
            type: ""
        };
    },
    methods: {
        check() {
            try {
                if (!this.name.length) {
                    throw "Debe indicar el nombre del gasto";
                }

                if (!this.value.length) {
                    throw "Debe indicar el valor";
                }

                if (!this.type.length) {
                    throw "Debe indicar el tipo de gasto";
                }

                return true;
            } catch (error) {
                this.$ionic.alertController
                    .create({
                        header: "Error",
                        message: error,
                        buttons: ["OK"]
                    })
                    .then(a => a.present());

                return false;
            }
        },
        save() {
            if (this.check()) {
                let data = {
                    id: "T" + Math.round(new Date().getTime() / 1000),
                    name: this.name,
                    value: this.value,
                    type: this.type
                };
                this.dismissModal(data);
            }
        },
        dismissModal(data) {
            this.$ionic.modalController.dismiss(data);
        }
    }
};
</script>
