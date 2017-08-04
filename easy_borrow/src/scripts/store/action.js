
export default {
	query_url({commit}, data) {
		commit('QUERY_URL', data)
	},

	change_marry_status({commit}, married) {
		commit('CHANGE_MARRY_STATUS', {married: married});
	},

	clear_data({commit}) {
		commit('CLEAR_DATA');
	}
}