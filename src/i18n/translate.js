const translate = (key, translations, params) => {
  if (!key) {
    return 'Undefined translation key';
  }

  const e = translations.edges.find(({ node }) => node.key === key);
  if (!e) {
    return key;
  }
  if (!params) {
    return e.node.value;
  }
  const ids = Object.keys(params);
  if (ids.length === 0) {
    return e.node.value;
  }
  let s = e.node.value;
  ids.forEach((id) => {
    s = s.replace(`{{${id}}}`, params[id]);
  });
  return s;
};

module.exports = translate;
