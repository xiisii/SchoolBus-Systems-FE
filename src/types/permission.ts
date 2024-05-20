export interface Permission {
  name: string;
  id: number;
}

export interface ApiAction {
  id: number;
  name: string;
}

export interface ApiActionData {
  id?: number;
  name: string;
  children?: ApiActionData[];
}

export type GroupedApiActionData = {
  [key: string]: ApiActionData;
};

export interface EditApiActionData extends ApiActionData {
  state: "checked" | "unchecked" | "indeterminate";
  children: EditApiActionData[];
}

export type GroupedEditApiActionData = {
  [key: string]: EditApiActionData;
};

export const apiActionToEditApiActionData = (
  apiActions: ApiAction[],
  checkedApiActions: ApiAction[],
  apiActionData: ApiActionData
): EditApiActionData => {
  if (apiActionData.id != undefined) {
    return {
      ...apiActionData,
      id: apiActions.find((aa) => aa.name == apiActionData.name)?.id,
      children: [],
      state: checkedApiActions.find((aa) => aa.name == apiActionData.name)
        ? "checked"
        : "unchecked",
    };
  }
  const children = apiActionData.children?.map((aad) =>
    apiActionToEditApiActionData(apiActions, checkedApiActions, aad)
  );
  const checkedAll = children?.every((c) => c.state == "checked");
  const checkedSome = children?.some((c) => c.state != "unchecked");
  return {
    ...apiActionData,
    children: children || [],
    state: checkedAll ? "checked" : checkedSome ? "indeterminate" : "unchecked",
  };
};

export const apiActionToGroupedEditApiActionData = (
  apiActions: ApiAction[],
  checkedApiActions: ApiAction[]
): GroupedEditApiActionData => {
  const groupedEditApiActions: GroupedEditApiActionData = {};
  Object.keys(groupedApiActions).forEach((key) => {
    groupedEditApiActions[key] = apiActionToEditApiActionData(
      apiActions,
      checkedApiActions,
      groupedApiActions[key]
    );
  });
  return groupedEditApiActions;
};

export const apiActionDataToApiActions = (
  apiActionData: ApiActionData
): ApiAction[] => {
  if (apiActionData.id != undefined) {
    return [
      {
        id: apiActionData.id,
        name: apiActionData.name,
      },
    ];
  }
  let apiActions: ApiAction[] = [];
  apiActionData.children?.forEach((aad) => {
    const aa = apiActionDataToApiActions(aad);
    apiActions = [...apiActions, ...aa];
  });
  return apiActions;
};

const editApiActionDataToApiActions = (
  apiActionData: EditApiActionData
): ApiAction[] => {
  if (apiActionData.id != undefined && apiActionData.state == "checked") {
    return [
      {
        id: apiActionData.id,
        name: apiActionData.name,
      },
    ];
  }
  let apiActions: ApiAction[] = [];
  apiActionData.children?.forEach((aad) => {
    const aa = editApiActionDataToApiActions(aad);
    apiActions = [...apiActions, ...aa];
  });
  return apiActions;
};

export const groupedEditApiActionDataToApiAction = (
  groupedApiActions: GroupedEditApiActionData
): ApiAction[] => {
  let apiActions: ApiAction[] = [];
  Object.keys(groupedApiActions).forEach((key) => {
    const aa = editApiActionDataToApiActions(groupedApiActions[key]);
    apiActions = [...apiActions, ...aa];
  });
  return apiActions;
};

export const groupedApiActions: GroupedApiActionData = {
  weigh: {
    name: "Cân đá",
    children: [
      { name: "Thao tác cân đá", id: 0 },
      { name: "Cài đặt kết nối đầu cân", id: 0 },
      { name: "Cài đặt thông số camera", id: 0 },
      { name: "Cài đặt phiếu in", id: 0 },
    ],
  },
  deposit: {
    name: "Sổ nộp tiền",
    children: [
      { name: "Xem sổ nộp tiền", id: 0 },
      { name: "Sửa sổ nộp tiền", id: 0 },
    ],
  },
  transaction: {
    name: "Tách chuyển khoản",
    children: [
      { name: "Xem chuyển khoản", id: 0 },
      { name: "Sửa chuyển khoản", id: 0 },
    ],
  },
  categories: {
    name: "Danh mục",
    children: [
      {
        name: "Khách hàng",
        children: [
          {
            name: "Xem khách hàng",
            id: 0,
          },
          {
            name: "Thêm xoá sửa khách hàng",
            id: 0,
          },
        ],
      },
      {
        name: "Hàng hoá",
        children: [
          {
            name: "Xem hàng hoá",
            id: 0,
          },
          {
            name: "Thêm xoá sửa hàng hoá",
            id: 0,
          },
        ],
      },

      {
        name: "Xe",
        children: [
          {
            name: "Xem xe",
            id: 0,
          },
          {
            name: "Thêm xoá sửa xe",
            id: 0,
          },
        ],
      },
      {
        name: "Máy xay, xe xúc",
        children: [
          {
            name: "Xem máy xay, xe xúc",
            id: 0,
          },
          {
            name: "Thêm xoá sửa máy xay, xe xúc",
            id: 0,
          },
        ],
      },
    ],
  },
};
