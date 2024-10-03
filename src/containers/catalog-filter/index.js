import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();
  const [categories, setCategories] = useState([]);

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
  }));

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const json = await response.json();
      setCategories(json.result.items);
    };
    fetchCategories();
  }, []);

  // Формирование вложенных категорий с дефисом для отображения иерархии
  const formatCategory = (category, level = 0) => `${'-'.repeat(level)} ${category.title}`;

  const buildCategoryOptions = (categories, parent = null, level = 0) => {
    return categories
      .filter(cat => (cat.parent ? cat.parent._id === parent : !parent))
      .flatMap(cat => [
        { value: cat._id, title: formatCategory(cat, level) },
        ...buildCategoryOptions(categories, cat._id, level + 1),
      ]);
  };

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Обработка выбора категории
    onCategoryChange: useCallback(category => store.actions.catalog.setParams({ category, page: 1 }), [store]),
  };

  const options = useMemo(() => ({
    sort: [
      { value: 'order', title: 'По порядку' },
      { value: 'title.ru', title: 'По именованию' },
      { value: '-price', title: 'Сначала дорогие' },
      { value: 'edition', title: 'Древние' },
    ],
    categories: [
      { value: 'all', title: 'Все' }, // Опция для сброса категории
      ...buildCategoryOptions(categories),
    ],
  }), [categories]);

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onCategoryChange}
      />
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
