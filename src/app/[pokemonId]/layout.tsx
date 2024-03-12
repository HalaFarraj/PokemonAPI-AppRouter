import styles from "./page.module.css"

export default function pokemonLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.layoutWrapper}>
            {children}
        </div>
    )
}
