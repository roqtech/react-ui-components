/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: notificationsInAppForCurrentUser
// ====================================================

export interface notificationsInAppForCurrentUser_notificationsInAppForCurrentUser_data {
  id: string;
  title: string;
  content: string;
  locale: string;
  createdAt: any;
  read: boolean;
  icon: string;
}

export interface notificationsInAppForCurrentUser_notificationsInAppForCurrentUser {
  totalCount: number;
  data: notificationsInAppForCurrentUser_notificationsInAppForCurrentUser_data[];
}

export interface notificationsInAppForCurrentUser {
  notificationsInAppForCurrentUser: notificationsInAppForCurrentUser_notificationsInAppForCurrentUser;
}

export interface notificationsInAppForCurrentUserVariables {
  limit?: number | null;
  order: NotificationInAppOrderArgType;
  filter?: NotificationInAppFilterArgType | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum NotificationInAppOrderSortEnum {
  content = "content",
  createdAt = "createdAt",
  locale = "locale",
  notificationTypeChannelWebId = "notificationTypeChannelWebId",
  read = "read",
  title = "title",
  updatedAt = "updatedAt",
  userId = "userId",
}

export enum OrderEnum {
  ASC = "ASC",
  DESC = "DESC",
}

export interface BooleanFilterArgType {
  equalTo?: boolean | null;
  notEqualTo?: boolean | null;
}

export interface DateFilterArgType {
  moreThan?: any | null;
  lessThan?: any | null;
  moreThanEqual?: any | null;
  lessThanEqual?: any | null;
  equalTo?: any | null;
  notEqualTo?: any | null;
}

export interface IdFilterArgType {
  equalTo?: string | null;
  notEqualTo?: string | null;
  valueNotIn?: string[] | null;
  valueIn?: string[] | null;
}

export interface NotificationInAppFilterArgType {
  id?: IdFilterArgType | null;
  title?: StringFilterArgType | null;
  content?: StringFilterArgType | null;
  locale?: StringFilterArgType | null;
  read?: BooleanFilterArgType | null;
  userId?: StringFilterArgType | null;
  createdAt?: DateFilterArgType | null;
  notificationTypeChannelWebId?: IdFilterArgType | null;
}

export interface NotificationInAppOrderArgType {
  order: OrderEnum;
  sort: NotificationInAppOrderSortEnum;
}

export interface StringFilterArgType {
  equalTo?: string | null;
  notEqualTo?: string | null;
  valueNotIn?: string[] | null;
  valueIn?: string[] | null;
  like?: string | null;
  iLike?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
