const SERVICES_ITEM_MENU_POSITION = 0;
const OBJECT_TYPES_ITEM_MENU_POSITION = 1;

const getPos = (type) => {
  if (type === 'service') {
    return SERVICES_ITEM_MENU_POSITION;
  }
  if (type === 'object') {
    return OBJECT_TYPES_ITEM_MENU_POSITION;
  }
  throw new Error(`unknown type ${type}`);
};

export const getListTitle = (mainNav, type) => mainNav.edges[getPos(type)].node.title;

export const getListItems = (mainNav, type) => mainNav.edges[getPos(type)].node.submenu;

export const getServicesTitle = (mainNav) => getListTitle(mainNav, 'service');
export const getObjectTypesTitle = (mainNav) => getListTitle(mainNav, 'object');

export const getServiceItems = (mainNav) => getListItems(mainNav, 'service');
export const getObjectTypeItems = (mainNav) => getListItems(mainNav, 'object');

export const getFormattedServiceItems = (mainNav) => getServiceItems(mainNav);
export const getFormattedObjectTypeItems = (mainNav) => getObjectTypeItems(mainNav);
