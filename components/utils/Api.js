

import axios from 'axios';

const domain = 'https://qposts.com/wp-json/wp/v2/';

export default class Api {

  static getCategoryfromId(id) {
    return axios({
      method: 'get',
      url:  `${domain}categories/${id}`,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
    });
  }

  static getSectionMenuData() {
    return axios({
      method: 'get',
      url:  `${domain}categories?per_page=20`,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
    });
  }

  static getPostDataFromCategory(id) {
    return axios({
      method: 'get',
      url:  `${domain}posts?categories=${id}`,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
    });
  }

  static getMorePostDataFromCategory(id, page) {
    return axios({
      method: 'get',
      url:  `${domain}posts?categories=${id}&&&&page=${page}`,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
    });
  }

  static getArticleDetailFromId(id) {
    return axios({
      method: 'get',
      url:  `${domain}posts/${id}`,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
    });
  }

  static searchPostsByText(searchKey, page) {
    return axios({
      method: 'get',
      url:  `${domain}posts?search=${searchKey}&&page=${page}`,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
    });
  }

  static getVideoSection(page) {
    return axios({
      method: 'get',
      url:  `${domain}posts?categories=6&&page=${page}`,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
    });
  }
}