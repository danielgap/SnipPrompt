import React, { useContext, useEffect, Fragment } from 'react';
import { SnippetsContext } from '../store';
import { Layout, PageHeader, EmptyState } from '../components/UI';
import { SnippetGrid } from '../components/Snippets/SnippetGrid';
import { SearchBar } from '../components/SearchBar';

export const Home = () => {
  const { snippets, getSnippets, loading, searchResults } = useContext(SnippetsContext);

  useEffect(() => {
    getSnippets();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Layout>
        <PageHeader title='Cargando...' />
      </Layout>
    );
  }

  return (
    <Layout>
      {snippets.length === 0 ? (
        <EmptyState />
      ) : (
        <Fragment>
          <PageHeader title='Search' />
          <SearchBar />
          <div className='col-12 mb-4'>
            <SnippetGrid snippets={searchResults} />
          </div>

          {snippets.some(s => s.isPinned) && (
            <Fragment>
              <PageHeader title='Pinned snippets' />
              <div className='col-12 mt-3'>
                <SnippetGrid snippets={snippets.filter(s => s.isPinned)} />
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Layout>
  );
};
