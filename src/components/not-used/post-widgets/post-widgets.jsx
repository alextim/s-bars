import React from 'react';
import AsideWidget from '../../AsideWidget';
import { useTranslation } from '../../../i18n';

const ItemsWidget = ({ title, items }) => {
  const { t } = useTranslation();
  return (
    <AsideWidget title={t(title)}>
      {Object.keys(items).map((key) => (
        <a key={key} href={items[key].to}>
          {key}
        </a>
      ))}
    </AsideWidget>
  );
};

export const CategoryWidget = ({ items }) => (
  <ItemsWidget title="post.widget.category" items={items} />
);

export const TagsWidget = ({ items }) => <ItemsWidget title="post.widget.tags" items={items} />;
export const YearsWidget = ({ items }) => <ItemsWidget title="post.widget.years" items={items} />;
