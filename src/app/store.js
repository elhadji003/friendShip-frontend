import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authAPI } from '../features/auth/authAPI';
import { userAPI } from '../features/users/userAPI';
import { articlesAPI } from '../features/articles/articlesAPI';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [articlesAPI.reducerPath]: articlesAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authAPI.middleware)
            .concat(userAPI.middleware)
            .concat(articlesAPI.middleware),
});

export default store;
