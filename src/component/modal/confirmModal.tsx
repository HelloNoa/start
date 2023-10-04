import styles from './page.module.scss'

export const ConfirmModal = ({ok, no}: { ok: () => {}, no: any }) => {
    return (
        <div className={styles.ConfirmModal}>
            <p>진짜 정말 완전 삭제 할거에요?</p>
            <span>
                <a onClick={ok}>네</a>
                <a onClick={no}>아니오</a>
            </span>
        </div>
    )
}