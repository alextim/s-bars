module.exports = (fieldName, typeName) => async (source, args, context, info) => {
  const type = info.schema.getType(typeName);
  const mdNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdNode, args, context, {
    fieldName,
  });
  return result;
};
