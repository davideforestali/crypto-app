import { FC } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

interface ModalProps {
  show: boolean,
  title: string,
  onModalClose: () => void,
}

const Modal: FC<ModalProps> = ({
  show,
  title,
  onModalClose,
  children
}) => {
  const visibilityModifier = show ? ` ${styles.show}` : ''

  return createPortal(
    <>
      <div
        className={styles.backdrop + visibilityModifier}
        onClick={onModalClose}
        aria-label='backdrop'
      />

      <aside
        className={styles.modal + visibilityModifier}
        role='dialog'
        aria-modal='true'
      >
        <h2 className={styles.title}>{title}</h2>
        <button aria-label='close dialog' className={styles.closeButton} onClick={onModalClose}>✕</button>

        {children}
      </aside>
    </>,
    document.body // with createPortal we append modal to end of page (a11y best practice)
  )
}

export default Modal