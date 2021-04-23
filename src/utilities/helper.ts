import { ActionCreator, TypeConstant } from '../types/form';

export function createAction<ActionType extends TypeConstant>(
  actionName: ActionType
) {
  return function <PayloadType>(): ActionCreator<ActionType, PayloadType> {
    const result = function (payload: PayloadType) {
      return {
        type: actionName,
        payload,
      };
    } as ActionCreator<ActionType, PayloadType>;
    result.getType = (): ActionType => actionName;
    return result;
  };
}

export function getActionType<ActionType, PayloadType>(
  action: ActionCreator<ActionType, PayloadType>
): ActionType {
  return action.getType();
}

export function shallowEqual<T extends Record<string, any>>(
  objA: T,
  objB: T
): boolean {
  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);
  const len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (let i = 0; i < len; i++) {
    const key = aKeys[i];
    if (
      objA[key] !== objB[key] ||
      !Object.prototype.hasOwnProperty.call(objB, key)
    ) {
      return false;
    }
  }

  return true;
}
