import {memo, useCallback, useEffect, useMemo} from 'react';
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
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import Comments from "../../components/comments";
import useCustomSelector from '../../hooks/use-custom-selector';
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  const params = useParams();

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const selectArticle = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  const selectComments = useSelector(state => ({
    comments: state.comments.comments,
    commentsWaiting: state.comments.waiting,
  }));

  const customSelect = useCustomSelector(state => ({
    userId: state.session.user._id,
    exists: state.session.exists,
  }));

  const { t } = useTranslate();

  const commentsList = useMemo(() => {
    const commentsTree = listToTree(selectComments.comments, params.id, '_id');
    const list = treeToList(commentsTree, (item, level) => ({
      ...item,
      level,
    }));
    return list;
  }, [selectComments.comments, params.id]);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),

    addComment: useCallback(({ parentId, text, type }) => {
      dispatch(commentsActions.addComment({ parentId: parentId || params.id, text, type }));
    }, [dispatch, params.id])
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={selectArticle.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={selectArticle.waiting}>
        <ArticleCard
          article={selectArticle.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <Spinner active={selectComments.commentsWaiting}>
        <Comments
          userId={customSelect.userId}
          productId={selectArticle.article._id}
          comments={commentsList}
          onAddComment={callbacks.addComment}
          exists={customSelect.exists}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);

