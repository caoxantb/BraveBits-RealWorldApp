import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getFeedArticles = async (token) => {
  const response = await axios.get(`${BASE_URL}/articles/feed`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

const getGlobalArticles = async (token) => {
  const response = await axios.get(`${BASE_URL}/articles`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

const getArticlesByTag = async (tag, token) => {
  const response = await axios.get(`${BASE_URL}/articles?tag=${tag}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

const getProfileArticles = async (profile, token) => {
  const response = await axios.get(`${BASE_URL}/articles?author=${profile}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

const getFavoritedArticles = async (profile, token) => {
  const response = await axios.get(
    `${BASE_URL}/articles?favorited=${profile}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
};

const createArticle = async (data, token) => {
  const response = await axios.post(`${BASE_URL}/articles`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

const getArticle = async (slug) => {
  const response = await axios.get(`${BASE_URL}/articles/${slug}`);
  return response.data;
};

const updateArticle = async (slug, data, token) => {
  const response = await axios.put(`${BASE_URL}/articles/${slug}`, data, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

const deleteArticle = async (slug, token) => {
  const response = await axios.delete(`${BASE_URL}/articles/${slug}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

const getArticleComment = async (slug, token) => {
  const response = await axios.get(`${BASE_URL}/articles/${slug}/comments`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

const postArticleComment = async (slug, data, token) => {
  const response = await axios.post(
    `${BASE_URL}/articles/${slug}/comments`,
    data,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

const deleteArticleComment = async (slug, id, token) => {
  await axios.delete(`${BASE_URL}/articles/${slug}/comments/${id}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

const likeArticle = async (slug, token) => {
  const response = await axios.post(
    `${BASE_URL}/articles/${slug}/favorite`,
    { slug },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
};

const unlikeArticle = async (slug, token) => {
  const response = await axios.delete(`${BASE_URL}/articles/${slug}/favorite`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

const articleService = {
  getFeedArticles,
  getGlobalArticles,
  getArticlesByTag,
  getProfileArticles,
  getFavoritedArticles,
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  getArticleComment,
  postArticleComment,
  deleteArticleComment,
  likeArticle,
  unlikeArticle,
};

export default articleService;
