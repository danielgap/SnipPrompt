import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from './AuthContext';
import {
  Context,
  Snippet,
  Response,
  TagCount,
  NewSnippet,
  SearchQuery
} from '../typescript/interfaces';

export const SnippetsContext = createContext<Context>({
  snippets: [],
  searchResults: [],
  currentSnippet: null,
  tagCount: [],
  loading: true,
  getSnippets: () => {},
  getSnippetById: (id: number) => {},
  setSnippet: (id: number) => {},
  createSnippet: (snippet: NewSnippet) => {},
  updateSnippet: (snippet: NewSnippet, id: number, isLocal?: boolean) => {},
  deleteSnippet: (id: number) => {},
  toggleSnippetPin: (id: number) => {},
  countTags: () => {},
  searchSnippets: (query: SearchQuery) => {}
});

interface Props {
  children: ReactNode;
}

export const SnippetsContextProvider = (props: Props): JSX.Element => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchResults, setSearchResults] = useState<Snippet[]>([]);
  const [currentSnippet, setCurrentSnippet] = useState<Snippet | null>(null);
  const [tagCount, setTagCount] = useState<TagCount[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const history = useHistory();

  useEffect(() => {
    getSnippets();
    countTags();
  }, [isAuthenticated]);

  const redirectOnError = (message: string = 'Ha ocurrido un error.') => {
    console.error(message);
    history.push('/');
  };

  const getSnippets = async () => {
    setLoading(true);
    try {
      const res = await api.get<Response<Snippet[]>>('/snippets');
      setSnippets(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSnippetById = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.get<Response<Snippet>>(`/snippets/${id}`);
      setCurrentSnippet(res.data.data);
    } catch (err) {
      redirectOnError(`No se pudo cargar el snippet ${id}`);
    } finally {
      setLoading(false);
    }
  };

  const setSnippet = (id: number): void => {
    if (id < 0) {
      setCurrentSnippet(null);
      return;
    }
    const snippet = snippets.find(s => s.id === id);
    if (snippet) {
      setCurrentSnippet(snippet);
    } else {
      getSnippetById(id);
    }
  };

  const createSnippet = async (snippet: NewSnippet) => {
    try {
      const res = await api.post<Response<Snippet>>('/snippets', snippet);
      setSnippets([...snippets, res.data.data]);
      setCurrentSnippet(res.data.data);
      history.push(`/snippet/${res.data.data.id}`);
    } catch (err) {
      redirectOnError('No se pudo crear el snippet.');
    }
  };
  
  const updateSnippet = async (snippet: NewSnippet, id: number, isLocal?: boolean) => {
    try {
      const res = await api.put<Response<Snippet>>(`/snippets/${id}`, snippet);
      const updatedSnippet = res.data.data;
      setSnippets(snippets.map(s => s.id === id ? updatedSnippet : s));
      setCurrentSnippet(updatedSnippet);
      if (!isLocal) {
        history.push(`/snippet/${updatedSnippet.id}`);
      }
    } catch(err) {
      redirectOnError(`No se pudo actualizar el snippet ${id}`);
    }
  }

  const deleteSnippet = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este snippet?')) {
      try {
        await api.delete<Response<{}>>(`/snippets/${id}`);
        setSnippets(snippets.filter(s => s.id !== id));
        setCurrentSnippet(null);
        history.push('/snippets');
      } catch(err) {
        redirectOnError(`No se pudo eliminar el snippet ${id}`);
      }
    }
  };

  const toggleSnippetPin = (id: number): void => {
    const snippet = snippets.find(s => s.id === id);

    if (snippet) {
      updateSnippet({ ...snippet, isPinned: !snippet.isPinned }, id, true);
    }
  };

  const countTags = async () => {
    try {
      const res = await api.get<Response<TagCount[]>>('/snippets/statistics/count');
      setTagCount(res.data.data);
    } catch(err) {
      console.error(err)
    }
  };

  const searchSnippets = async (query: SearchQuery) => {
    try {
      const res = await api.post<Response<Snippet[]>>('/snippets/search', query);
      setSearchResults(res.data.data);
    } catch(err) {
      console.error(err);
    }
  };

  const context = {
    snippets,
    searchResults,
    currentSnippet,
    tagCount,
    loading,
    getSnippets,
    getSnippetById,
    setSnippet,
    createSnippet,
    updateSnippet,
    deleteSnippet,
    toggleSnippetPin,
    countTags,
    searchSnippets
  };

  return (
    <SnippetsContext.Provider value={context}>
      {props.children}
    </SnippetsContext.Provider>
  );
};
