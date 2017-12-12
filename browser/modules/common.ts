/* Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { fetchAuth } from '../util/index';

export const SET_GENERAL_ERROR = 'app/common/set-general-error';
export const RECEIVE_SITE_INFO = 'app/common/receive-site-info';
export const SET_ADMIN_MODE = 'app/common/set-admin-mode';

export const ADMIN_SESSION_KEY = 'admin-enabled';

const initial = {
  generalError: undefined as {message: string} | undefined,
  info: {} as any,
  admin: sessionStorage.getItem(ADMIN_SESSION_KEY) === '1',
};

export default function reducer(state = initial, action: any = {}) {
  switch (action.type) {
    case SET_GENERAL_ERROR:
      return {
        ...state,
        generalError: action.message,
      };

    case RECEIVE_SITE_INFO:
      return {
        ...state,
        info: action.info,
      };

    case SET_ADMIN_MODE:
      action.enabled ? sessionStorage.setItem(ADMIN_SESSION_KEY, '1') : sessionStorage.removeItem(ADMIN_SESSION_KEY);
      return {
        ...state,
        admin: action.enabled,
      };

    default:
      return state;
  }
}

export function setGeneralError(error?: {message: string} | string) {
  if (typeof error === 'string') {
    error = {message: error};
  }

  return {
    type: SET_GENERAL_ERROR,
    message: error,
  };
}

export function receiveSiteInfo(info: any) {
  return {
    type: RECEIVE_SITE_INFO,
    info,
  };
}

export function fetchSiteInfo(query?: any) {
  return async (dispatch: any) => {
    const info = await fetchAuth('/api/info');
    const data = await info.json();
    dispatch(receiveSiteInfo(data));
  };
}

export function setAdminMode(enabled: boolean) {
  return {
    type: SET_ADMIN_MODE,
    enabled,
  };
}
