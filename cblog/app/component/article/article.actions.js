/**
 * Created by easterCat on 2017/10/16.
 */
import {server} from '../../../app.config';
import {get, post, remove, update} from '../../util/netRequest';

export const ADD_ONE_USER = 'ADD_ONE_USER';
export const GET_ALL_AUTHORS = 'GET_ALL_AUTHORS';
export const CREATE_ONE_ARTICLE = 'CREATE_ONE_ARTICLE';
export const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';
export const GET_ONE_ARTICLE = 'GET_ONE_ARTICLE';
export const DELETE_ONE_ARTICLE = 'DELETE_ONE_ARTICLE';
export const CREATE_ONE_COMMENT = 'CREATE_ONE_COMMENT';
export const GET_COMMENTS = 'GET_COMMENTS';
export const DELETE_COMMNENT_BY_ID = 'DELETE_COMMNENT_BY_ID';

export function addOneUser(value) {
    return dispatch => {
        return dispatch({
            type: 'ADD_ONE_USER',
            payload: value
        })
    }
}

export function getAllAuthors() {
    return get(`${server}/user/authors`, GET_ALL_AUTHORS);
}

export function createOneArticle(data) {
    return post(`${server}/home/createArticle`, data, CREATE_ONE_ARTICLE);
}

export function getAllArticles(where) {
    return get(`${server}/home/articles?skip=${where.skip}&&limit=${where.limit}`, GET_ALL_ARTICLES);
}

export function getOneArticle(id) {
    return get(`${server}/home/article/${id}`, GET_ONE_ARTICLE);
}

export function deleteArticleById(id) {
    return remove(`${server}/home/article/${id}`, DELETE_ONE_ARTICLE)
}

export function addOneComment(data) {
    return post(`${server}/comment`, data, CREATE_ONE_COMMENT);
}

export function getComments(id) {
    return get(`${server}/comment/${id}`, GET_COMMENTS)
}

export function removeCommentById(id) {
    return remove(`${server}/comment/${id}`, DELETE_COMMNENT_BY_ID)
}
