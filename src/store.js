import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        items: [],
        activeCheck: []
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
            context.state.activeCheck.push({
                itemId: data.id,
                units: data.cant
            });

            context.commit("refreshData", context.state);
        },
        deleteItem(context, id) {
            let items = context.state.items;
            items = items.filter(i => i.id !== id);

            context.commit("refreshData", { items });
        }
    }
});

export default store;
