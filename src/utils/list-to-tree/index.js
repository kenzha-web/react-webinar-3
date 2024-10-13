export default function listToTree(list, rootId = null, idKey = '_id') {
  const tree = [];
  const lookup = {};

  list.forEach(item => {
    lookup[item[idKey]] = { ...item, children: [] };
  });

  list.forEach(item => {
    const parentId = item.parent?._id;
    if (parentId && parentId !== rootId && lookup[parentId]) {
      lookup[parentId].children.push(lookup[item[idKey]]);
    } else if (parentId === rootId || !parentId) {
      tree.push(lookup[item[idKey]]);
    }
  });

  return tree;
}


