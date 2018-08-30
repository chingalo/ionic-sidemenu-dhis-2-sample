/*
 *
 * Copyright 2015 HISP Tanzania
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 * @since 2015
 * @author Joseph Chingalo <profschingalo@gmail.com>
 *
 */
import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { currentUserAdapter } from '../reducers/currentUser.reducers';

export const getUsersEntityState = createSelector(
  getRootState,
  (state: State) => state.currentUser
);

export const {
  selectIds: getCurrentUserIds,
  selectEntities: getCurrentUserEntities,
  selectAll: getAllCurrentUsers
} = currentUserAdapter.getSelectors(getUsersEntityState);

export const getCurrentUser = createSelector(
  getCurrentUserIds,
  getCurrentUserEntities,
  (ids, entities) => {
    console.log(JSON.stringify(ids));
    console.log(JSON.stringify(entities));
    return { ids };
  }
);
