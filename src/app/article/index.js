import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import Comments from "../../components/comments";
import useCustomSelector from '../../hooks/use-custom-selector';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(articleActions.commentsLoad(params.id));
  }, [params.id]);

  const select = useSelector(
    state => ({
      article: state.article.data,
      comments: state.article.comments,
      commentsMap: state.article.commentsMap,
      waiting: state.article.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const customSelect = useCustomSelector(state => ({
    exists: state.session.exists,
  }));

  const { t } = useTranslate();

  const commentsMapped = useMemo(() => {
    console.log(select.comments, select.commentsMap)
    return select.comments.map((c) => select.commentsMap[c._id])
  }, [select.comments, select.commentsMap])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),

    addComment:  useCallback(({parentId, text, type}) => {
      dispatch(articleActions.addComment({ parentId: parentId || params.id, text, type }));
    }, [dispatch, params.id])
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <Comments
        productId={select.article._id}
        comments={commentsMapped}
        onAddComment={callbacks.addComment}
        exists={customSelect.exists}
      />
    </PageLayout>
  );
}

export default memo(Article);
