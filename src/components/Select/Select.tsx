
import { FC, useState } from 'react'
import { getAssetLogoUrl } from '../../helpers'
import AssetLogo from '../AssetLogo/AssetLogo'
import styles from './Select.module.css'

interface SelectProps {
    className?: string
    options: string[],
    onChange: (currentName: string) => void,
    hasImages?: boolean
}

const Select: FC<SelectProps> = ({className, options, onChange, hasImages}) => {
  
  const [current, setCurrent] = useState(options[0])
	const [expanded, setExpanded] = useState(false)
  const expandedModifier = expanded ? styles.expanded : ''
  const currentAssetLogoUrl = getAssetLogoUrl(current)
  
	if (options.length === 0) {
		return null
	}

	return (
    <>
      {expanded && (
        <div
          className={styles.hiddenBackdrop}
          onClick={() => setExpanded(false)}
          aria-label='backdrop'
        />
      )} 

      <div className={`${className} ${styles.select} ${expandedModifier}`}>
        <button
          className={styles.toggle}
          onClick={() => setExpanded(!expanded)}
        >
          {hasImages && <AssetLogo url={currentAssetLogoUrl} assetName={current} />} 
          <span className={styles.currentValue}>{current}</span>
          <span>▼</span>
        </button>
        <div className={styles.options}>
          {options.map((option) => {
            const assetLogoUrl = getAssetLogoUrl(option)

            return (
              <button
                key={option}
                className={styles.option}
                value={option}
                disabled={option === current}
                onClick={() => {
                  onChange(option)
                  setCurrent(option)
                  setExpanded(e => !e)
                }}
              >
                {hasImages && <AssetLogo url={assetLogoUrl} assetName={option} />}
                {option}
              </button>
            )
          })}
        </div>
      </div>
    </>
	)
}

export default Select