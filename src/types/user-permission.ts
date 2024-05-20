import * as yup from "yup";

export interface UserPermission {
  user_id: number;
  permission_id: number;
}

export interface UserPermissionDetail extends UserPermission {}

export const userPermissionSchema = yup.object().shape({
  user_id: yup.number().required().moreThan(0, "Vui lòng nhập user_id"),
  permission_id: yup
    .number()
    .required()
    .moreThan(0, "Vui lòng nhập permission_id"),
});

export const initialUserPermission: UserPermissionDetail = {
  user_id: 0,
  permission_id: 0,
};

export const userPermissions: UserPermissionDetail[] = [
  { user_id: 10, permission_id: 10 },
  { user_id: 20, permission_id: 20 },
  { user_id: 30, permission_id: 30 },
  { user_id: 40, permission_id: 40 },
  { user_id: 50, permission_id: 50 },
  { user_id: 60, permission_id: 60 },
  { user_id: 70, permission_id: 70 },
  { user_id: 80, permission_id: 80 },
  { user_id: 90, permission_id: 90 },
  { user_id: 100, permission_id: 100 },
  { user_id: 110, permission_id: 110 },
  { user_id: 120, permission_id: 120 },
  { user_id: 130, permission_id: 130 },
  { user_id: 140, permission_id: 140 },
  { user_id: 150, permission_id: 150 },
  { user_id: 160, permission_id: 160 },
  { user_id: 170, permission_id: 170 },
  { user_id: 180, permission_id: 180 },
  { user_id: 190, permission_id: 190 },
  { user_id: 200, permission_id: 200 },
  { user_id: 210, permission_id: 210 },
  { user_id: 220, permission_id: 220 },
  { user_id: 230, permission_id: 230 },
  { user_id: 240, permission_id: 240 },
];
