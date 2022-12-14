import { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JsonObject: any;
};

export type AcceptUserInviteDto = {
  token: Scalars['String'];
};

export type AllTranslationKeyPageModel = {
  __typename?: 'AllTranslationKeyPageModel';
  data: Array<CustomTranslationKeyModel>;
  totalCount: Scalars['Int'];
};

export type BooleanFilterArgType = {
  equalTo?: InputMaybe<Scalars['Boolean']>;
  notEqualTo?: InputMaybe<Scalars['Boolean']>;
};

export type ChannelPreferenceModel = {
  __typename?: 'ChannelPreferenceModel';
  channel: NotificationChannelEnum;
  enabled: Scalars['Boolean'];
};

export type CheckUserInviteTokenModel = {
  __typename?: 'CheckUserInviteTokenModel';
  email?: Maybe<Scalars['String']>;
  isExpired?: Maybe<Scalars['Boolean']>;
  isValid: Scalars['Boolean'];
};

export type ConversationFilterArgType = {
  conversationUserId?: InputMaybe<IdFilterArgType>;
  id?: InputMaybe<IdFilterArgType>;
  isGroup?: InputMaybe<BooleanFilterArgType>;
  messageId?: InputMaybe<IdFilterArgType>;
};

export type ConversationModel = {
  __typename?: 'ConversationModel';
  active: Scalars['Boolean'];
  archived: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  isGroup: Scalars['Boolean'];
  ownerId: Scalars['String'];
  participants: ParticipantPageModel;
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type ConversationOrderArgType = {
  order: OrderEnum;
  sort: ConversationOrderSortEnum;
};

export enum ConversationOrderSortEnum {
  archived = 'archived',
  createdAt = 'createdAt',
  isGroup = 'isGroup',
  title = 'title',
  updatedAt = 'updatedAt'
}

export type ConversationPageModel = {
  __typename?: 'ConversationPageModel';
  data: Array<ConversationModel>;
  totalCount: Scalars['Float'];
};

export type ConversationSearchArgType = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type ConversationUserModel = {
  __typename?: 'ConversationUserModel';
  conversationId: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type CreateUserInviteErrorModel = {
  __typename?: 'CreateUserInviteErrorModel';
  email: Scalars['String'];
  error: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type CreateUserInvitesModel = {
  __typename?: 'CreateUserInvitesModel';
  errors?: Maybe<Array<CreateUserInviteErrorModel>>;
  success?: Maybe<Array<UserInviteModel>>;
};

export type CustomTranslationKeyModel = {
  __typename?: 'CustomTranslationKeyModel';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  key: Scalars['String'];
  translations: TranslationPageModel;
  updatedAt: Scalars['Date'];
};

export type DataImportDto = {
  data: Scalars['JsonObject'];
  flush?: InputMaybe<Scalars['Boolean']>;
};

export type DateFilterArgType = {
  equalTo?: InputMaybe<Scalars['Date']>;
  lessThan?: InputMaybe<Scalars['Date']>;
  lessThanEqual?: InputMaybe<Scalars['Date']>;
  moreThan?: InputMaybe<Scalars['Date']>;
  moreThanEqual?: InputMaybe<Scalars['Date']>;
  notEqualTo?: InputMaybe<Scalars['Date']>;
};

export type DeleteArgType = {
  equalTo?: InputMaybe<Scalars['ID']>;
  valueIn?: InputMaybe<Array<Scalars['ID']>>;
};

export type DeleteFilterArgType = {
  id?: InputMaybe<DeleteArgType>;
};

export type DeleteUserTokenFilterArgType = {
  id?: InputMaybe<DeleteArgType>;
  userId?: InputMaybe<DeleteArgType>;
};

export type DeploymentInfoModel = {
  __typename?: 'DeploymentInfoModel';
  branch: Scalars['String'];
  commit: Scalars['String'];
  timestamp: Scalars['String'];
};

export type EntityNameFilterArgType = {
  equalTo?: InputMaybe<Scalars['String']>;
};

export type EventExampleDataCreateDto = {
  eventData: Scalars['JsonObject'];
  eventType: Scalars['String'];
};

export type EventExampleDataFilterArgType = {
  eventType?: InputMaybe<StringFilterArgType>;
  id?: InputMaybe<IdFilterArgType>;
};

export type EventExampleDataModel = {
  __typename?: 'EventExampleDataModel';
  createdAt: Scalars['Date'];
  eventData: Scalars['JsonObject'];
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type EventExampleDataOrderArgType = {
  order: Scalars['String'];
  sort: Scalars['String'];
};

export type EventExampleDataPageModel = {
  __typename?: 'EventExampleDataPageModel';
  data: Array<EventExampleDataModel>;
  totalCount: Scalars['Float'];
};

export type EventExampleDataSearchArgType = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type EventExampleDataUpdateDto = {
  eventData: Scalars['JsonObject'];
  eventType: Scalars['String'];
};

export type EventRecordCreateDto = {
  count: Scalars['Float'];
  eventType: Scalars['String'];
};

export type EventRecordFilterArgType = {
  id?: InputMaybe<IdFilterArgType>;
};

export type EventRecordModel = {
  __typename?: 'EventRecordModel';
  count: Scalars['Int'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type EventRecordOrderArgType = {
  order: Scalars['String'];
  sort: Scalars['String'];
};

export type EventRecordPageModel = {
  __typename?: 'EventRecordPageModel';
  data: Array<EventRecordModel>;
  totalCount: Scalars['Float'];
};

export type EventRecordSearchArgType = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type EventRecordUpdateDto = {
  count: Scalars['Float'];
  eventType: Scalars['String'];
};

export type EventSubscriberCreateDto = {
  api?: InputMaybe<Scalars['String']>;
  condition?: InputMaybe<Scalars['String']>;
  consumer: Scalars['String'];
  eventType: Scalars['String'];
  key: Scalars['String'];
  parameters?: InputMaybe<Scalars['JsonObject']>;
};

export type EventSubscriberFilterArgType = {
  api?: InputMaybe<StringFilterArgType>;
  condition?: InputMaybe<StringFilterArgType>;
  consumer?: InputMaybe<StringFilterArgType>;
  eventType?: InputMaybe<StringFilterArgType>;
  id?: InputMaybe<IdFilterArgType>;
};

export type EventSubscriberModel = {
  __typename?: 'EventSubscriberModel';
  api?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  consumer: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  parameters?: Maybe<Scalars['JsonObject']>;
  updatedAt: Scalars['Date'];
};

export type EventSubscriberOrderArgType = {
  order: OrderEnum;
  sort: EventSubscriberOrderSortEnum;
};

export enum EventSubscriberOrderSortEnum {
  api = 'api',
  condition = 'condition',
  consumer = 'consumer',
  createdAt = 'createdAt',
  eventType = 'eventType',
  id = 'id',
  parameters = 'parameters',
  updatedAt = 'updatedAt'
}

export type EventSubscriberPageModel = {
  __typename?: 'EventSubscriberPageModel';
  data: Array<EventSubscriberModel>;
  totalCount: Scalars['Float'];
};

export type EventSubscriberSearchArgType = {
  key: EventSubscriberSearchKeyEnum;
  value: Scalars['String'];
};

export enum EventSubscriberSearchKeyEnum {
  consumer = 'consumer',
  eventType = 'eventType'
}

export type EventSubscriberUpdateDto = {
  api?: InputMaybe<Scalars['String']>;
  condition?: InputMaybe<Scalars['String']>;
  consumer: Scalars['String'];
  eventType: Scalars['String'];
  parameters?: InputMaybe<Scalars['JsonObject']>;
};

export type EventTypeCreateDto = {
  eventType: Scalars['String'];
};

export type EventTypeFilterArgType = {
  eventSubscriberId?: InputMaybe<IdFilterArgType>;
  eventType?: InputMaybe<StringFilterArgType>;
  id?: InputMaybe<IdFilterArgType>;
};

export type EventTypeModel = {
  __typename?: 'EventTypeModel';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type EventTypeOrderArgType = {
  order: Scalars['String'];
  sort: Scalars['String'];
};

export type EventTypePageModel = {
  __typename?: 'EventTypePageModel';
  data: Array<EventTypeModel>;
  totalCount: Scalars['Float'];
};

export type EventTypeSearchArgType = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type EventTypeUpdateDto = {
  eventType: Scalars['String'];
};

export type FileAssociationBulkFilterArgType = {
  fileId?: InputMaybe<IdBulkFilterArgType>;
  id?: InputMaybe<IdBulkFilterArgType>;
};

export type FileAssociationCreateDto = {
  entityIdentifier: Scalars['ID'];
  entityName: Scalars['String'];
  fileId: Scalars['ID'];
};

export type FileAssociationFilterArgType = {
  entityIdentifier?: InputMaybe<StringFilterArgType>;
  entityName?: InputMaybe<StringFilterArgType>;
  fileId?: InputMaybe<IdFilterArgType>;
  id?: InputMaybe<IdFilterArgType>;
};

export type FileAssociationModel = {
  __typename?: 'FileAssociationModel';
  createdAt: Scalars['Date'];
  entityIdentifier: Scalars['ID'];
  entityName: Scalars['String'];
  file: FileModel;
  fileId: Scalars['ID'];
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type FileAssociationOptionsCreateDto = {
  entityIdentifier: Scalars['ID'];
  entityName: Scalars['String'];
};

export type FileAssociationOrderArgType = {
  order: OrderEnum;
  sort: FileAssociationOrderSortEnum;
};

export enum FileAssociationOrderSortEnum {
  createdAt = 'createdAt',
  entityIdentifier = 'entityIdentifier',
  entityName = 'entityName',
  updatedAt = 'updatedAt'
}

export type FileAssociationPageModel = {
  __typename?: 'FileAssociationPageModel';
  data: Array<FileAssociationModel>;
  totalCount: Scalars['Int'];
};

export type FileAssociationSearchArgType = {
  key: FileAssociationSearchKeyEnum;
  value: Scalars['String'];
};

export enum FileAssociationSearchKeyEnum {
  entityIdentifier = 'entityIdentifier',
  entityName = 'entityName'
}

export type FileCategoryContentTypeFilterArgType = {
  fileCategoryId?: InputMaybe<IdFilterArgType>;
  group?: InputMaybe<StringFilterArgType>;
  id?: InputMaybe<IdFilterArgType>;
  key?: InputMaybe<StringFilterArgType>;
  name?: InputMaybe<StringFilterArgType>;
};

export enum FileCategoryContentTypeGroupEnum {
  application = 'application',
  audio = 'audio',
  font = 'font',
  image = 'image',
  message = 'message',
  model = 'model',
  multipart = 'multipart',
  other = 'other',
  text = 'text',
  video = 'video'
}

export type FileCategoryContentTypeModel = {
  __typename?: 'FileCategoryContentTypeModel';
  createdAt: Scalars['Date'];
  fileCategories?: Maybe<FileCategoryPageModel>;
  group: FileCategoryContentTypeGroupEnum;
  id: Scalars['ID'];
  key: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
};


export type FileCategoryContentTypeModelfileCategoriesArgs = {
  filter?: InputMaybe<FileCategoryFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<FileCategoryOrderArgType>;
  search?: InputMaybe<FileCategorySearchArgType>;
};

export type FileCategoryContentTypeOrderArgType = {
  order: OrderEnum;
  sort: FileCategoryContentTypeOrderSortEnum;
};

export enum FileCategoryContentTypeOrderSortEnum {
  createdAt = 'createdAt',
  group = 'group',
  key = 'key',
  name = 'name',
  updatedAt = 'updatedAt'
}

export type FileCategoryContentTypePageModel = {
  __typename?: 'FileCategoryContentTypePageModel';
  data: Array<FileCategoryContentTypeModel>;
  totalCount: Scalars['Int'];
};

export type FileCategoryContentTypeSearchArgType = {
  key: FileCategoryContentTypeSearchKeyEnum;
  value: Scalars['String'];
};

export enum FileCategoryContentTypeSearchKeyEnum {
  group = 'group',
  key = 'key',
  name = 'name'
}

export type FileCategoryCreateDto = {
  fileCategoryContentTypeIds?: InputMaybe<Array<Scalars['ID']>>;
  key: Scalars['String'];
  maxSize?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
};

export type FileCategoryFilterArgType = {
  fileCategoryContentTypeId?: InputMaybe<IdFilterArgType>;
  id?: InputMaybe<IdFilterArgType>;
  key?: InputMaybe<StringFilterArgType>;
  maxSize?: InputMaybe<NumberFilterArgType>;
  name?: InputMaybe<StringFilterArgType>;
};

export type FileCategoryModel = {
  __typename?: 'FileCategoryModel';
  createdAt: Scalars['Date'];
  fileCategoryContentTypes?: Maybe<FileCategoryContentTypePageModel>;
  id: Scalars['ID'];
  key: Scalars['String'];
  maxSize?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
};


export type FileCategoryModelfileCategoryContentTypesArgs = {
  filter?: InputMaybe<FileCategoryContentTypeFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<FileCategoryContentTypeOrderArgType>;
  search?: InputMaybe<FileCategoryContentTypeSearchArgType>;
};

export type FileCategoryOrderArgType = {
  order: OrderEnum;
  sort: FileCategoryOrderSortEnum;
};

export enum FileCategoryOrderSortEnum {
  createdAt = 'createdAt',
  key = 'key',
  maxSize = 'maxSize',
  name = 'name',
  updatedAt = 'updatedAt'
}

export type FileCategoryPageModel = {
  __typename?: 'FileCategoryPageModel';
  data: Array<FileCategoryModel>;
  totalCount: Scalars['Int'];
};

export type FileCategorySearchArgType = {
  key: FileCategorySearchKeyEnum;
  value: Scalars['String'];
};

export enum FileCategorySearchKeyEnum {
  key = 'key',
  name = 'name'
}

export type FileCategoryUpdateDto = {
  fileCategoryContentTypeIds?: InputMaybe<Array<Scalars['ID']>>;
  maxSize?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FileCreateDto = {
  contentType: Scalars['String'];
  customMetaData?: InputMaybe<Scalars['JsonObject']>;
  fileAssociationOptions?: InputMaybe<Array<FileAssociationOptionsCreateDto>>;
  fileCategory: Scalars['String'];
  name: Scalars['String'];
};

export type FileFilterArgType = {
  contentType?: InputMaybe<StringFilterArgType>;
  createdAt?: InputMaybe<DateFilterArgType>;
  createdByUserId?: InputMaybe<IdFilterArgType>;
  entityIdentifiers?: InputMaybe<IdFilterArgType>;
  entityName?: InputMaybe<EntityNameFilterArgType>;
  fileCategory?: InputMaybe<StringFilterArgType>;
  id?: InputMaybe<IdFilterArgType>;
  isPublic?: InputMaybe<BooleanFilterArgType>;
  name?: InputMaybe<StringFilterArgType>;
  status?: InputMaybe<StatusFilterArgType>;
  userId?: InputMaybe<IdFilterArgType>;
};

export type FileModel = {
  __typename?: 'FileModel';
  contentType: Scalars['String'];
  createdAt: Scalars['Date'];
  createdByUserId: Scalars['ID'];
  customMetaData?: Maybe<Scalars['JsonObject']>;
  fileAssociations?: Maybe<FileAssociationPageModel>;
  fileCategory: FileCategoryModel;
  fileCategoryId: Scalars['ID'];
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  name: Scalars['String'];
  status: FileStatusEnum;
  updatedAt: Scalars['Date'];
  uploadUrl?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};


export type FileModelfileAssociationsArgs = {
  filter?: InputMaybe<FileAssociationFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<FileAssociationOrderArgType>;
  search?: InputMaybe<FileAssociationSearchArgType>;
};

export type FileOrderArgType = {
  order: OrderEnum;
  sort: FileOrderSortEnum;
};

export enum FileOrderSortEnum {
  contentType = 'contentType',
  createdAt = 'createdAt',
  isPublic = 'isPublic',
  name = 'name',
  status = 'status',
  updatedAt = 'updatedAt'
}

export type FilePageModel = {
  __typename?: 'FilePageModel';
  data: Array<FileModel>;
  totalCount: Scalars['Int'];
};

export type FileSearchArgType = {
  key: FileSearchKeyEnum;
  value: Scalars['String'];
};

export enum FileSearchKeyEnum {
  contentType = 'contentType',
  name = 'name'
}

export enum FileStatusEnum {
  cancelled = 'cancelled',
  error = 'error',
  processing = 'processing',
  ready = 'ready',
  upload_pending = 'upload_pending'
}

export type FileUpdateDto = {
  customMetaData?: InputMaybe<Scalars['JsonObject']>;
  name?: InputMaybe<Scalars['String']>;
};

export type IdBulkFilterArgType = {
  equalTo?: InputMaybe<Scalars['ID']>;
  valueIn?: InputMaybe<Array<Scalars['ID']>>;
};

export type IdFilterArgType = {
  equalTo?: InputMaybe<Scalars['ID']>;
  notEqualTo?: InputMaybe<Scalars['ID']>;
  valueIn?: InputMaybe<Array<Scalars['ID']>>;
  valueNotIn?: InputMaybe<Array<Scalars['ID']>>;
};

export type IntegrationCredentialsDto = {
  accountSid?: InputMaybe<Scalars['String']>;
  apiKey?: InputMaybe<Scalars['String']>;
  applicationId?: InputMaybe<Scalars['String']>;
  clientId?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['String']>;
  host?: InputMaybe<Scalars['String']>;
  messageProfileId?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  port?: InputMaybe<Scalars['String']>;
  projectName?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
  secretKey?: InputMaybe<Scalars['String']>;
  secure?: InputMaybe<Scalars['Boolean']>;
  senderName?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
};

export type IntegrationCredentialsModel = {
  __typename?: 'IntegrationCredentialsModel';
  accountSid?: Maybe<Scalars['String']>;
  apiKey?: Maybe<Scalars['String']>;
  applicationId?: Maybe<Scalars['String']>;
  clientId?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
  host?: Maybe<Scalars['String']>;
  messageProfileId?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['String']>;
  projectName?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  secretKey?: Maybe<Scalars['String']>;
  secure?: Maybe<Scalars['Boolean']>;
  senderName?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type IntegrationDto = {
  active: Scalars['Boolean'];
  channel: Scalars['String'];
  check?: InputMaybe<Scalars['Boolean']>;
  credentials: IntegrationCredentialsDto;
  providerId: Scalars['String'];
};

export type IntegrationModel = {
  __typename?: 'IntegrationModel';
  active: Scalars['Boolean'];
  channel: Scalars['String'];
  createdAt: Scalars['Date'];
  credentials: IntegrationCredentialsModel;
  id: Scalars['ID'];
  providerId: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type IntegrationPageModel = {
  __typename?: 'IntegrationPageModel';
  data: Array<IntegrationModel>;
  totalCount: Scalars['Int'];
};

export type MailNonUserDto = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  locale: Scalars['String'];
};

export type MailRecipientDto = {
  allUsers: Scalars['Boolean'];
  excludedUserIds?: InputMaybe<Array<Scalars['String']>>;
  nonUsers?: InputMaybe<Array<MailNonUserDto>>;
  userGroups?: InputMaybe<MailUserGroupDto>;
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type MailSendDto = {
  directlyInjectedVariables?: InputMaybe<Scalars['String']>;
  entities: Array<MailSendEntitiesDto>;
  /** Unique key of mail type */
  mailType?: InputMaybe<Scalars['String']>;
  recipients: MailRecipientDto;
  subject?: InputMaybe<Scalars['String']>;
};

export type MailSendEntitiesDto = {
  alias?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  uuid: Scalars['String'];
};

export type MailTypeCreateDto = {
  description?: InputMaybe<Scalars['String']>;
  key: Scalars['String'];
};

export type MailTypeFilterArgType = {
  description?: InputMaybe<StringFilterArgType>;
  id?: InputMaybe<IdFilterArgType>;
  key?: InputMaybe<StringFilterArgType>;
  mailTypeLocalizedId?: InputMaybe<IdFilterArgType>;
};

export type MailTypeLocalizedCreateDto = {
  locale: Scalars['String'];
  mailTypeId: Scalars['ID'];
  subject: Scalars['String'];
  template: Scalars['String'];
};

export type MailTypeLocalizedFilterArgType = {
  id?: InputMaybe<IdFilterArgType>;
  locale?: InputMaybe<StringFilterArgType>;
  mailTypeId?: InputMaybe<IdFilterArgType>;
  subject?: InputMaybe<StringFilterArgType>;
};

export type MailTypeLocalizedModel = {
  __typename?: 'MailTypeLocalizedModel';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  locale: Scalars['String'];
  mailType: MailTypeModel;
  mailTypeId: Scalars['ID'];
  subject: Scalars['String'];
  template: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type MailTypeLocalizedOrderArgType = {
  order: OrderEnum;
  sort: MailTypeLocalizedOrderSortEnum;
};

export enum MailTypeLocalizedOrderSortEnum {
  createdAt = 'createdAt',
  locale = 'locale',
  subject = 'subject',
  template = 'template',
  updatedAt = 'updatedAt'
}

export type MailTypeLocalizedPageModel = {
  __typename?: 'MailTypeLocalizedPageModel';
  data: Array<MailTypeLocalizedModel>;
  totalCount: Scalars['Int'];
};

export type MailTypeLocalizedSearchArgType = {
  key: MailTypeLocalizedSearchKeyEnum;
  value: Scalars['String'];
};

export enum MailTypeLocalizedSearchKeyEnum {
  locale = 'locale',
  subject = 'subject',
  template = 'template'
}

export type MailTypeLocalizedUpdateDto = {
  locale?: InputMaybe<Scalars['String']>;
  mailTypeId?: InputMaybe<Scalars['ID']>;
  subject?: InputMaybe<Scalars['String']>;
  template?: InputMaybe<Scalars['String']>;
};

export type MailTypeModel = {
  __typename?: 'MailTypeModel';
  createdAt: Scalars['Date'];
  description: Scalars['String'];
  id: Scalars['ID'];
  key: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type MailTypeOrderArgType = {
  order: OrderEnum;
  sort: MailTypeOrderSortEnum;
};

export enum MailTypeOrderSortEnum {
  createdAt = 'createdAt',
  description = 'description',
  key = 'key',
  updatedAt = 'updatedAt'
}

export type MailTypePageModel = {
  __typename?: 'MailTypePageModel';
  data: Array<MailTypeModel>;
  totalCount: Scalars['Int'];
};

export type MailTypeSearchArgType = {
  key: MailTypeSearchKeyEnum;
  value: Scalars['String'];
};

export enum MailTypeSearchKeyEnum {
  description = 'description',
  key = 'key'
}

export type MailTypeUpdateDto = {
  description?: InputMaybe<Scalars['String']>;
};

export type MailUserGroupDto = {
  operator: MailUserGroupOperatorEnum;
  userGroupIds?: InputMaybe<Array<Scalars['String']>>;
};

export enum MailUserGroupOperatorEnum {
  AND = 'AND',
  OR = 'OR'
}

export type MessageModel = {
  __typename?: 'MessageModel';
  body: Scalars['String'];
  bodyUpdatedAt: Scalars['Date'];
  conversation: ConversationModel;
  conversationId: Scalars['String'];
  conversationUser: ConversationUserModel;
  conversationUserId: Scalars['String'];
  createdAt: Scalars['Date'];
  deletedAt: Scalars['Date'];
  id: Scalars['ID'];
  messageStatus?: Maybe<MessageStatusModel>;
  messageStatusId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type MessageStatusModel = {
  __typename?: 'MessageStatusModel';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  message: MessageModel;
  messageId: Scalars['String'];
  notified?: Maybe<Scalars['Boolean']>;
  read: Scalars['Boolean'];
  updatedAt: Scalars['Date'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptUserInvite: UserInviteModel;
  cancelUserInvite: UserInviteModel;
  createFileAssociation: FileAssociationModel;
  createFileUploadUrl: FileModel;
  createNotification: NotificationCreateModel;
  createNotificationCategory: NotificationCategoryModel;
  createNotificationSubscriber: NotificationSubscriberModel;
  createPermission: PermissionModel;
  createRole: RoleModel;
  createUser: UserModel;
  createUserGroup: UserGroupModel;
  /** Create Single UserInvite */
  createUserInvite: UserInviteModel;
  /** Create multiple UserInvites */
  createUserInvites: CreateUserInvitesModel;
  createUserProvider: UserProviderModel;
  createUserRefreshToken: UserTokenModel;
  createUserResetPasswordToken: UserTokenModel;
  createUserToken: UserTokenModel;
  createUserValidateEmailToken: UserTokenModel;
  deleteConversation: Array<Scalars['ID']>;
  deleteConversationUser: Array<Scalars['ID']>;
  deleteFileAssociation: Scalars['ID'];
  deleteFileAssociations: Array<Scalars['String']>;
  deleteFiles: Array<Scalars['String']>;
  deleteMessage: Array<Scalars['ID']>;
  deleteMessageStatus: Array<Scalars['ID']>;
  deletePermissions: Array<Scalars['ID']>;
  deleteRoles: Array<Scalars['ID']>;
  deleteUserTokens: Array<Scalars['ID']>;
  makeFilePrivate: FileModel;
  makeFilePublic: FileModel;
  markMessageActionSeen: NotificationActivityModel;
  markMessageSeen: NotificationActivityModel;
  relateRolesToUser: Scalars['Boolean'];
  relateRolesToUserGroup: Scalars['Boolean'];
  relateUserGroupsToRole: Scalars['Boolean'];
  relateUserGroupsToUser: Scalars['Boolean'];
  relateUsersToRole: Scalars['Boolean'];
  relateUsersToUserGroup: Scalars['Boolean'];
  resendUserInvite: UserInviteModel;
  rotateRefreshToken: UserTokenModel;
  sendMail: Scalars['Boolean'];
  /** Create UserInvite and send email */
  sendUserInvites: CreateUserInvitesModel;
  syncEventSubscribers: Scalars['Boolean'];
  unrelateRolesFromUser: Scalars['Boolean'];
  unrelateRolesFromUserGroup: Scalars['Boolean'];
  unrelateUserGroupsFromRole: Scalars['Boolean'];
  unrelateUserGroupsFromUser: Scalars['Boolean'];
  unrelateUsersFromRole: Scalars['Boolean'];
  unrelateUsersFromUserGroup: Scalars['Boolean'];
  updateFile: FileModel;
  updateFileStatus: FileModel;
  updateNotificationPreference: NotificationPreferenceModel;
  updatePermission: PermissionModel;
  updateRole: RoleModel;
  updateUser: UserModel;
  updateUserGroup: UserGroupModel;
  updateUserGroupRoles: Array<Scalars['ID']>;
  updateUserInvite: UserInviteModel;
  updateUserRoles: Array<Scalars['ID']>;
  verifyUserRefreshToken: UserTokenModel;
};


export type MutationacceptUserInviteArgs = {
  acceptUserInvite: AcceptUserInviteDto;
};


export type MutationcancelUserInviteArgs = {
  id: Scalars['ID'];
};


export type MutationcreateFileAssociationArgs = {
  createFileAssociationDto: FileAssociationCreateDto;
};


export type MutationcreateFileUploadUrlArgs = {
  createFileDto: FileCreateDto;
};


export type MutationcreateNotificationArgs = {
  notification: NotificationCreateDto;
};


export type MutationcreateNotificationCategoryArgs = {
  name: Scalars['String'];
};


export type MutationcreateNotificationSubscriberArgs = {
  subscriberInput: NotificationSubscriberCreateDto;
};


export type MutationcreatePermissionArgs = {
  permission: PermissionCreateDto;
};


export type MutationcreateRoleArgs = {
  role: RoleCreateDto;
};


export type MutationcreateUserArgs = {
  user: UserCreateDto;
};


export type MutationcreateUserGroupArgs = {
  userGroup: UserGroupCreateDto;
};


export type MutationcreateUserInviteArgs = {
  userInvite: UserInviteCreateDto;
};


export type MutationcreateUserInvitesArgs = {
  userInvites: UserInvitesCreateDto;
};


export type MutationcreateUserProviderArgs = {
  userProvider: UserProviderCreateDto;
};


export type MutationcreateUserRefreshTokenArgs = {
  userToken: UserRefreshTokenCreateDto;
};


export type MutationcreateUserResetPasswordTokenArgs = {
  userToken: UserResetPasswordTokenCreateDto;
};


export type MutationcreateUserTokenArgs = {
  userToken: UserTokenCreateDto;
};


export type MutationcreateUserValidateEmailTokenArgs = {
  userToken: UserValidateEmailTokenCreateDto;
};


export type MutationdeleteConversationArgs = {
  filter?: InputMaybe<DeleteFilterArgType>;
};


export type MutationdeleteConversationUserArgs = {
  filter?: InputMaybe<DeleteFilterArgType>;
};


export type MutationdeleteFileAssociationArgs = {
  id: Scalars['ID'];
};


export type MutationdeleteFileAssociationsArgs = {
  filter: FileAssociationBulkFilterArgType;
};


export type MutationdeleteFilesArgs = {
  filter?: InputMaybe<DeleteFilterArgType>;
};


export type MutationdeleteMessageArgs = {
  filter?: InputMaybe<DeleteFilterArgType>;
};


export type MutationdeleteMessageStatusArgs = {
  filter?: InputMaybe<DeleteFilterArgType>;
};


export type MutationdeletePermissionsArgs = {
  filter?: InputMaybe<DeleteFilterArgType>;
};


export type MutationdeleteRolesArgs = {
  filter?: InputMaybe<DeleteFilterArgType>;
};


export type MutationdeleteUserTokensArgs = {
  filter?: InputMaybe<DeleteUserTokenFilterArgType>;
};


export type MutationmakeFilePrivateArgs = {
  fileId: Scalars['ID'];
};


export type MutationmakeFilePublicArgs = {
  fileId: Scalars['ID'];
};


export type MutationmarkMessageActionSeenArgs = {
  messageId: Scalars['String'];
  type: NotificationActionTypeEnum;
};


export type MutationmarkMessageSeenArgs = {
  messageId: Scalars['String'];
};


export type MutationrelateRolesToUserArgs = {
  id: Scalars['ID'];
  relation: UserRoleRelationDto;
};


export type MutationrelateRolesToUserGroupArgs = {
  id: Scalars['ID'];
  relation: UserGroupRoleRelationDto;
};


export type MutationrelateUserGroupsToRoleArgs = {
  id: Scalars['ID'];
  relation: RoleUserGroupRelationDto;
};


export type MutationrelateUserGroupsToUserArgs = {
  id: Scalars['ID'];
  relation: UserUserGroupRelationDto;
};


export type MutationrelateUsersToRoleArgs = {
  id: Scalars['ID'];
  relation: RoleUserRelationDto;
};


export type MutationrelateUsersToUserGroupArgs = {
  id: Scalars['ID'];
  relation: UserGroupUserRelationDto;
};


export type MutationresendUserInviteArgs = {
  id: Scalars['ID'];
};


export type MutationrotateRefreshTokenArgs = {
  userToken: UserRefreshTokenVerifyDto;
};


export type MutationsendMailArgs = {
  params: MailSendDto;
};


export type MutationsendUserInvitesArgs = {
  userInvites: UserInvitesCreateDto;
};


export type MutationsyncEventSubscribersArgs = {
  eventSubscribers: Array<EventSubscriberCreateDto>;
};


export type MutationunrelateRolesFromUserArgs = {
  id: Scalars['ID'];
  relation: UserRoleRelationDto;
};


export type MutationunrelateRolesFromUserGroupArgs = {
  id: Scalars['ID'];
  relation: UserGroupRoleRelationDto;
};


export type MutationunrelateUserGroupsFromRoleArgs = {
  id: Scalars['ID'];
  relation: RoleUserGroupRelationDto;
};


export type MutationunrelateUserGroupsFromUserArgs = {
  id: Scalars['ID'];
  relation: UserUserGroupRelationDto;
};


export type MutationunrelateUsersFromRoleArgs = {
  id: Scalars['ID'];
  relation: RoleUserRelationDto;
};


export type MutationunrelateUsersFromUserGroupArgs = {
  id: Scalars['ID'];
  relation: UserGroupUserRelationDto;
};


export type MutationupdateFileArgs = {
  fileId: Scalars['ID'];
  updateFileDto: FileUpdateDto;
};


export type MutationupdateFileStatusArgs = {
  fileId: Scalars['ID'];
  status: FileStatusEnum;
};


export type MutationupdateNotificationPreferenceArgs = {
  preference: UpdateNotificationPreferenceDto;
};


export type MutationupdatePermissionArgs = {
  id: Scalars['ID'];
  permission: PermissionUpdateDto;
};


export type MutationupdateRoleArgs = {
  id: Scalars['ID'];
  role: RoleUpdateDto;
};


export type MutationupdateUserArgs = {
  id: Scalars['ID'];
  user: UserUpdateDto;
};


export type MutationupdateUserGroupArgs = {
  id: Scalars['ID'];
  userGroup: UserGroupUpdateDto;
};


export type MutationupdateUserGroupRolesArgs = {
  id: Scalars['ID'];
  relation: UserGroupRoleRelationDto;
};


export type MutationupdateUserInviteArgs = {
  id: Scalars['ID'];
  userInvite: UserInviteUpdateDto;
};


export type MutationupdateUserRolesArgs = {
  id: Scalars['ID'];
  relation: UserRoleRelationDto;
};


export type MutationverifyUserRefreshTokenArgs = {
  userToken: UserRefreshTokenVerifyDto;
};

export enum NotificationActionTypeEnum {
  clicked = 'clicked',
  primary = 'primary',
  secondary = 'secondary'
}

export type NotificationActivityModel = {
  __typename?: 'NotificationActivityModel';
  channel: NotificationChannelEnum;
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  cta?: Maybe<NotificationCTAModel>;
  deviceTokens?: Maybe<Array<Scalars['String']>>;
  directWebhookUrl?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  errorId?: Maybe<Scalars['String']>;
  errorText?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastSeenDate?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  providerId?: Maybe<Scalars['String']>;
  seen: Scalars['Boolean'];
  status: NotificationStatusEnum;
  subject?: Maybe<Scalars['String']>;
  subscriber: NotificationSubscriberModel;
  template: NotificationTemplateModel;
  templateIdentifier: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  transactionId: Scalars['String'];
};

export type NotificationActivityPageModel = {
  __typename?: 'NotificationActivityPageModel';
  data: Array<NotificationActivityModel>;
  totalCount: Scalars['Int'];
};

export type NotificationCTAActionButtonModel = {
  __typename?: 'NotificationCTAActionButtonModel';
  content?: Maybe<Scalars['String']>;
  resultContent?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type NotificationCTAActionModel = {
  __typename?: 'NotificationCTAActionModel';
  buttons?: Maybe<NotificationCTAActionButtonModel>;
  result?: Maybe<NotificationCTAActionResultModel>;
  status?: Maybe<NotificationActionTypeEnum>;
};

export type NotificationCTAActionResultModel = {
  __typename?: 'NotificationCTAActionResultModel';
  payload?: Maybe<Scalars['JsonObject']>;
  type?: Maybe<NotificationActionTypeEnum>;
};

export type NotificationCTADataModel = {
  __typename?: 'NotificationCTADataModel';
  url?: Maybe<Scalars['String']>;
};

export type NotificationCTAModel = {
  __typename?: 'NotificationCTAModel';
  action?: Maybe<NotificationCTAActionModel>;
  data?: Maybe<NotificationCTADataModel>;
  type?: Maybe<Scalars['String']>;
};

export type NotificationCategoryModel = {
  __typename?: 'NotificationCategoryModel';
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum NotificationChannelEnum {
  Chat = 'chat',
  Email = 'email',
  InApp = 'inApp',
  Push = 'push',
  Sms = 'sms'
}

export type NotificationChannelModel = {
  __typename?: 'NotificationChannelModel';
  providerId: NotificationChannelEnum;
};

export type NotificationCreateDto = {
  entities: Array<NotificationEntitiesCreateDto>;
  key: Scalars['String'];
  payload?: InputMaybe<Scalars['String']>;
  recipients: NotificationRecipientDto;
};

export type NotificationCreateModel = {
  __typename?: 'NotificationCreateModel';
  webNotifications?: Maybe<Scalars['Boolean']>;
};

export type NotificationEntitiesCreateDto = {
  alias?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  uuid: Scalars['ID'];
};

export type NotificationInAppModel = {
  __typename?: 'NotificationInAppModel';
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  icon: Scalars['String'];
  id: Scalars['ID'];
  locale: Scalars['String'];
  notificationTypeChannelWebId: Scalars['String'];
  read: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type NotificationLocalizedTemplateCreateDto = {
  channel: NotificationChannelEnum;
  content: Scalars['String'];
  key: Scalars['String'];
  locale: Scalars['String'];
  subject?: InputMaybe<Scalars['String']>;
  templateId: Scalars['String'];
};

export type NotificationLocalizedTemplateFilterArgType = {
  channel?: InputMaybe<StringFilterArgType>;
  content?: InputMaybe<StringFilterArgType>;
  id?: InputMaybe<IdFilterArgType>;
  key?: InputMaybe<StringFilterArgType>;
  locale?: InputMaybe<StringFilterArgType>;
  subject?: InputMaybe<StringFilterArgType>;
  templateId?: InputMaybe<StringFilterArgType>;
};

export type NotificationLocalizedTemplateModel = {
  __typename?: 'NotificationLocalizedTemplateModel';
  channel?: Maybe<NotificationChannelEnum>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  key?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  templateId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type NotificationLocalizedTemplateOrderArgType = {
  order: OrderEnum;
  sort: NotificationLocalizedTemplateOrderSortEnum;
};

export enum NotificationLocalizedTemplateOrderSortEnum {
  channel = 'channel',
  content = 'content',
  createdAt = 'createdAt',
  key = 'key',
  locale = 'locale',
  updatedAt = 'updatedAt'
}

export type NotificationLocalizedTemplatePageModel = {
  __typename?: 'NotificationLocalizedTemplatePageModel';
  data: Array<NotificationLocalizedTemplateModel>;
  totalCount: Scalars['Int'];
};

export type NotificationLocalizedTemplateSearchArgType = {
  key: NotificationLocalizedTemplateSearchKeyEnum;
  value: Scalars['String'];
};

export enum NotificationLocalizedTemplateSearchKeyEnum {
  key = 'key'
}

export type NotificationLocalizedTemplateUpdateDto = {
  content?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  templateId?: InputMaybe<Scalars['String']>;
};

export type NotificationModel = {
  __typename?: 'NotificationModel';
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  icon: Scalars['String'];
  id: Scalars['ID'];
  locale: Scalars['String'];
  notificationTypeChannelWeb?: Maybe<NotificationTypeChannelWebModel>;
  notificationTypeChannelWebId?: Maybe<Scalars['ID']>;
  read: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: NotifiedUserModel;
  userId: Scalars['String'];
};

export type NotificationPreferenceModel = {
  __typename?: 'NotificationPreferenceModel';
  channelPreferences: Array<ChannelPreferenceModel>;
  critical: Scalars['Boolean'];
  enabled: Scalars['Boolean'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type NotificationRecipientDto = {
  allUsers: Scalars['Boolean'];
  excludedUserIds?: InputMaybe<Array<Scalars['String']>>;
  userGroups?: InputMaybe<NotificationUserGroupDto>;
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export enum NotificationStatusEnum {
  error = 'error',
  sent = 'sent',
  warning = 'warning'
}

export type NotificationSubscriberCreateDto = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  subscriberId: Scalars['ID'];
};

export type NotificationSubscriberModel = {
  __typename?: 'NotificationSubscriberModel';
  avatar?: Maybe<Scalars['String']>;
  channels?: Maybe<Array<NotificationChannelModel>>;
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  subscriberId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type NotificationSubscriberPageModel = {
  __typename?: 'NotificationSubscriberPageModel';
  data: Array<NotificationSubscriberModel>;
  totalCount: Scalars['Int'];
};

export type NotificationTemplateCreateDto = {
  active: Scalars['Boolean'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  notificationGroupId: Scalars['ID'];
};

export type NotificationTemplateModel = {
  __typename?: 'NotificationTemplateModel';
  active: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  notificationGroup?: Maybe<NotificationCategoryModel>;
  preferenceSettings?: Maybe<NotificationTemplatePreferenceModel>;
  steps?: Maybe<Array<NotificationTemplateStepModel>>;
  triggers?: Maybe<Array<NotificationTemplateTriggerModel>>;
  updatedAt: Scalars['Date'];
};

export type NotificationTemplatePageModel = {
  __typename?: 'NotificationTemplatePageModel';
  data: Array<NotificationTemplateModel>;
  totalCount: Scalars['Int'];
};

export type NotificationTemplatePreferenceModel = {
  __typename?: 'NotificationTemplatePreferenceModel';
  chat?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['Boolean']>;
  in_app?: Maybe<Scalars['Boolean']>;
  push?: Maybe<Scalars['Boolean']>;
  sms?: Maybe<Scalars['Boolean']>;
};

export type NotificationTemplatePreferenceUpdateDto = {
  chat?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['Boolean']>;
  in_app?: InputMaybe<Scalars['Boolean']>;
  push?: InputMaybe<Scalars['Boolean']>;
  sms?: InputMaybe<Scalars['Boolean']>;
};

export type NotificationTemplateStepModel = {
  __typename?: 'NotificationTemplateStepModel';
  active?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  template?: Maybe<NotificationTemplateStepTemplateModel>;
};

export type NotificationTemplateStepTemplateModel = {
  __typename?: 'NotificationTemplateStepTemplateModel';
  active?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
};

export type NotificationTemplateStepUpdateDto = {
  active?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type NotificationTemplateTriggerModel = {
  __typename?: 'NotificationTemplateTriggerModel';
  identifier: Scalars['String'];
  subscriberVariables: Array<NotificationTriggerVariableModel>;
  type: Scalars['String'];
  variables: Array<NotificationTriggerVariableModel>;
};

export type NotificationTemplateUpdateDto = {
  active?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notificationGroupId?: InputMaybe<Scalars['ID']>;
  preferenceSettings?: InputMaybe<NotificationTemplatePreferenceUpdateDto>;
  steps?: InputMaybe<Array<NotificationTemplateStepUpdateDto>>;
};

export type NotificationTriggerVariableModel = {
  __typename?: 'NotificationTriggerVariableModel';
  name: Scalars['String'];
};

export type NotificationTypeCategoryModel = {
  __typename?: 'NotificationTypeCategoryModel';
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  key: Scalars['String'];
  notificationTypes: NotificationTypePageModel;
  updatedAt: Scalars['Date'];
};

export type NotificationTypeChannelMailModel = {
  __typename?: 'NotificationTypeChannelMailModel';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  key: Scalars['String'];
  mailTypeId: Scalars['String'];
  notificationType: NotificationTypeModel;
  notificationTypeId: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type NotificationTypeChannelWebLocalizedModel = {
  __typename?: 'NotificationTypeChannelWebLocalizedModel';
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  icon: Scalars['String'];
  id: Scalars['ID'];
  key: Scalars['String'];
  locale: Scalars['String'];
  notificationTypeChannelWeb: NotificationTypeChannelWebModel;
  notificationTypeChannelWebId: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type NotificationTypeChannelWebLocalizedPageModel = {
  __typename?: 'NotificationTypeChannelWebLocalizedPageModel';
  data: Array<NotificationTypeChannelWebLocalizedModel>;
  totalCount: Scalars['Int'];
};

export type NotificationTypeChannelWebModel = {
  __typename?: 'NotificationTypeChannelWebModel';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  key: Scalars['String'];
  notificationType: NotificationTypeModel;
  notificationTypeChannelWebLocalizeds: NotificationTypeChannelWebLocalizedPageModel;
  notificationTypeId: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type NotificationTypeModel = {
  __typename?: 'NotificationTypeModel';
  createdAt: Scalars['Date'];
  defaultUserActiveMail: Scalars['Boolean'];
  defaultUserActiveWeb: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  key: Scalars['String'];
  notificationTypeCategory?: Maybe<NotificationTypeCategoryModel>;
  notificationTypeCategoryId?: Maybe<Scalars['ID']>;
  notificationTypeChannelMail?: Maybe<NotificationTypeChannelMailModel>;
  notificationTypeChannelMailId?: Maybe<Scalars['ID']>;
  notificationTypeChannelWeb?: Maybe<NotificationTypeChannelWebModel>;
  notificationTypeChannelWebId?: Maybe<Scalars['ID']>;
  notificationTypeUserPreferences: NotificationTypeUserPreferencePageModel;
  updatedAt: Scalars['Date'];
};

export type NotificationTypePageModel = {
  __typename?: 'NotificationTypePageModel';
  data: Array<NotificationTypeModel>;
  totalCount: Scalars['Int'];
};

export type NotificationTypeUserPreferenceModel = {
  __typename?: 'NotificationTypeUserPreferenceModel';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  key?: Maybe<Scalars['String']>;
  mail: Scalars['Boolean'];
  notificationType: NotificationTypeModel;
  notificationTypeId: Scalars['ID'];
  updatedAt: Scalars['Date'];
  userId: Scalars['ID'];
  web: Scalars['Boolean'];
};

export type NotificationTypeUserPreferencePageModel = {
  __typename?: 'NotificationTypeUserPreferencePageModel';
  data: Array<NotificationTypeUserPreferenceModel>;
  totalCount: Scalars['Int'];
};

export type NotificationUserGroupDto = {
  operator: NotificationUserGroupOperatorEnum;
  userGroupIds?: InputMaybe<Array<Scalars['String']>>;
};

export enum NotificationUserGroupOperatorEnum {
  AND = 'AND',
  OR = 'OR'
}

export type NotifiedUserModel = {
  __typename?: 'NotifiedUserModel';
  active?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  optedInAt?: Maybe<Scalars['Date']>;
  phone?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type NumberFilterArgType = {
  equalTo?: InputMaybe<Scalars['Float']>;
  lessThan?: InputMaybe<Scalars['Float']>;
  lessThanEqual?: InputMaybe<Scalars['Float']>;
  moreThan?: InputMaybe<Scalars['Float']>;
  moreThanEqual?: InputMaybe<Scalars['Float']>;
  notEqualTo?: InputMaybe<Scalars['Float']>;
  valueIn?: InputMaybe<Array<Scalars['Float']>>;
  valueNotIn?: InputMaybe<Array<Scalars['Float']>>;
};

export enum OrderEnum {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type ParticipantModel = {
  __typename?: 'ParticipantModel';
  active: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  isOwner: Scalars['Boolean'];
  lastName: Scalars['String'];
  locale: Scalars['String'];
  optedInAt: Scalars['Date'];
  phone: Scalars['String'];
  timezone: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type ParticipantPageModel = {
  __typename?: 'ParticipantPageModel';
  data: Array<ParticipantModel>;
  totalCount: Scalars['Float'];
};

export type PermissionCreateDto = {
  key: Scalars['String'];
  resolverMapping: Scalars['String'];
  roleId: Scalars['ID'];
  scope: PermissionScopeEnum;
  userGroupType?: InputMaybe<Scalars['String']>;
};

export type PermissionFilterArgType = {
  id?: InputMaybe<IdFilterArgType>;
  key?: InputMaybe<StringFilterArgType>;
  resolverMapping?: InputMaybe<StringFilterArgType>;
  roleId?: InputMaybe<IdFilterArgType>;
  scope?: InputMaybe<StringFilterArgType>;
  userGroupType?: InputMaybe<StringFilterArgType>;
};

export type PermissionModel = {
  __typename?: 'PermissionModel';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  key: Scalars['String'];
  role: RoleModel;
  roleId: Scalars['ID'];
  scope: PermissionScopeEnum;
  updatedAt: Scalars['Date'];
  userGroupType?: Maybe<Scalars['String']>;
};

export type PermissionOrderArgType = {
  order: OrderEnum;
  sort: PermissionOrderSortEnum;
};

export enum PermissionOrderSortEnum {
  createdAt = 'createdAt',
  key = 'key',
  resolverMapping = 'resolverMapping',
  scope = 'scope',
  updatedAt = 'updatedAt',
  userGroupType = 'userGroupType'
}

export type PermissionPageModel = {
  __typename?: 'PermissionPageModel';
  data: Array<PermissionModel>;
  totalCount: Scalars['Int'];
};

export enum PermissionScopeEnum {
  all = 'all',
  own = 'own',
  userGroup = 'userGroup'
}

export type PermissionSearchArgType = {
  key: PermissionSearchKeyEnum;
  value: Scalars['String'];
};

export enum PermissionSearchKeyEnum {
  key = 'key',
  resolverMapping = 'resolverMapping',
  userGroupType = 'userGroupType'
}

export type PermissionUpdateDto = {
  resolverMapping?: InputMaybe<Scalars['String']>;
  roleId: Scalars['ID'];
  scope?: InputMaybe<PermissionScopeEnum>;
  userGroupType?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allTranslationKeys: AllTranslationKeyPageModel;
  checkUserInviteToken: CheckUserInviteTokenModel;
  checkUserToken: CheckUserInviteTokenModel;
  conversations: ConversationPageModel;
  file: FileModel;
  fileCategories: FileCategoryPageModel;
  fileCategory: FileCategoryModel;
  fileCategoryContentType: FileCategoryContentTypeModel;
  fileCategoryContentTypes: FileCategoryContentTypePageModel;
  files: FilePageModel;
  mailType: MailTypeModel;
  notificationCategories: Array<NotificationCategoryModel>;
  notificationFeed: NotificationActivityPageModel;
  notificationLocalizedTemplates: NotificationLocalizedTemplatePageModel;
  notificationPreferences: Array<NotificationPreferenceModel>;
  notificationSubscriberToken: Scalars['String'];
  notificationSubscribers?: Maybe<NotificationSubscriberPageModel>;
  permission: PermissionModel;
  permissions: PermissionPageModel;
  role: RoleModel;
  roles: RolePageModel;
  subscriberUnseenCount: Scalars['Float'];
  translation: TranslationModel;
  translationKey: TranslationKeyModel;
  translationKeys: TranslationKeyPageModel;
  translations: TranslationPageModel;
  user: UserModel;
  userGroup: UserGroupModel;
  userGroups: UserGroupPageModel;
  userInvite: UserInviteModel;
  userInvites: UserInvitePageModel;
  userProvider: UserProviderModel;
  userProviders: UserProviderPageModel;
  userToken: UserTokenModel;
  userTokens: UserTokenPageModel;
  users: UserPageModel;
};


export type QuerycheckUserInviteTokenArgs = {
  token: Scalars['String'];
};


export type QuerycheckUserTokenArgs = {
  token: Scalars['String'];
  type: Scalars['String'];
};


export type QueryconversationsArgs = {
  filter?: InputMaybe<ConversationFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<ConversationOrderArgType>;
  search?: InputMaybe<ConversationSearchArgType>;
};


export type QueryfileArgs = {
  fileId: Scalars['ID'];
};


export type QueryfileCategoriesArgs = {
  filter?: InputMaybe<FileCategoryFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<FileCategoryOrderArgType>;
  search?: InputMaybe<FileCategorySearchArgType>;
};


export type QueryfileCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryfileCategoryContentTypeArgs = {
  id: Scalars['ID'];
};


export type QueryfileCategoryContentTypesArgs = {
  filter?: InputMaybe<FileCategoryContentTypeFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<FileCategoryContentTypeOrderArgType>;
  search?: InputMaybe<FileCategoryContentTypeSearchArgType>;
};


export type QueryfilesArgs = {
  filter?: InputMaybe<FileFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<FileOrderArgType>;
  search?: InputMaybe<FileSearchArgType>;
};


export type QuerymailTypeArgs = {
  id: Scalars['ID'];
};


export type QuerynotificationFeedArgs = {
  page?: InputMaybe<Scalars['Float']>;
};


export type QuerynotificationLocalizedTemplatesArgs = {
  filter?: InputMaybe<NotificationLocalizedTemplateFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<NotificationLocalizedTemplateOrderArgType>;
  search?: InputMaybe<NotificationLocalizedTemplateSearchArgType>;
};


export type QuerynotificationSubscribersArgs = {
  page?: InputMaybe<Scalars['Float']>;
};


export type QuerypermissionArgs = {
  id: Scalars['ID'];
};


export type QuerypermissionsArgs = {
  filter?: InputMaybe<PermissionFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<PermissionOrderArgType>;
  search?: InputMaybe<PermissionSearchArgType>;
};


export type QueryroleArgs = {
  id: Scalars['ID'];
};


export type QueryrolesArgs = {
  filter?: InputMaybe<RoleFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<RoleOrderArgType>;
  search?: InputMaybe<RoleSearchArgType>;
};


export type QuerytranslationArgs = {
  id: Scalars['ID'];
};


export type QuerytranslationKeyArgs = {
  id: Scalars['ID'];
};


export type QuerytranslationKeysArgs = {
  filter?: InputMaybe<TranslationKeyFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<TranslationKeyOrderArgType>;
  search?: InputMaybe<TranslationKeySearchArgType>;
  searchTerm?: InputMaybe<Scalars['String']>;
};


export type QuerytranslationsArgs = {
  filter?: InputMaybe<TranslationFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<TranslationOrderArgType>;
  search?: InputMaybe<TranslationSearchArgType>;
};


export type QueryuserArgs = {
  id: Scalars['ID'];
};


export type QueryuserGroupArgs = {
  id: Scalars['ID'];
};


export type QueryuserGroupsArgs = {
  filter?: InputMaybe<UserGroupFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserGroupOrderArgType>;
  search?: InputMaybe<UserGroupSearchArgType>;
};


export type QueryuserInviteArgs = {
  id: Scalars['ID'];
};


export type QueryuserInvitesArgs = {
  filter?: InputMaybe<UserInviteFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserInviteOrderArgType>;
  search?: InputMaybe<UserInviteSearchArgType>;
};


export type QueryuserProviderArgs = {
  id: Scalars['ID'];
};


export type QueryuserProvidersArgs = {
  filter?: InputMaybe<UserProviderFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserProviderOrderArgType>;
  search?: InputMaybe<UserProviderSearchArgType>;
};


export type QueryuserTokenArgs = {
  id: Scalars['ID'];
};


export type QueryuserTokensArgs = {
  filter?: InputMaybe<UserTokenFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserTokenOrderArgType>;
  search?: InputMaybe<UserTokenSearchArgType>;
};


export type QueryusersArgs = {
  filter?: InputMaybe<UserFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserOrderArgType>;
  search?: InputMaybe<UserSearchArgType>;
};

export type ResolverMappingModel = {
  __typename?: 'ResolverMappingModel';
  isCreate: Scalars['Boolean'];
  isDelete: Scalars['Boolean'];
  isRead: Scalars['Boolean'];
  isUpdate: Scalars['Boolean'];
  name: Scalars['String'];
  object: Scalars['String'];
  operation: Scalars['String'];
  resolvers: Array<Scalars['String']>;
  service: Scalars['String'];
};

export type RoleCreateDto = {
  description?: InputMaybe<Scalars['String']>;
  isSystemManaged: Scalars['Boolean'];
  key: Scalars['String'];
  name: Scalars['String'];
  permissionAssignments: Array<RolePermissionAssignDto>;
};

export type RoleFilterArgType = {
  description?: InputMaybe<StringFilterArgType>;
  id?: InputMaybe<IdFilterArgType>;
  isSystemManaged?: InputMaybe<BooleanFilterArgType>;
  key?: InputMaybe<StringFilterArgType>;
  name?: InputMaybe<StringFilterArgType>;
  permissionId?: InputMaybe<IdFilterArgType>;
  userGroupId?: InputMaybe<IdFilterArgType>;
  userId?: InputMaybe<IdFilterArgType>;
};

export type RoleModel = {
  __typename?: 'RoleModel';
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isSystemManaged: Scalars['Boolean'];
  key: Scalars['String'];
  name: Scalars['String'];
  permissionAssignments: PermissionPageModel;
  updatedAt: Scalars['Date'];
  userGroups: UserGroupPageModel;
  users: UserPageModel;
};


export type RoleModelpermissionAssignmentsArgs = {
  filter?: InputMaybe<PermissionFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<PermissionOrderArgType>;
  search?: InputMaybe<PermissionSearchArgType>;
};


export type RoleModeluserGroupsArgs = {
  filter?: InputMaybe<UserGroupFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserGroupOrderArgType>;
  search?: InputMaybe<UserGroupSearchArgType>;
};


export type RoleModelusersArgs = {
  filter?: InputMaybe<UserFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserOrderArgType>;
  search?: InputMaybe<UserSearchArgType>;
};

export type RoleOrderArgType = {
  order: OrderEnum;
  sort: RoleOrderSortEnum;
};

export enum RoleOrderSortEnum {
  createdAt = 'createdAt',
  description = 'description',
  id = 'id',
  isSystemManaged = 'isSystemManaged',
  key = 'key',
  name = 'name',
  updatedAt = 'updatedAt'
}

export type RolePageModel = {
  __typename?: 'RolePageModel';
  data: Array<RoleModel>;
  totalCount: Scalars['Int'];
};

export type RolePermissionAssignDto = {
  id?: InputMaybe<Scalars['ID']>;
  key?: InputMaybe<Scalars['String']>;
  resolverMapping?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<PermissionScopeEnum>;
  userGroupType?: InputMaybe<Scalars['String']>;
};

export type RoleSearchArgType = {
  key: RoleSearchKeyEnum;
  value: Scalars['String'];
};

export enum RoleSearchKeyEnum {
  description = 'description',
  key = 'key',
  name = 'name'
}

export type RoleUpdateDto = {
  description?: InputMaybe<Scalars['String']>;
  isSystemManaged?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  permissionAssignments: Array<RolePermissionAssignDto>;
};

export type RoleUserGroupRelationDto = {
  userGroupIds: Array<Scalars['ID']>;
};

export type RoleUserRelationDto = {
  userIds: Array<Scalars['ID']>;
};

export type StatusFilterArgType = {
  equalTo?: InputMaybe<FileStatusEnum>;
  notEqualTo?: InputMaybe<FileStatusEnum>;
  valueIn?: InputMaybe<Array<FileStatusEnum>>;
  valueNotIn?: InputMaybe<Array<FileStatusEnum>>;
};

export type StringFilterArgType = {
  equalTo?: InputMaybe<Scalars['String']>;
  iLike?: InputMaybe<Scalars['String']>;
  like?: InputMaybe<Scalars['String']>;
  notEqualTo?: InputMaybe<Scalars['String']>;
  valueIn?: InputMaybe<Array<Scalars['String']>>;
  valueNotIn?: InputMaybe<Array<Scalars['String']>>;
};

export type TemplateBulkCompileDto = {
  content: Scalars['String'];
  directlyInjectedVariables?: InputMaybe<Scalars['JsonObject']>;
  entities: Array<TemplateCompileEntityDto>;
  metaObjects?: InputMaybe<Array<Scalars['JsonObject']>>;
};

export type TemplateCompileDto = {
  content: Scalars['String'];
  entities: Array<TemplateCompileEntityDto>;
  metaObj?: InputMaybe<Scalars['JsonObject']>;
};

export type TemplateCompileEntityDto = {
  alias?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  uuid: Scalars['String'];
};

export type TenantInitialiseDto = {
  id: Scalars['String'];
};

export type TenantModel = {
  __typename?: 'TenantModel';
  id: Scalars['String'];
};

export type TenantUpdateDto = {
  fromEmail?: InputMaybe<Scalars['String']>;
  roqOneFrontendUrl?: InputMaybe<Scalars['String']>;
  sendGridApiKey?: InputMaybe<Scalars['String']>;
};

export type TranslationCreateDto = {
  locale: Scalars['String'];
  translationKeyId: Scalars['ID'];
  value: Scalars['String'];
};

export type TranslationFilterArgType = {
  id?: InputMaybe<IdFilterArgType>;
  locale?: InputMaybe<StringFilterArgType>;
  translationKeyId?: InputMaybe<IdFilterArgType>;
};

export type TranslationKeyCreateDto = {
  key: Scalars['String'];
  translations?: InputMaybe<Array<TranslationUpsertDto>>;
};

export type TranslationKeyFilterArgType = {
  id?: InputMaybe<IdFilterArgType>;
  key?: InputMaybe<StringFilterArgType>;
  locale?: InputMaybe<StringFilterArgType>;
  translated?: InputMaybe<BooleanFilterArgType>;
};

export type TranslationKeyModel = {
  __typename?: 'TranslationKeyModel';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  key: Scalars['String'];
  translations: TranslationPageModel;
  updatedAt: Scalars['Date'];
};


export type TranslationKeyModeltranslationsArgs = {
  filter?: InputMaybe<TranslationFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<TranslationOrderArgType>;
  search?: InputMaybe<TranslationSearchArgType>;
};

export type TranslationKeyOrderArgType = {
  order: OrderEnum;
  sort: TranslationKeyOrderSortEnum;
};

export enum TranslationKeyOrderSortEnum {
  createdAt = 'createdAt',
  key = 'key',
  updatedAt = 'updatedAt'
}

export type TranslationKeyPageModel = {
  __typename?: 'TranslationKeyPageModel';
  data: Array<TranslationKeyModel>;
  totalCount: Scalars['Int'];
};

export type TranslationKeySearchArgType = {
  key: TranslationKeySearchKeyEnum;
  value: Scalars['String'];
};

export enum TranslationKeySearchKeyEnum {
  key = 'key'
}

export type TranslationKeyUpdateDto = {
  translations?: InputMaybe<Array<TranslationUpsertDto>>;
};

export type TranslationModel = {
  __typename?: 'TranslationModel';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  locale: Scalars['String'];
  translationKey: TranslationKeyModel;
  translationKeyId: Scalars['ID'];
  updatedAt: Scalars['Date'];
  value: Scalars['String'];
};

export type TranslationOrderArgType = {
  order: OrderEnum;
  sort: TranslationOrderSortEnum;
};

export enum TranslationOrderSortEnum {
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  value = 'value'
}

export type TranslationPageModel = {
  __typename?: 'TranslationPageModel';
  data: Array<TranslationModel>;
  totalCount: Scalars['Int'];
};

export type TranslationSearchArgType = {
  key: TranslationSearchKeyEnum;
  value: Scalars['String'];
};

export enum TranslationSearchKeyEnum {
  VALUE = 'VALUE'
}

export type TranslationTemplateDto = {
  content: Scalars['String'];
  locale: Scalars['String'];
};

export type TranslationUpdateDto = {
  locale: Scalars['String'];
  translationKeyId?: InputMaybe<Scalars['ID']>;
  value: Scalars['String'];
};

export type TranslationUpsertDto = {
  locale: Scalars['String'];
  value: Scalars['String'];
};

export type UpdateNotificationPreferenceDto = {
  channel?: InputMaybe<Scalars['String']>;
  enable: Scalars['Boolean'];
  id: Scalars['String'];
};

export type UserCreateDto = {
  active?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  optedInAt?: InputMaybe<Scalars['Date']>;
  phone?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
};

export type UserFilterArgType = {
  acceptedUserInviteId?: InputMaybe<IdFilterArgType>;
  active?: InputMaybe<BooleanFilterArgType>;
  createdUserInviteId?: InputMaybe<IdFilterArgType>;
  email?: InputMaybe<StringFilterArgType>;
  firstName?: InputMaybe<StringFilterArgType>;
  id?: InputMaybe<IdFilterArgType>;
  lastName?: InputMaybe<StringFilterArgType>;
  locale?: InputMaybe<StringFilterArgType>;
  optedInAt?: InputMaybe<DateFilterArgType>;
  phone?: InputMaybe<StringFilterArgType>;
  roleId?: InputMaybe<IdFilterArgType>;
  timezone?: InputMaybe<StringFilterArgType>;
  userGroupId?: InputMaybe<UserGroupIdFilterArgType>;
  userGroupName?: InputMaybe<UserGroupNameFilterArgType>;
  userProviderId?: InputMaybe<IdFilterArgType>;
  userTokenId?: InputMaybe<IdFilterArgType>;
};

export type UserGroupConfigCreateDto = {
  defaultRoleIds?: InputMaybe<Array<Scalars['ID']>>;
  entity: Scalars['String'];
  groupRelationField?: InputMaybe<Scalars['String']>;
  isUserInMultipleGroups?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  nameField?: InputMaybe<Scalars['String']>;
  type: UserGroupConfigTypeEnum;
  userGroupType: Scalars['String'];
  userRelationEntity?: InputMaybe<Scalars['String']>;
  userRelationField?: InputMaybe<Scalars['String']>;
};

export type UserGroupConfigFilterArgType = {
  entity?: InputMaybe<StringFilterArgType>;
  groupRelationField?: InputMaybe<StringFilterArgType>;
  id?: InputMaybe<IdFilterArgType>;
  isUserInMultipleGroups?: InputMaybe<BooleanFilterArgType>;
  name?: InputMaybe<StringFilterArgType>;
  nameField?: InputMaybe<StringFilterArgType>;
  type?: InputMaybe<StringFilterArgType>;
  userGroupConfigId?: InputMaybe<IdFilterArgType>;
  userGroupType?: InputMaybe<StringFilterArgType>;
  userRelationEntity?: InputMaybe<StringFilterArgType>;
  userRelationField?: InputMaybe<StringFilterArgType>;
};

export type UserGroupConfigModel = {
  __typename?: 'UserGroupConfigModel';
  createdAt: Scalars['Date'];
  defaultRoles: RolePageModel;
  entity: Scalars['String'];
  groupRelationField?: Maybe<Scalars['String']>;
  hasMembers: Scalars['Boolean'];
  id: Scalars['ID'];
  isUserInMultipleGroups: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  nameField?: Maybe<Scalars['String']>;
  type: UserGroupConfigTypeEnum;
  updatedAt: Scalars['Date'];
  userGroupType: Scalars['String'];
  userRelationEntity?: Maybe<Scalars['String']>;
  userRelationField?: Maybe<Scalars['String']>;
};


export type UserGroupConfigModeldefaultRolesArgs = {
  filter?: InputMaybe<RoleFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<RoleOrderArgType>;
  search?: InputMaybe<RoleSearchArgType>;
};

export type UserGroupConfigOrderArgType = {
  order: OrderEnum;
  sort: UserGroupConfigOrderSortEnum;
};

export enum UserGroupConfigOrderSortEnum {
  createdAt = 'createdAt',
  entity = 'entity',
  groupRelationField = 'groupRelationField',
  isUserInMultipleGroups = 'isUserInMultipleGroups',
  name = 'name',
  nameField = 'nameField',
  type = 'type',
  updatedAt = 'updatedAt',
  userGroupType = 'userGroupType',
  userRelationEntity = 'userRelationEntity',
  userRelationField = 'userRelationField'
}

export type UserGroupConfigPageModel = {
  __typename?: 'UserGroupConfigPageModel';
  data: Array<UserGroupConfigModel>;
  totalCount: Scalars['Int'];
};

export type UserGroupConfigSearchArgType = {
  key: UserGroupConfigSearchKeyEnum;
  value: Scalars['String'];
};

export enum UserGroupConfigSearchKeyEnum {
  entity = 'entity',
  groupRelationField = 'groupRelationField',
  name = 'name',
  nameField = 'nameField',
  userGroupType = 'userGroupType',
  userRelationEntity = 'userRelationEntity',
  userRelationField = 'userRelationField'
}

export enum UserGroupConfigTypeEnum {
  belongs_to = 'belongs_to',
  is_a = 'is_a'
}

export type UserGroupConfigUpdateDto = {
  defaultRoleIds?: InputMaybe<Array<Scalars['ID']>>;
  entity?: InputMaybe<Scalars['String']>;
  groupRelationField?: InputMaybe<Scalars['String']>;
  isUserInMultipleGroups?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  nameField?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<UserGroupConfigTypeEnum>;
  userGroupType?: InputMaybe<Scalars['String']>;
  userRelationEntity?: InputMaybe<Scalars['String']>;
  userRelationField?: InputMaybe<Scalars['String']>;
};

export type UserGroupCreateDto = {
  name: Scalars['String'];
  remoteId: Scalars['String'];
  type: Scalars['String'];
  userGroupConfigId: Scalars['String'];
};

export type UserGroupFilterArgType = {
  id?: InputMaybe<IdFilterArgType>;
  memberUserId?: InputMaybe<IdFilterArgType>;
  name?: InputMaybe<StringFilterArgType>;
  remoteId?: InputMaybe<StringFilterArgType>;
  roleId?: InputMaybe<IdFilterArgType>;
  type?: InputMaybe<StringFilterArgType>;
};

export type UserGroupIdFilterArgType = {
  all?: InputMaybe<Array<Scalars['ID']>>;
  equalTo?: InputMaybe<Scalars['ID']>;
  notEqualTo?: InputMaybe<Scalars['ID']>;
  valueIn?: InputMaybe<Array<Scalars['ID']>>;
  valueNotIn?: InputMaybe<Array<Scalars['ID']>>;
};

export type UserGroupModel = {
  __typename?: 'UserGroupModel';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  memberUsers?: Maybe<UserPageModel>;
  name: Scalars['String'];
  remoteId: Scalars['String'];
  roles: RolePageModel;
  type: Scalars['String'];
  updatedAt: Scalars['Date'];
};


export type UserGroupModelmemberUsersArgs = {
  filter?: InputMaybe<UserFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserOrderArgType>;
  search?: InputMaybe<UserSearchArgType>;
};


export type UserGroupModelrolesArgs = {
  filter?: InputMaybe<RoleFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<RoleOrderArgType>;
  search?: InputMaybe<RoleSearchArgType>;
};

export type UserGroupNameFilterArgType = {
  all?: InputMaybe<Array<Scalars['String']>>;
  equalTo?: InputMaybe<Scalars['String']>;
  iLike?: InputMaybe<Scalars['String']>;
  like?: InputMaybe<Scalars['String']>;
  notEqualTo?: InputMaybe<Scalars['String']>;
  valueIn?: InputMaybe<Array<Scalars['String']>>;
  valueNotIn?: InputMaybe<Array<Scalars['String']>>;
};

export type UserGroupOrderArgType = {
  order: OrderEnum;
  sort: UserGroupOrderSortEnum;
};

export enum UserGroupOrderSortEnum {
  createdAt = 'createdAt',
  name = 'name',
  remoteId = 'remoteId',
  type = 'type',
  updatedAt = 'updatedAt'
}

export type UserGroupPageModel = {
  __typename?: 'UserGroupPageModel';
  data: Array<UserGroupModel>;
  totalCount: Scalars['Int'];
};

export type UserGroupRoleRelationDto = {
  roleIds: Array<Scalars['ID']>;
};

export type UserGroupSearchArgType = {
  key: UserGroupSearchKeyEnum;
  value: Scalars['String'];
};

export enum UserGroupSearchKeyEnum {
  name = 'name',
  remoteId = 'remoteId',
  type = 'type'
}

export type UserGroupUpdateDto = {
  name?: InputMaybe<Scalars['String']>;
  remoteId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type UserGroupUserRelationDto = {
  userIds: Array<Scalars['ID']>;
};

export type UserInviteCreateDto = {
  createdByUserId: Scalars['ID'];
  data?: InputMaybe<Scalars['JsonObject']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<UserInviteStatusEnum>;
};

export type UserInviteFilterArgType = {
  acceptedByUserId?: InputMaybe<IdFilterArgType>;
  createdByUserId?: InputMaybe<IdFilterArgType>;
  email?: InputMaybe<StringFilterArgType>;
  firstName?: InputMaybe<StringFilterArgType>;
  id?: InputMaybe<IdFilterArgType>;
  lastName?: InputMaybe<StringFilterArgType>;
  locale?: InputMaybe<StringFilterArgType>;
  status?: InputMaybe<StringFilterArgType>;
  userTokenId?: InputMaybe<IdFilterArgType>;
};

export type UserInviteModel = {
  __typename?: 'UserInviteModel';
  acceptedBy?: Maybe<UserModel>;
  acceptedByUserId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['Date'];
  createdBy: UserModel;
  createdByUserId: Scalars['ID'];
  data?: Maybe<Scalars['JsonObject']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  status: UserInviteStatusEnum;
  statusUpdatedAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userToken: UserTokenModel;
  userTokenId: Scalars['ID'];
};


export type UserInviteModelacceptedByArgs = {
  filter?: InputMaybe<UserFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserOrderArgType>;
  search?: InputMaybe<UserSearchArgType>;
};


export type UserInviteModelcreatedByArgs = {
  filter?: InputMaybe<UserFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserOrderArgType>;
  search?: InputMaybe<UserSearchArgType>;
};


export type UserInviteModeluserTokenArgs = {
  filter?: InputMaybe<UserTokenFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserTokenOrderArgType>;
  search?: InputMaybe<UserTokenSearchArgType>;
};

export type UserInviteOrderArgType = {
  order: OrderEnum;
  sort: UserInviteOrderSortEnum;
};

export enum UserInviteOrderSortEnum {
  createdAt = 'createdAt',
  data = 'data',
  email = 'email',
  firstName = 'firstName',
  lastName = 'lastName',
  locale = 'locale',
  status = 'status',
  updatedAt = 'updatedAt'
}

export type UserInvitePageModel = {
  __typename?: 'UserInvitePageModel';
  data: Array<UserInviteModel>;
  totalCount: Scalars['Int'];
};

export type UserInviteSearchArgType = {
  key: UserInviteSearchKeyEnum;
  value: Scalars['String'];
};

export enum UserInviteSearchKeyEnum {
  firstName = 'firstName',
  lastName = 'lastName',
  locale = 'locale'
}

export enum UserInviteStatusEnum {
  accepted = 'accepted',
  canceled = 'canceled',
  expired = 'expired',
  pending = 'pending'
}

export type UserInviteUpdateDto = {
  acceptedByUserId?: InputMaybe<Scalars['ID']>;
  data?: InputMaybe<Scalars['JsonObject']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type UserInvitesCreateDto = {
  userInvites: Array<UserInviteCreateDto>;
};

export type UserModel = {
  __typename?: 'UserModel';
  acceptedUserInvite?: Maybe<UserInviteModel>;
  active?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['Date'];
  createdUserInvites?: Maybe<UserInvitePageModel>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  optedInAt?: Maybe<Scalars['Date']>;
  phone?: Maybe<Scalars['String']>;
  roles?: Maybe<RolePageModel>;
  timezone?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  userGroups?: Maybe<UserGroupPageModel>;
  userInviteId?: Maybe<Scalars['ID']>;
  userProviders: UserProviderPageModel;
  userTokens: UserTokenPageModel;
};


export type UserModelacceptedUserInviteArgs = {
  filter?: InputMaybe<UserInviteFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserInviteOrderArgType>;
  search?: InputMaybe<UserInviteSearchArgType>;
};


export type UserModelcreatedUserInvitesArgs = {
  filter?: InputMaybe<UserInviteFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserInviteOrderArgType>;
  search?: InputMaybe<UserInviteSearchArgType>;
};


export type UserModelrolesArgs = {
  filter?: InputMaybe<RoleFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<RoleOrderArgType>;
  search?: InputMaybe<RoleSearchArgType>;
};


export type UserModeluserGroupsArgs = {
  filter?: InputMaybe<UserGroupFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserGroupOrderArgType>;
  search?: InputMaybe<UserGroupSearchArgType>;
};


export type UserModeluserProvidersArgs = {
  filter?: InputMaybe<UserProviderFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserProviderOrderArgType>;
  search?: InputMaybe<UserProviderSearchArgType>;
};


export type UserModeluserTokensArgs = {
  filter?: InputMaybe<UserTokenFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserTokenOrderArgType>;
  search?: InputMaybe<UserTokenSearchArgType>;
};

export type UserOrderArgType = {
  order: OrderEnum;
  sort: UserOrderSortEnum;
};

export enum UserOrderSortEnum {
  active = 'active',
  createdAt = 'createdAt',
  email = 'email',
  firstName = 'firstName',
  lastName = 'lastName',
  locale = 'locale',
  optedInAt = 'optedInAt',
  phone = 'phone',
  timezone = 'timezone',
  updatedAt = 'updatedAt'
}

export type UserPageModel = {
  __typename?: 'UserPageModel';
  data: Array<UserModel>;
  totalCount: Scalars['Int'];
};

export type UserPermissionModel = {
  __typename?: 'UserPermissionModel';
  object: Scalars['String'];
  operation: Scalars['String'];
  resolvers: Array<Scalars['String']>;
  scope: PermissionScopeEnum;
  service: Scalars['String'];
  userGroupType?: Maybe<Scalars['String']>;
};

export type UserProviderBulkFilterArgType = {
  id?: InputMaybe<IdBulkFilterArgType>;
  optedIn?: InputMaybe<BooleanFilterArgType>;
  providerIdentifier?: InputMaybe<StringFilterArgType>;
  providerUserIdentifier?: InputMaybe<StringFilterArgType>;
  userId?: InputMaybe<IdFilterArgType>;
};

export type UserProviderCreateDto = {
  optedIn: Scalars['Boolean'];
  providerIdentifier: Scalars['String'];
  providerUserIdentifier: Scalars['String'];
  userId?: InputMaybe<Scalars['ID']>;
};

export type UserProviderFilterArgType = {
  id?: InputMaybe<IdFilterArgType>;
  optedIn?: InputMaybe<BooleanFilterArgType>;
  providerIdentifier?: InputMaybe<StringFilterArgType>;
  providerUserIdentifier?: InputMaybe<StringFilterArgType>;
  userId?: InputMaybe<IdFilterArgType>;
};

export type UserProviderModel = {
  __typename?: 'UserProviderModel';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  optedIn: Scalars['Boolean'];
  providerIdentifier: Scalars['String'];
  providerUserIdentifier: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: UserModel;
  userId: Scalars['ID'];
};

export type UserProviderOrderArgType = {
  order: OrderEnum;
  sort: UserProviderOrderSortEnum;
};

export enum UserProviderOrderSortEnum {
  createdAt = 'createdAt',
  optedIn = 'optedIn',
  providerIdentifier = 'providerIdentifier',
  providerUserIdentifier = 'providerUserIdentifier',
  updatedAt = 'updatedAt'
}

export type UserProviderPageModel = {
  __typename?: 'UserProviderPageModel';
  data: Array<UserProviderModel>;
  totalCount: Scalars['Int'];
};

export type UserProviderSearchArgType = {
  key: UserProviderSearchKeyEnum;
  value: Scalars['String'];
};

export enum UserProviderSearchKeyEnum {
  providerIdentifier = 'providerIdentifier',
  providerUserIdentifier = 'providerUserIdentifier'
}

export type UserProviderUpdateDto = {
  optedIn?: InputMaybe<Scalars['Boolean']>;
  providerIdentifier?: InputMaybe<Scalars['String']>;
  providerUserIdentifier?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['ID']>;
};

export type UserRefreshTokenCreateDto = {
  keepLoggedIn?: InputMaybe<Scalars['Boolean']>;
  userId: Scalars['String'];
};

export type UserRefreshTokenVerifyDto = {
  token: Scalars['String'];
};

export type UserResetPasswordTokenCreateDto = {
  userId: Scalars['String'];
};

export type UserRoleRelationDto = {
  roleIds: Array<Scalars['ID']>;
};

export type UserSearchArgType = {
  key: UserSearchKeyEnum;
  value: Scalars['String'];
};

export enum UserSearchKeyEnum {
  email = 'email',
  firstName = 'firstName',
  lastName = 'lastName',
  locale = 'locale',
  phone = 'phone',
  timezone = 'timezone'
}

export type UserTokenCreateDto = {
  token: Scalars['String'];
  type: Scalars['String'];
  userId?: InputMaybe<Scalars['ID']>;
  validTill: Scalars['Date'];
};

export type UserTokenFilterArgType = {
  id?: InputMaybe<IdFilterArgType>;
  token?: InputMaybe<StringFilterArgType>;
  type?: InputMaybe<StringFilterArgType>;
  userId?: InputMaybe<IdFilterArgType>;
  userInviteId?: InputMaybe<IdFilterArgType>;
  validTill?: InputMaybe<DateFilterArgType>;
};

export type UserTokenModel = {
  __typename?: 'UserTokenModel';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  token: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['Date'];
  user?: Maybe<UserModel>;
  userId: Scalars['ID'];
  userInvite?: Maybe<UserInviteModel>;
  validTill: Scalars['Date'];
};


export type UserTokenModeluserInviteArgs = {
  filter?: InputMaybe<UserInviteFilterArgType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserInviteOrderArgType>;
  search?: InputMaybe<UserInviteSearchArgType>;
};

export type UserTokenOrderArgType = {
  order: OrderEnum;
  sort: UserTokenOrderSortEnum;
};

export enum UserTokenOrderSortEnum {
  createdAt = 'createdAt',
  token = 'token',
  type = 'type',
  updatedAt = 'updatedAt',
  validTill = 'validTill'
}

export type UserTokenPageModel = {
  __typename?: 'UserTokenPageModel';
  data: Array<UserTokenModel>;
  totalCount: Scalars['Int'];
};

export type UserTokenSearchArgType = {
  key: UserTokenSearchKeyEnum;
  value: Scalars['String'];
};

export enum UserTokenSearchKeyEnum {
  token = 'token',
  type = 'type'
}

export type UserTokenUpdateDto = {
  token?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['ID']>;
  validTill?: InputMaybe<Scalars['Date']>;
};

export type UserUnreadMessagesModel = {
  __typename?: 'UserUnreadMessagesModel';
  unreadMessageCount: Scalars['Float'];
  userId: Scalars['String'];
};

export type UserUpdateDto = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  optedInAt?: InputMaybe<Scalars['Date']>;
  phone?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
};

export type UserUserGroupRelationDto = {
  userGroupIds: Array<Scalars['ID']>;
};

export type UserValidateEmailTokenCreateDto = {
  userId: Scalars['String'];
};

export type DeleteFilesMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type DeleteFilesMutation = { __typename?: 'Mutation', deleteFiles: Array<string> };

export type UpdateFileMutationVariables = Exact<{
  id: Scalars['ID'];
  updateFileDto: FileUpdateDto;
}>;


export type UpdateFileMutation = { __typename?: 'Mutation', updateFile: { __typename?: 'FileModel', id: string, name: string } };

export type MakeFilePublicMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MakeFilePublicMutation = { __typename?: 'Mutation', makeFilePublic: { __typename?: 'FileModel', id: string, url?: string | null, isPublic: boolean } };

export type MakeFilePrivateMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MakeFilePrivateMutation = { __typename?: 'Mutation', makeFilePrivate: { __typename?: 'FileModel', id: string, url?: string | null, isPublic: boolean } };

export type CreateFileUploadUrlMutationVariables = Exact<{
  createFileDto: FileCreateDto;
}>;


export type CreateFileUploadUrlMutation = { __typename?: 'Mutation', createFileUploadUrl: { __typename?: 'FileModel', id: string, uploadUrl?: string | null, contentType: string } };

export type UpdateFileStatusMutationVariables = Exact<{
  fileId: Scalars['ID'];
  status: FileStatusEnum;
}>;


export type UpdateFileStatusMutation = { __typename?: 'Mutation', updateFileStatus: { __typename?: 'FileModel', id: string, name: string, url?: string | null, createdAt: any } };

export type FileQueryVariables = Exact<{
  fileId: Scalars['ID'];
}>;


export type FileQuery = { __typename?: 'Query', file: { __typename?: 'FileModel', id: string, name: string, url?: string | null, isPublic: boolean } };

export type FilesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<FileOrderArgType>;
  filter: FileFilterArgType;
}>;


export type FilesQuery = { __typename?: 'Query', files: { __typename?: 'FilePageModel', totalCount: number, data: Array<{ __typename?: 'FileModel', id: string, name: string, url?: string | null, isPublic: boolean, createdAt: any, status: FileStatusEnum }> } };

export type NotificationsFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsFeedQuery = { __typename?: 'Query', notificationFeed: { __typename?: 'NotificationActivityPageModel', totalCount: number, data: Array<{ __typename?: 'NotificationActivityModel', id: string, content: string, channel: NotificationChannelEnum, seen: boolean, lastSeenDate?: string | null, title?: string | null, createdAt: any }> } };

export type MarkAsSeenNotificationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type MarkAsSeenNotificationMutation = { __typename?: 'Mutation', markMessageSeen: { __typename?: 'NotificationActivityModel', id: string, seen: boolean } };


export const DeleteFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"valueIn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}]}}]}]}}]} as unknown as DocumentNode;

/**
 * __useDeleteFilesMutation__
 *
 * To run a mutation, you first call `useDeleteFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFilesMutation, { data, loading, error }] = useDeleteFilesMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteFilesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFilesMutation, DeleteFilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFilesMutation, DeleteFilesMutationVariables>(DeleteFilesDocument, options);
      }
export type DeleteFilesMutationHookResult = ReturnType<typeof useDeleteFilesMutation>;
export type DeleteFilesMutationResult = Apollo.MutationResult<DeleteFilesMutation>;
export type DeleteFilesMutationOptions = Apollo.BaseMutationOptions<DeleteFilesMutation, DeleteFilesMutationVariables>;
export const UpdateFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateFileDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FileUpdateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateFileDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateFileDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useUpdateFileMutation__
 *
 * To run a mutation, you first call `useUpdateFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFileMutation, { data, loading, error }] = useUpdateFileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateFileDto: // value for 'updateFileDto'
 *   },
 * });
 */
export function useUpdateFileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFileMutation, UpdateFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFileMutation, UpdateFileMutationVariables>(UpdateFileDocument, options);
      }
export type UpdateFileMutationHookResult = ReturnType<typeof useUpdateFileMutation>;
export type UpdateFileMutationResult = Apollo.MutationResult<UpdateFileMutation>;
export type UpdateFileMutationOptions = Apollo.BaseMutationOptions<UpdateFileMutation, UpdateFileMutationVariables>;
export const MakeFilePublicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MakeFilePublic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"makeFilePublic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useMakeFilePublicMutation__
 *
 * To run a mutation, you first call `useMakeFilePublicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeFilePublicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeFilePublicMutation, { data, loading, error }] = useMakeFilePublicMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMakeFilePublicMutation(baseOptions?: Apollo.MutationHookOptions<MakeFilePublicMutation, MakeFilePublicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeFilePublicMutation, MakeFilePublicMutationVariables>(MakeFilePublicDocument, options);
      }
export type MakeFilePublicMutationHookResult = ReturnType<typeof useMakeFilePublicMutation>;
export type MakeFilePublicMutationResult = Apollo.MutationResult<MakeFilePublicMutation>;
export type MakeFilePublicMutationOptions = Apollo.BaseMutationOptions<MakeFilePublicMutation, MakeFilePublicMutationVariables>;
export const MakeFilePrivateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MakeFilePrivate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"makeFilePrivate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useMakeFilePrivateMutation__
 *
 * To run a mutation, you first call `useMakeFilePrivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeFilePrivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeFilePrivateMutation, { data, loading, error }] = useMakeFilePrivateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMakeFilePrivateMutation(baseOptions?: Apollo.MutationHookOptions<MakeFilePrivateMutation, MakeFilePrivateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeFilePrivateMutation, MakeFilePrivateMutationVariables>(MakeFilePrivateDocument, options);
      }
export type MakeFilePrivateMutationHookResult = ReturnType<typeof useMakeFilePrivateMutation>;
export type MakeFilePrivateMutationResult = Apollo.MutationResult<MakeFilePrivateMutation>;
export type MakeFilePrivateMutationOptions = Apollo.BaseMutationOptions<MakeFilePrivateMutation, MakeFilePrivateMutationVariables>;
export const CreateFileUploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFileUploadUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createFileDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FileCreateDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFileUploadUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createFileDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createFileDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uploadUrl"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useCreateFileUploadUrlMutation__
 *
 * To run a mutation, you first call `useCreateFileUploadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFileUploadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFileUploadUrlMutation, { data, loading, error }] = useCreateFileUploadUrlMutation({
 *   variables: {
 *      createFileDto: // value for 'createFileDto'
 *   },
 * });
 */
export function useCreateFileUploadUrlMutation(baseOptions?: Apollo.MutationHookOptions<CreateFileUploadUrlMutation, CreateFileUploadUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFileUploadUrlMutation, CreateFileUploadUrlMutationVariables>(CreateFileUploadUrlDocument, options);
      }
export type CreateFileUploadUrlMutationHookResult = ReturnType<typeof useCreateFileUploadUrlMutation>;
export type CreateFileUploadUrlMutationResult = Apollo.MutationResult<CreateFileUploadUrlMutation>;
export type CreateFileUploadUrlMutationOptions = Apollo.BaseMutationOptions<CreateFileUploadUrlMutation, CreateFileUploadUrlMutationVariables>;
export const UpdateFileStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFileStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FileStatusEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFileStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useUpdateFileStatusMutation__
 *
 * To run a mutation, you first call `useUpdateFileStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFileStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFileStatusMutation, { data, loading, error }] = useUpdateFileStatusMutation({
 *   variables: {
 *      fileId: // value for 'fileId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateFileStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFileStatusMutation, UpdateFileStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFileStatusMutation, UpdateFileStatusMutationVariables>(UpdateFileStatusDocument, options);
      }
export type UpdateFileStatusMutationHookResult = ReturnType<typeof useUpdateFileStatusMutation>;
export type UpdateFileStatusMutationResult = Apollo.MutationResult<UpdateFileStatusMutation>;
export type UpdateFileStatusMutationOptions = Apollo.BaseMutationOptions<UpdateFileStatusMutation, UpdateFileStatusMutationVariables>;
export const FileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"File"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"file"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useFileQuery__
 *
 * To run a query within a React component, call `useFileQuery` and pass it any options that fit your needs.
 * When your component renders, `useFileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFileQuery({
 *   variables: {
 *      fileId: // value for 'fileId'
 *   },
 * });
 */
export function useFileQuery(baseOptions: Apollo.QueryHookOptions<FileQuery, FileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FileQuery, FileQueryVariables>(FileDocument, options);
      }
export function useFileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FileQuery, FileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FileQuery, FileQueryVariables>(FileDocument, options);
        }
export type FileQueryHookResult = ReturnType<typeof useFileQuery>;
export type FileLazyQueryHookResult = ReturnType<typeof useFileLazyQuery>;
export type FileQueryResult = Apollo.QueryResult<FileQuery, FileQueryVariables>;
export const FilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Files"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FileOrderArgType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FileFilterArgType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"files"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useFilesQuery__
 *
 * To run a query within a React component, call `useFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      order: // value for 'order'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFilesQuery(baseOptions: Apollo.QueryHookOptions<FilesQuery, FilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilesQuery, FilesQueryVariables>(FilesDocument, options);
      }
export function useFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilesQuery, FilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilesQuery, FilesQueryVariables>(FilesDocument, options);
        }
export type FilesQueryHookResult = ReturnType<typeof useFilesQuery>;
export type FilesLazyQueryHookResult = ReturnType<typeof useFilesLazyQuery>;
export type FilesQueryResult = Apollo.QueryResult<FilesQuery, FilesQueryVariables>;
export const NotificationsFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NotificationsFeed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationFeed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"channel"}},{"kind":"Field","name":{"kind":"Name","value":"seen"}},{"kind":"Field","name":{"kind":"Name","value":"lastSeenDate"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useNotificationsFeedQuery__
 *
 * To run a query within a React component, call `useNotificationsFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsFeedQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsFeedQuery, NotificationsFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsFeedQuery, NotificationsFeedQueryVariables>(NotificationsFeedDocument, options);
      }
export function useNotificationsFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsFeedQuery, NotificationsFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsFeedQuery, NotificationsFeedQueryVariables>(NotificationsFeedDocument, options);
        }
export type NotificationsFeedQueryHookResult = ReturnType<typeof useNotificationsFeedQuery>;
export type NotificationsFeedLazyQueryHookResult = ReturnType<typeof useNotificationsFeedLazyQuery>;
export type NotificationsFeedQueryResult = Apollo.QueryResult<NotificationsFeedQuery, NotificationsFeedQueryVariables>;
export const MarkAsSeenNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkAsSeenNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markMessageSeen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seen"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useMarkAsSeenNotificationMutation__
 *
 * To run a mutation, you first call `useMarkAsSeenNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAsSeenNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAsSeenNotificationMutation, { data, loading, error }] = useMarkAsSeenNotificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkAsSeenNotificationMutation(baseOptions?: Apollo.MutationHookOptions<MarkAsSeenNotificationMutation, MarkAsSeenNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkAsSeenNotificationMutation, MarkAsSeenNotificationMutationVariables>(MarkAsSeenNotificationDocument, options);
      }
export type MarkAsSeenNotificationMutationHookResult = ReturnType<typeof useMarkAsSeenNotificationMutation>;
export type MarkAsSeenNotificationMutationResult = Apollo.MutationResult<MarkAsSeenNotificationMutation>;
export type MarkAsSeenNotificationMutationOptions = Apollo.BaseMutationOptions<MarkAsSeenNotificationMutation, MarkAsSeenNotificationMutationVariables>;