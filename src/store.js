import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        items: [],
        activeCheck: {
            check: [],
            expenses: []
        },
        checkHistory: []
    },
    mutations: {
        refreshData(state, data) {
            Object.keys(data).forEach(k => {
                state[k] = data[k];
            });

            localStorage.setItem("local", JSON.stringify(state));
        }
    },
    actions: {
        addItem(context, data) {
            context.state.items.push(data);
            context.state.activeCheck.check.push({
                itemId: data.id,
                units: data.cant
            });

            context.commit("refreshData", context.state);
        },
        deleteItem(context, id) {
            let items = context.state.items;
            items = items.filter(i => i.id !== id);

            context.commit("refreshData", { items });
        },

        addExpenditure(context, data) {
            context.state.items.push(data);
            context.state.activeCheck.check.push({
                itemId: data.id,
                units: data.cant
            });

            context.commit("refreshData", context.state);
        },
        storeCheck(context, check) {
            let items = context.state.items;
            let activeCheck = {
                check: [],
                expenses: []
            };

            items.forEach((item, index) => {
                let ac = context.state.activeCheck.check.find(
                    i => i.itemId == item.id
                );

                item.cant = ac.units;

                activeCheck.check.push({
                    itemId: item.id,
                    units: item.cant
                });
                items[index] = item;
            });

            context.commit("refreshData", {
                checkHistory: check,
                activeCheck,
                items
            });
        }
    }
});

export default store;
