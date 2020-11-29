const createModals = () => {
  const modals = new Map();
  const add = (type, component) => modals.set(type, component);
  const get = (type) => modals.get(type);
  const has = (type) => modals.has(type);

  return {
    add,
    get,
    has,
  };
};

export default createModals;
