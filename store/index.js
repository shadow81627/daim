export const state = () => ({
  cacheVersion: '',
  stories: [],
});

export const mutations = {
  setStory(state, data) {
    const old = state.getters.getStoryBySlug(data.slug);
    if (old) {
      Object.assign(old, data);
    } else {
      state.stories.push(data);
    }
  },
  setContent(state, data) {
    const old = state.getters.getStoryBySlug(data.slug);
    Object.assign(old, data);
  },
  setCacheVersion(state, version) {
    state.cacheVersion = version;
  },
};

export const getters = {
  getStoryBySlug: (state) => (slug) => {
    return state.stories.find((story) => story.slug === slug);
  },
};

export const actions = {
  loadContent(context, { slug, version }) {
    const endpoint = `cdn/stories/${slug}`;

    // Load the JSON from the API
    return this.app.$storyapi
      .get(endpoint, {
        version,
      })
      .then(({ data }) => {
        context.commit('setStory', data.story);
      })
      .catch((res) => {
        this.error({
          statusCode: res.response.status,
          message: res.response.data,
        });
      });
  },
  loadCacheVersion({ commit }) {
    return this.$storyapi.get(`cdn/spaces/me`).then((res) => {
      commit('setCacheVersion', res.data.space.version);
    });
  },
};
