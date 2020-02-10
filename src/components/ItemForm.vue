<template>
    <div>
        <ion-header>
            <ion-toolbar>
                <ion-title>Crear producto</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal">
                        <ion-icon slot="icon-only" name="close"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item>
                <ion-label position="stacked">Producto</ion-label>
                <ion-input @input="name = $event.target.value"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Cantidad</ion-label>
                <ion-input
                    type="number"
                    @input="cant = $event.target.value"
                ></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Costo</ion-label>
                <ion-input
                    type="number"
                    @input="cost = $event.target.value"
                ></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Precio mínimo</ion-label>
                <ion-input
                    type="number"
                    @input="minimalPrice = $event.target.value"
                ></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Precio público</ion-label>
                <ion-input
                    type="number"
                    @input="publicPrice = $event.target.value"
                ></ion-input>
            </ion-item>
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
    name: "ItemForm",
    data() {
        return {
            store: {},
            name: "",
            cant: 0,
            cost: 0,
            minimalPrice: 0,
            publicPrice: 0
        };
    },
    methods: {
        check() {
            try {
                if (!this.name.length) {
                    throw "Debe indicar el nombre del producto";
                }

                if (!this.cant.length) {
                    throw "Debe indicar la cantidad";
                }

                if (!this.cost.length) {
                    throw "Debe indicar el costo";
                }

                if (!this.minimalPrice.length) {
                    throw "Debe indicar el precio para el trabajador ";
                }

                if (+this.minimalPrice < +this.cost) {
                    throw "El precio minimo debe ser mayor al costo";
                }

                if (!this.publicPrice.length) {
                    throw "Debe indicar el precio para el público ";
                }

                if (+this.publicPrice < +this.minimalPrice) {
                    throw "El precio público debe ser mayor al precio minimo";
                }

                return true;
            } catch (error) {
                this.$ionic.alertController
                    .create({
                        header: "Campo requerido",
                        message: error,
                        buttons: ["OK"]
                    })
                    .then(a => a.present());

                return false;
            }
        },
        save() {
            if (this.check()) {
                this.store.dispatch("addItem", {
                    id: "T" + Math.round(new Date().getTime() / 1000),
                    name: this.name,
                    cant: this.cant,
                    cost: this.cost,
                    minimalPrice: this.minimalPrice,
                    publicPrice: this.publicPrice
                });
                this.dismissModal();
            }
        },
        dismissModal() {
            this.$ionic.modalController.dismiss();
        }
    }
};
</script>
