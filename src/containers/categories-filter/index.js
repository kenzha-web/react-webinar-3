import { memo, useCallback, useEffect, useState } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import SideLayout from '../../components/side-layout';

/**
 * Компонент для фильтрации по категориям
 */
function CategoriesFilter() {
  const store = useStore();
  const [categories, setCategories] = useState([]);

  const select = useSelector(state => ({
    category: state.catalog.params.category,
  }));

  // Получение списка категорий из API
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

  const options = [
    { value: 'all', title: 'Все' }, // Пункт для сброса фильтра
    ...buildCategoryOptions(categories),
  ];

  const callbacks = {
    onCategoryChange: useCallback(category => store.actions.catalog.setParams({ category, page: 1 }), [store]),
  };

  return (
    <SideLayout padding="medium">
      <Select
        options={options}
        value={select.category}
        onChange={callbacks.onCategoryChange}
      />
    </SideLayout>
  );
}

export default memo(CategoriesFilter);
