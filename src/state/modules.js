const moduleReducer = require.context(".", true, /index.js$/);

const reducers = {};
const sagas = [];
moduleReducer.keys().forEach((file) => {
  if (file === "./index.js") {
    return;
  }
  const module = moduleReducer(file);
  if (module.reducer) {
    reducers[module.namespace] = module.reducer;
  }
});

export { reducers, sagas };
