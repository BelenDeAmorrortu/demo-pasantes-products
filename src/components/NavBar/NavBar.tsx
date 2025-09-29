import styles from './NavBar.module.scss';

const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>🛍️</div>
                <h1 className={styles.title}>ProductStore</h1>
            </div>
        </nav>
    );
};

export default NavBar;
