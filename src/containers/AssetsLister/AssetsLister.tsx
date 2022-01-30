import { useState } from 'react'
import { QueryFunctionContext, useInfiniteQuery } from 'react-query'
import styles from './AssetsLister.module.css'
import { sortAssetsAlphabetically, sortAssetsByPrice } from '../../helpers'
import { AssetsProps, InfinitePageProps } from '../../interfaces/shared'
import Asset from '../../components/Asset/Asset'
import Button from '../../components/Button/Button'
import Select from '../../components/Select/Select'

type AssetsSortType = 'name' | 'price'

const fetchAssets = ({pageParam = 1}: QueryFunctionContext) => {
  const limitParam = 10
  const fieldsParam = 'id,name,symbol,metrics/market_data/price_usd'
  const params = `limit=${limitParam}&page=${pageParam}&fields=${fieldsParam}`

  return fetch('https://data.messari.io/api/v2/assets?' + params)
    .then(res => res.json())
}

const AssetsLister: React.FC = () => {
  const [sortType, setSortType] = useState<AssetsSortType>('price')
  const {isLoading, error, data, hasNextPage, fetchNextPage, isFetchingNextPage} = useInfiniteQuery<InfinitePageProps, Error>(
    'paginatedAssets',
    fetchAssets,
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) return pages.length + 1
        else return undefined
      }
    })


  let assetsToRender = null
  const loadMoreTextModifier = isFetchingNextPage ? 'Loading more...' : 'Load More'
  
  if (isLoading) {
    assetsToRender = <p>Loading...</p>
  } 
  else if (error) {
    assetsToRender = <p>Something went wrong</p>
    
  } else {
    let assets = data?.pages.flatMap(page => page.data)
    let assetsSorted: AssetsProps[] = sortAssetsByPrice(assets)
    if (sortType === 'name') assetsSorted = sortAssetsAlphabetically(assets)

    assetsToRender = (
      <>
        <li className={styles.listHead}>
          <span>Name</span>
          <span>Price</span>
        </li>
        {assetsSorted.map(asset => (
          <li key={asset.id} className={styles.assetItem}>
            <Asset asset={asset} />
          </li>
        ))}
      </>
    ) 
  }

  return (
    <div className={styles.assetsLister}>

      <div className={styles.header}>
        <h1>Assets</h1>

        <div>
          <label>
            <span className='form-group__label'>Sort by </span>
            <Select
              options={['price', 'name']}
              onChange={(currentName) => setSortType(currentName as AssetsSortType)}
            />
          </label>
        </div>
      </div>


      <ul className={styles.list}>
        {assetsToRender}
      </ul>

      <div className={styles.actions}>
        {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {loadMoreTextModifier}
            </Button>
        )}
        {!hasNextPage && !isLoading && <span>Nothing more to load</span>}
      </div>
    </div>
  )
}

export default AssetsLister