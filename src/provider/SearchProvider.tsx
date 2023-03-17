import React, { createContext, useContext, useMemo, useState } from 'react';

type SearchState = {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  order: OrderType;
  setOrder: React.Dispatch<React.SetStateAction<OrderType>>;
  imageInfoList: ImageInfo[];
  setImageInfoList: React.Dispatch<React.SetStateAction<ImageInfo[]>>;
};

const SearchStateContext = createContext<SearchState | null>(null);

export default function SearchProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [order, setOrder] = useState<OrderType>('accuracy');
  const [keyword, setKeyword] = useState('');
  const [imageInfoList, setImageInfoList] = useState<ImageInfo[]>([]);

  const value = useMemo(
    () => ({
      order,
      setOrder,
      keyword,
      setKeyword,
      imageInfoList,
      setImageInfoList,
    }),
    [order, keyword, imageInfoList],
  );

  return (
    <SearchStateContext.Provider value={value}>
      {children}
    </SearchStateContext.Provider>
  );
}

export function useSearchState() {
  const state = useContext(SearchStateContext);
  if (!state) throw new Error('Cannot find searchProvider');
  return state;
}